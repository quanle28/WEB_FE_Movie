import React, { useState, useEffect } from "react";
import {MovieGrid} from "./MovieGrid.tsx";
import {Pagination} from "./Pagination.tsx";
import {useLocation, useParams} from "react-router-dom";
import {Movie, MOCK_ALL_MOVIES} from "../data/mockData.ts";


const getTitleFromSlug = (slug: string): string => {
    const titleMap: { [key: string]: string } = {
        // thể loại
        "anime": "Anime",
        "bi-an": "Bí Ẩn",
        "hanh-dong": "Hành Động",

        // chu đề
        "marvel": "Marvel",
        "keo-ly-slayyy": "Kẹo Lỳ Slayyy",
        "sitcom": "Sitcom",
        "4k": "4K",
        "long-tieng-cuc-manh": "Lồng Tiếng Cực Mạnh",
        "dinh-noc": "Đỉnh Nóc",
        "xuyen-khong": "Xuyên Không",
        "9x": "9x",
        "co-trang": "Cổ Trang",
        "tham-vong": "Tham Vọng",
        "chua-lanh": "Chữa Lành",
        "phu-thuy": "Phù Thủy",

        //quốc gia
        "anh": "Phim Anh",
        "han-quoc": "Phim Hàn Quốc",
        "canada": "Phim Canada",
        // Thêm các thể loại khác ở đây
    };
    return titleMap[slug] || slug.charAt(0).toUpperCase() + slug.slice(1);
};

// --- COMPONENT CHÍNH CỦA TRANG ---
export const CategoryPage: React.FC = () => {
    const { slug, slugCountry, slugChuDe } = useParams();
    const location = useLocation(); // Sẽ cho biết pathname (ví dụ: '/phim-le')
    console.log("location.pathname:", location.pathname);
    // console.log("slug:", slug);

    const [categoryTitle, setCategoryTitle] = useState("");

    const [allMovies, setAllMovies] = useState<Movie[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);

    // Thông số 8 phim/hàng, 4 hàng/trang
    const ITEMS_PER_ROW = 8;
    const ROWS_PER_PAGE = 4;
    const ITEMS_PER_PAGE = ITEMS_PER_ROW * ROWS_PER_PAGE; // => 32 phim mỗi trang

    // Giả lập việc fetch data
    useEffect(() => {
        let currentSlugToFetch = "";
        let currentTitle = "";

        let currentFilterType: "type" | "genre" | "country" | "topic";

        // 1. Xác định Tiêu đề, Slug, và Loại Lọc
        if (location.pathname === "/phim-le") {
            currentSlugToFetch = "phim-le";
            currentTitle = "Phim lẻ";
            currentFilterType = "type"; // 👈
        } else if (location.pathname === "/phim-bo") {
            currentSlugToFetch = "phim-bo";
            currentTitle = "Phim bộ";
            currentFilterType = "type"; // 👈
        } else if (slugCountry) {
            currentSlugToFetch = slugCountry;
            currentTitle = getTitleFromSlug(slugCountry);
            currentFilterType = "country"; // 👈
        } else if (slug) {
            currentSlugToFetch = slug;
            currentTitle = getTitleFromSlug(slug);
            currentFilterType = "genre"; // 👈
        } else if (slugChuDe) { // 👈 Kiểm tra slugChuDe
            currentSlugToFetch = slugChuDe;
            currentTitle = getTitleFromSlug(slugChuDe);
            currentFilterType = "topic";
        } else {
            return; // Không khớp route nào, thoát
        }

        setIsLoading(true);
        setCurrentPage(1);
        setCategoryTitle(currentTitle);

        // --- BẮT ĐẦU LỌC (Đã đơn giản hóa) ---
        console.log(`Đang "LỌC" (Loại: ${currentFilterType}) cho slug: ${currentSlugToFetch}`);

        let filteredMovies: Movie[] = [];

        // 2. Lọc dựa trên Loại Lọc (Filter Type)
        if (currentFilterType === "type") {
            filteredMovies = MOCK_ALL_MOVIES.filter(movie => movie.type === currentSlugToFetch);
        }
        else if (currentFilterType === "country") {
            filteredMovies = MOCK_ALL_MOVIES.filter(movie => movie.country === currentSlugToFetch);
        }
        else if (currentFilterType === "genre") {
            filteredMovies = MOCK_ALL_MOVIES.filter(movie => movie.genres.includes(currentSlugToFetch));
        }
        else if (currentFilterType === "topic") {
            filteredMovies = MOCK_ALL_MOVIES.filter(movie => movie.topics.includes(currentSlugToFetch));
        }

        // Giả lập độ trễ
        const timer = setTimeout(() => {
            setAllMovies(filteredMovies); // 👈 Dùng dữ liệu đã lọc
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);

    }, [slug, location.pathname, slugCountry, slugChuDe]);


    // Tính toán phân trang
    const totalPages = Math.ceil(allMovies.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentMovies = allMovies.slice(startIndex, endIndex);

    // Xử lý khi nhấn đổi trang
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Cuộn lên đầu trang
        window.scrollTo(0, 0);
    };

    return (
        <main className="category-page">
            <h1 className="category-page__title">{categoryTitle}</h1>

            {/* Thanh "Bộ lọc" */}
            <div className="filter-bar">
                <button className="filter-bar__button">
                    <i className="fa-solid fa-sliders"></i>
                    <span>Bộ lọc</span>
                </button>
            </div>

            {/* Lưới phim */}
            {isLoading ? (
                <div className="loading-spinner">Đang tải...</div>
            ) : (
                <MovieGrid movies={currentMovies} />
            )}

            {/* Phân trang */}
            {!isLoading && totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}
        </main>
    );
};
