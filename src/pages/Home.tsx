// src/pages/Home.tsx
import React, { useState } from "react";
import { MovieStrip } from "../components/MovieStrip";

import bg1 from "../assets/thumb1.png";
import bg2 from "../assets/thumb2.png";
import bg3 from "../assets/thumb3.png";
import bg4 from "../assets/thumb4.png";

import thumb1 from "../assets/thumb1.png";
import thumb2 from "../assets/thumb2.png";
import thumb3 from "../assets/thumb3.png";
import thumb4 from "../assets/thumb4.png";
import {InterestSection} from "../components/InterestSection.tsx";
import {HomeLists} from "../components/HomeLists.tsx";
import {HomeCommunitySection} from "../components/HomeCommunitySection.tsx";

// dữ liệu phim
const movies = [
    {
        title: "Frankenstein",
        subtitle: "Frankenstein",
        background: bg1,
        imdb: "7.6",
        rate: "T18",
        year: "2025",
        duration: "2h 30m",
        tags: ["Kinh Dị", "Cổ Điển", "Khoa Học", "Kỳ Ảo", "Viễn Tưởng", "Chuyển Thể"],
        description:
            "Đạo diễn đoạt giải Oscar Guillermo del Toro tái hiện câu chuyện kinh điển của Mary Shelley về một nhà khoa học lỗi lạc và tạo vật ma tham vọng quái dị của anh tạo ra.",
    },
    {
        title: "PHỎNG VẤN SÁT NHÂN",
        subtitle: "Murderer Report",
        background: bg2,
        imdb: "6.9",
        rate: "T18",
        year: "2025",
        duration: "1h 48m",
        tags: ["Chính Kịch", "Chiếu Rạp", "Gay Cấn", "Hình Sự", "Bí Ẩn", "Tâm Lý"],
        description:
            "Baek Sun-ju (CHO Yeo-jeong) – một nữ phóng viên đang tuyệt vọng tìm kiếm một tin độc quyền, nhận được lời đề nghị phỏng vấn rùng rợn từ bác sĩ tâm thần Lee Young-hoon (JUNG Sung-il), người tự nhận mình là một kẻ giết người hàng loạt và cảnh báo...",
    },
    {
        title: "VẬN MAY",
        subtitle: "Good Fortune",
        background: bg3,
        imdb: "6.6",
        rate: "T16",
        year: "2025",
        duration: "1h 38m",
        tags: ["Hành Động", "Chiếu Rạp", "Hài", "Kỳ Ảo", "Viễn Tưởng"],
        description:
            "Gabriel, một thiên thần thừa lòng tốt nhưng thiếu kỹ năng, tự dưng đi can thiệp vào cuộc sống của một anh nhân viên thời vụ lương ba cọc ba đồng và một đại gia chuyên đầu tư mạo hiểm, rồi làm rối tung rối mù hết cả lên.",
    },
    {
        title: "ĐIỆN THOẠI ĐEN 2",
        subtitle: "Black Phone 2",
        background: bg4,
        imdb: "6.3",
        rate: "T18",
        year: "2025",
        duration: "1h 54m",
        tags: ["Chiếu Rạp", "Gay Cấn", "Kinh Dị", "Tâm Lý"],
        description:
            "Bốn năm trước, Finn khi mới 13 tuổi đã giết chết kẻ bắt cóc mình và trốn thoát thành công, trở thành người duy nhất sống sót sau vụ án của The Grabber - một kẻ sát nhân khét tiếng. Nhưng cái ác thực sự không chết đi... và chiếc điện thoại đen lại một lần...",
    },
];

const thumbs = [thumb1, thumb2, thumb3, thumb4];

export const Home: React.FC = () => {
    const [activeMovie, setActiveMovie] = useState(0);

    // --- logic swipe trái/phải ---
    const [startX, setStartX] = useState<number | null>(null);
    const [isDragging, setIsDragging] = useState(false); // 👈 thêm dòng này


    const goNext = () => {
        setActiveMovie((prev) => (prev + 1) % movies.length);
    };

    const goPrev = () => {
        setActiveMovie((prev) =>
            prev - 1 < 0 ? movies.length - 1 : prev - 1
        );
    };

    // mouse
    const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
        setStartX(e.clientX);
        setIsDragging(true);          // 👈 bắt đầu kéo => đổi cursor
    };

    const handleMouseUp = (e: React.MouseEvent<HTMLElement>) => {
        if (startX === null) return;
        const dx = e.clientX - startX;
        const threshold = 80; // kéo > 80px mới tính là đổi trang

        if (dx > threshold) {
            // kéo sang phải => xem phim trước
            goPrev();
        } else if (dx < -threshold) {
            // kéo sang trái => xem phim sau
            goNext();
        }
        setStartX(null);
        setIsDragging(false);         // 👈 thả chuột => về bình thường
    };

    // touch (mobile)
    const handleTouchStart = (e: React.TouchEvent<HTMLElement>) => {
        setStartX(e.touches[0].clientX);
    };

    const handleTouchEnd = (e: React.TouchEvent<HTMLElement>) => {
        if (startX === null) return;
        const dx = e.changedTouches[0].clientX - startX;
        const threshold = 80;

        if (dx > threshold) {
            goPrev();
        } else if (dx < -threshold) {
            goNext();
        }
        setStartX(null);
    };

    const movie = movies[activeMovie];

    return (
        <>
            <main className="home">
                <section
                    key={activeMovie}                             // thêm key
                    className={`hero ${isDragging ? "hero--dragging" : ""}`}  // thêm class
                    style={{ backgroundImage: `url(${movie.background})` }}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    <div className="hero__overlay" />

                    <div className="hero__content">
                        <h1 className="hero__title">{movie.title}</h1>
                        <p className="hero__subtitle">{movie.subtitle}</p>

                        <div className="hero__meta">
                            <div className="hero__badge hero__badge--imdb">
                                <span>IMDb</span>
                                <strong>{movie.imdb}</strong>
                            </div>
                            <div className="hero__badge hero__badge--rate">{movie.rate}</div>
                            <div className="hero__badge hero__badge--year">{movie.year}</div>
                            <div className="hero__badge hero__badge--duration">{movie.duration}</div>
                        </div>

                        <div className="hero__tags">
                            {movie.tags.map((tag) => (
                                <span key={tag} className="hero__tag">
                    {tag}
                  </span>
                            ))}
                        </div>

                        <p className="hero__description">{movie.description}</p>

                        <div className="hero__actions">
                            <button className="hero__btn hero__btn--primary">
                                <i className="fa-solid fa-play" />
                            </button>
                            <button className="hero__btn hero__btn--circle">
                                <i className="fa-regular fa-heart" />
                            </button>
                            <button className="hero__btn hero__btn--circle">
                                <i className="fa-solid fa-circle-info" />
                            </button>
                        </div>
                    </div>

                    {/* strip vẫn dùng chung state activeMovie */}
                    <MovieStrip
                        thumbs={thumbs}
                        activeIndex={activeMovie}
                        onSelect={setActiveMovie}
                    />
                </section>
            </main>

        <InterestSection />
        <div className="showcase-wrapper-home">
            <HomeLists />
        </div>
        <div className="home-community-home-wrapper">
            <HomeCommunitySection />
        </div>
    </>
    );
};
