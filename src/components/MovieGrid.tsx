import React, {useEffect, useRef, useState} from "react";
import { MovieCard } from "./MovieCard";
import {MoviePreview} from "./MoviePreview.tsx";
import {Movie} from "../data/mockData.ts";

type MovieGridProps = {
    movies: Movie[];
};

export const MovieGrid: React.FC<MovieGridProps> = ({ movies }) => {
    const [hoveredMovie, setHoveredMovie] = useState<Movie | null>(null);
    const [previewPosition, setPreviewPosition] = useState({
        left: 0,
        top: 0,
    });
    const previewTimer = useRef<number | null>(null);
    const gridRef = useRef<HTMLDivElement>(null); // Ref cho MovieGrid
    const PREVIEW_WIDTH = 450; // Chiều rộng cố định của preview popup
    const PREVIEW_HEIGHT = 350; // Chiều cao cố định của preview popup (ước lượng)
    const MIN_TOP_POSITION = 84;

    // Logic để hiển thị preview khi chuột vào
    const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>, movie: Movie) => {
        // Xóa timer đóng preview cũ nếu có
        if (previewTimer.current) {
            clearTimeout(previewTimer.current);
            previewTimer.current = null;
        }

        setHoveredMovie(movie);

        // Tính toán vị trí popup
        const cardRect = e.currentTarget.getBoundingClientRect();
        const gridRect = gridRef.current?.getBoundingClientRect();

        if (!gridRect) return; // Đảm bảo gridRef đã sẵn sàng

        let newLeft = cardRect.left + (cardRect.width / 2) - (PREVIEW_WIDTH / 2);
        let newTop = cardRect.top + (cardRect.height / 2) - (PREVIEW_HEIGHT / 2) - 90;

        // Đảm bảo preview không tràn ra ngoài bên trái/phải của viewport
        if (newLeft < gridRect.left) {
            newLeft = gridRect.left + 10; // 10px padding
        } else if (newLeft + PREVIEW_WIDTH > gridRect.right) {
            newLeft = gridRect.right - PREVIEW_WIDTH - 10; // 10px padding
        }

        // Đảm bảo preview không tràn ra ngoài phía trên của viewport
        // Nếu tràn trên, chuyển xuống dưới card
        if (newTop < MIN_TOP_POSITION) {
            newTop = MIN_TOP_POSITION;
        }

        // 3. Giới hạn Dưới (dùng chiều cao của cửa sổ)
        if (newTop + PREVIEW_HEIGHT > window.innerHeight) {
            newTop = window.innerHeight - PREVIEW_HEIGHT - 10; // 10px padding
        }
        // --- Kết thúc logic giới hạn ---

        setPreviewPosition({
            left: newLeft,
            top: newTop,
        });
    };

    // Logic để ẩn preview khi chuột ra
    const handleMouseLeave = () => {
        // Tạo độ trễ trước khi đóng preview, cho phép di chuyển chuột qua lại
        previewTimer.current = setTimeout(() => {
            setHoveredMovie(null);
        }, 200) as unknown as number; // Ép kiểu cho setTimeout
    };

    // Khi chuột di chuyển khỏi preview, xóa timer đóng
    const handlePreviewEnter = () => {
        if (previewTimer.current) {
            clearTimeout(previewTimer.current);
            previewTimer.current = null;
        }
    };

    // Xử lý khi cuộn trang hoặc resize cửa sổ
    useEffect(() => {
        const handleScrollOrResize = () => {
            if (hoveredMovie) {
                setHoveredMovie(null);
            }
        };

        // Thêm { passive: true } để tối ưu hiệu suất cuộn
        window.addEventListener("scroll", handleScrollOrResize, { passive: true });
        window.addEventListener("resize", handleScrollOrResize);

        return () => {
            window.removeEventListener("scroll", handleScrollOrResize);
            window.removeEventListener("resize", handleScrollOrResize);
            if (previewTimer.current) {
                clearTimeout(previewTimer.current);
            }
        };
    }, [hoveredMovie]);

    return (
        <div className="movie-grid" ref={gridRef}> {/* 👈 Gán ref cho grid */}
            {movies.map((movie) => (
                <MovieCard
                    key={movie.id}
                    id={movie.id} // Truyền đủ các props
                    poster={movie.poster}
                    title={movie.title}
                    subtitle={movie.subtitle}
                    tags={movie.tags}
                    genres={movie.genres}
                    type={movie.type}
                    country={movie.country}
                    topics={movie.topics}
                    slug={movie.slug}
                    videoUrl={movie.videoUrl}
                    description={movie.description}
                    onMouseEnter={handleMouseEnter} // 👈 Truyền callback
                    onMouseLeave={handleMouseLeave} // 👈 Truyền callback
                />
            ))}

            {/* Render MoviePreview nếu có phim đang được hover */}
            {hoveredMovie && (
                <MoviePreview
                    movie={hoveredMovie}
                    position={previewPosition}
                    onClose={handleMouseLeave}
                    // 👇 THÊM DÒNG NÀY (Rất quan trọng)
                    //     Để giữ popup mở khi di chuột vào nó
                    onMouseEnter={handlePreviewEnter}
                />
            )}
        </div>
    );
};
