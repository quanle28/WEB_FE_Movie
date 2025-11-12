import React, {useEffect, useRef, useState} from "react";
import LogoMovie from "../assets/LOGOOO.svg";
import {AuthModal} from "./AuthModal.tsx";

export const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isGenreOpen, setIsGenreOpen] = useState(false);
    const [isCountryOpen, setIsCountryOpen] = useState(false);
    const [isMoreOpen, setIsMoreOpen] = useState(false);

    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [authMode, setAuthMode] = useState<"login" | "register">("login");


    const genreRef = useRef<HTMLDivElement | null>(null);
    const countryRef = useRef<HTMLDivElement | null>(null);
    const moreRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        // cleanup
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // click ngoài đóng tất cả dropdown
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Node;
            if (genreRef.current && !genreRef.current.contains(target)) {
                setIsGenreOpen(false);
            }
            if (countryRef.current && !countryRef.current.contains(target)) {
                setIsCountryOpen(false);
            }
            if (moreRef.current && !moreRef.current.contains(target)) {
                setIsMoreOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            <header className={`header ${isScrolled ? "header--scrolled" : ""}`}>
                {/* Logo */}
                <div className="header__left">
                    <div className="header__logo">
                        <a href="/">
                            <img src={LogoMovie} alt={""} className="header__logo-img" />
                        </a>
                    </div>
                </div>

                {/* Search */}
                <div className="header__search">
                    <span className="header__search-icon">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </span>
                    <input
                        type="text"
                        placeholder="Tìm kiếm phim, diễn viên"
                        className="header__search-input"
                    />
                </div>

                {/* Menu */}
                <nav className="header__nav">
                    <a href="#">Phim Lẻ</a>
                    <a href="#">Phim Bộ</a>

                    <div
                        className="header__nav-item header__nav-item--dropdown"
                        ref={genreRef}
                    >
                        <button
                            type="button"
                            className="header__nav-btn"
                            onClick={() => {
                                setIsGenreOpen((p) => !p);
                                setIsCountryOpen(false);
                                setIsMoreOpen(false);
                            }}
                        >
                            Thể loại <i className="fa-solid fa-caret-down"></i>
                        </button>

                        {isGenreOpen && (
                            <div className="header__mega">
                                <div className="header__mega-inner">
                                    <a>Anime</a>
                                    <a>Bí Ẩn</a>
                                    <a>Chiến Tranh</a>
                                    <a>Chiếu Rạp</a>
                                    <a>Chuyển Thể</a>
                                    <a>Chính Kịch</a>
                                    <a>Chính Luận</a>
                                    <a>Chính Trị</a>
                                    <a>Chương Trình Truyền Hình</a>
                                    <a>Concert Film</a>
                                    <a>Cung Đấu</a>
                                    <a>Cuối Tuần</a>
                                    <a>Cách Mạng</a>
                                    <a>Cổ Trang</a>
                                    <a>Cổ Tích</a>
                                    <a>Cổ Điển</a>
                                    <a>DC</a>
                                    <a>Disney</a>
                                    <a>Gay Cấn</a>
                                    <a>Gia Đình</a>
                                    <a>Giáng Sinh</a>
                                    <a>Giả Tưởng</a>
                                    <a>Hoàng Cung</a>
                                    <a>Hoạt Hình</a>
                                    <a>Hài</a>
                                    <a>Hành Động</a>
                                    <a>Hình Sự</a>
                                    <a>Học Đường</a>
                                    <a>Khoa Học</a>
                                    <a>Kinh Dị</a>
                                    <a>Kinh Điển</a>
                                    <a>Kịch Nói</a>
                                    <a>Kỳ Ảo</a>
                                    <a>LGBT+</a>
                                    <a>Live Action</a>
                                    <a>Lãng Mạn</a>
                                    <a>Lịch Sử</a>
                                    <a>Marvel</a>
                                    <a>Miền Viễn Tây</a>
                                    <a>Nghề Nghiệp</a>
                                    <a>Người Mẫu</a>
                                    <a>Nhạc Kịch</a>
                                    <a>Phiêu Lưu</a>
                                    <a>Phép Thuật</a>
                                    <a>Siêu Anh Hùng</a>
                                    <a>Thiếu Nhi</a>
                                    <a>Thần Thoại</a>
                                    <a>Thể Thao</a>
                                    <a>Truyền Hình Thực Tế</a>
                                    <a>Tuổi Trẻ</a>
                                    <a>Tài Liệu</a>
                                    <a>Tâm Lý</a>
                                    <a>Tình Cảm</a>
                                    <a>Tập Luyện</a>
                                    <a>Viễn Tưởng</a>
                                    <a>Võ Thuật</a>
                                    <a>Xuyên Không</a>
                                    <a>Đau Thương</a>
                                    <a>Đời Thường</a>
                                    <a>Ẩm Thực</a>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ===== Quốc gia (dropdown dọc) ===== */}
                    <div
                        className="header__nav-item header__nav-item--dropdown"
                        ref={countryRef}
                    >
                        <button
                            type="button"
                            className="header__nav-btn"
                            onClick={() => {
                                setIsCountryOpen((p) => !p);
                                setIsGenreOpen(false);
                                setIsMoreOpen(false);
                            }}
                        >
                            Quốc gia <i className="fa-solid fa-caret-down"></i>
                        </button>

                        {isCountryOpen && (
                            <div className="header__dropdown">
                                <div className="header__dropdown-list">
                                    <a>Anh</a>
                                    <a>Canada</a>
                                    <a>Hàn Quốc</a>
                                    <a>Hồng Kông</a>
                                    <a>Mỹ</a>
                                    <a>Nhật Bản</a>
                                    <a>Pháp</a>
                                    <a>Thái Lan</a>
                                    <a>Trung Quốc</a>
                                    <a>Úc</a>
                                    <a>Đài Loan</a>
                                    <a>Đức</a>
                                </div>
                            </div>
                        )}
                    </div>

                    {/*<a href="#">Xem Chung</a>*/}

                    {/* ===== Thêm (dropdown dọc nhỏ) ===== */}
                    <div
                        className="header__nav-item header__nav-item--dropdown"
                        ref={moreRef}
                    >
                        <button
                            type="button"
                            className="header__nav-btn"
                            onClick={() => {
                                setIsMoreOpen((p) => !p);
                                setIsGenreOpen(false);
                                setIsCountryOpen(false);
                            }}
                        >
                            Thêm <i className="fa-solid fa-caret-down"></i>
                        </button>

                        {isMoreOpen && (
                            <div className="header__dropdown">
                                <div className="header__dropdown-list">
                                    <a>Lịch chiếu</a>
                                    <a>Chủ đề</a>
                                    <a>Diễn viên</a>
                                </div>
                            </div>
                        )}
                    </div>

                    <span className="header__badge">NEW</span>
                </nav>

                {/* Right */}
                <div className="header__right">
                    <button className="btn btn--outline" onClick={() => { setAuthMode("login"); setIsAuthOpen(true); }}>Thành viên</button>
                </div>
            </header>
            <AuthModal
                open={isAuthOpen}
                mode={authMode}
                onClose={() => setIsAuthOpen(false)}
                onSwitchMode={(m) => setAuthMode(m)}
            />
        </>
    );
};
