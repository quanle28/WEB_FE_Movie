import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_ALL_MOVIES, Movie } from '../data/mockData';
import {WatchInfo} from "../components/WatchInfo.tsx";
import {EpisodeList} from "../components/EpisodeList.tsx";
import {CommentSection} from "../components/CommentSection.tsx";
import {WatchSidebar} from "../components/WatchSidebar.tsx";

export const WatchPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();
    const [movie, setMovie] = useState<Movie | null>(null);

    useEffect(() => {
        // Tìm phim dựa trên slug
        const foundMovie = MOCK_ALL_MOVIES.find(m => m.slug === slug);
        if (foundMovie) {
            setMovie(foundMovie);
        } else {
            // Xử lý nếu không tìm thấy phim (ví dụ: về trang chủ)
            navigate('/');
        }
    }, [slug, navigate]);

    // Nút quay lại
    const handleBack = () => {
        navigate(-1); // Quay lại trang trước đó
    };

    if (!movie) {
        return <div>Đang tải...</div>; // Hoặc loading spinner
    }

    return (
        <div className="watch-page">
            <header className="watch-header">
                <button onClick={handleBack} className="watch-header__back-btn">
                    <i className="fa-solid fa-arrow-left"></i>
                </button>
                <h1 className="watch-header__title">
                    Xem phim {movie.title}
                </h1>
            </header>

            <div className="watch-player">
                <iframe
                    src={movie.videoUrl}
                    title={movie.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>

            {/* 👇 2. THÊM LAYOUT 2 CỘT MỚI */}
            <div className="watch-content-layout">
                {/* Cột trái */}
                <main className="watch-main">
                    <WatchInfo movie={movie} />
                    <EpisodeList movie={movie} />
                    <CommentSection />
                </main>

                {/* Cột phải (Sidebar) */}
                <aside className="watch-sidebar">
                    <WatchSidebar />
                </aside>
            </div>
        </div>
    );
};
