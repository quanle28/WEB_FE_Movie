import React, {useEffect, useRef, useState} from "react";
import LogoMovie from "../assets/LOGOOO.svg";
import {AuthModal} from "./AuthModal.tsx";

import h1 from "../assets/searchheader/search1.png";
import h2 from "../assets/searchheader/search2.png";
import h3 from "../assets/searchheader/search3.png";
import h4 from "../assets/searchheader/search4.png";
import c1 from "../assets/searchheader/search5.png";
import {Link} from "react-router-dom";

type SearchResult = {
    id: number;
    title: string;
    subtitle: string;
    poster: string;
    meta: string[];
};

// Dữ liệu mock
const MOCK_ALL_MOVIES: SearchResult[] = [
    { id: 1, title: "Tình Anh Em", subtitle: "Abang Adik", poster: h1, meta: ["T18", "2023", "1h 55m"] },
    { id: 2, title: "A Breed Apart", subtitle: "A Breed Apart", poster: h2, meta: ["T16", "1984", "1h 41m"] },
    { id: 3, title: "A Ninja and an Assassin Under One Roof", subtitle: "A Ninja...", poster: h3, meta: ["T13", "Phần 1", "Tập 9"] },
    { id: 4, title: "Arthur & Merlin", subtitle: "Arthur & Merlin", poster: h4, meta: ["T13", "2015", "1h 43m"] },
    { id: 5, title: "Atlas: Cuộc chiến AI", subtitle: "Atlas", poster: c1, meta: ["T16", "2024", "2h 00m"] },
    // Thêm phim khác để test
    { id: 6, title: "Avatar: Dòng chảy của nước", subtitle: "Avatar 2", poster: h1, meta: ["T13", "2022", "3h 12m"] }
];

export const Header: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isGenreOpen, setIsGenreOpen] = useState(false);
    const [isCountryOpen, setIsCountryOpen] = useState(false);
    const [isMoreOpen, setIsMoreOpen] = useState(false);

    const [isAuthOpen, setIsAuthOpen] = useState(false);
    const [authMode, setAuthMode] = useState<"login" | "register">("login");

    // --- BẮT ĐẦU: STATE MỚI CHO TÌM KIẾM ---
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    // --- KẾT THÚC: STATE MỚI CHO TÌM KIẾM ---

    const genreRef = useRef<HTMLDivElement | null>(null);
    const countryRef = useRef<HTMLDivElement | null>(null);
    const moreRef = useRef<HTMLDivElement | null>(null);
    const searchRef = useRef<HTMLDivElement | null>(null);

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
            if (searchRef.current && !searchRef.current.contains(target)) {
                setIsSearchOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // --- BẮT ĐẦU: EFFECT MỚI ĐỂ LỌC KẾT QUẢ TÌM KIẾM ---
    useEffect(() => {
        if (searchQuery.trim() === "") {
            setSearchResults([]);
            setIsSearchOpen(false);
            return;
        }

        // Mở panel ngay khi bắt đầu gõ
        setIsSearchOpen(true);

        // Giả lập debounce và fetch API
        const handler = setTimeout(() => {
            const query = searchQuery.toLowerCase();
            const results = MOCK_ALL_MOVIES.filter(
                (movie) =>
                    movie.title.toLowerCase().includes(query) ||
                    movie.subtitle.toLowerCase().includes(query)
            );
            setSearchResults(results);
        }, 300); // Chờ 300ms rồi mới "tìm"

        // Cleanup
        return () => {
            clearTimeout(handler);
        };
    }, [searchQuery]);
    // --- KẾT THÚC: EFFECT MỚI ---

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
                <div className="header__search" ref={searchRef}>
                    <span className="header__search-icon">
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </span>
                    <input
                        type="text"
                        placeholder="Tìm kiếm phim, diễn viên"
                        className="header__search-input"
                        value={searchQuery} // 👈
                        onChange={(e) => setSearchQuery(e.target.value)} // 👈
                        onFocus={() => { // 👈 Mở khi focus (nếu có query)
                            if (searchQuery.trim() !== "") {
                                setIsSearchOpen(true);
                            }
                        }}
                    />
                    {/* Nút X để xóa query (giống trong hình) */}
                    {searchQuery && (
                        <button
                            type="button"
                            className="header__search-clear"
                            onClick={() => setSearchQuery("")} // 👈
                        >
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    )}

                    {/* 👇 KHUNG KẾT QUẢ TÌM KIẾM (MỚI) */}
                    {isSearchOpen && (
                        <div className="search-results">
                            <h4 className="search-results__title">Danh sách phim</h4>
                            <ul className="search-results__list">
                                {searchResults.length > 0 ? (
                                    searchResults.map((movie) => (
                                        <li key={movie.id} className="search-results__item">
                                            <a href="#">
                                                <img
                                                    src={movie.poster}
                                                    alt={movie.title}
                                                    className="search-results__poster"
                                                />
                                                <div className="search-results__info">
                                                    <div className="search-results__name">{movie.title}</div>
                                                    <div className="search-results__sub">{movie.subtitle}</div>
                                                    <div className="search-results__meta">
                                                        {movie.meta.map((m, i) => (
                                                            <span key={i}>{m}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </a>
                                        </li>
                                    ))
                                ) : (
                                    <li className="search-results__empty">
                                        Không tìm thấy kết quả cho "{searchQuery}"
                                    </li>
                                )}
                            </ul>
                            {searchResults.length > 0 && (
                                <a href="#" className="search-results__all-btn">
                                    Toàn bộ kết quả
                                </a>
                            )}
                        </div>
                    )}
                </div>
                {/* Hết phần Search */}

                {/* Menu */}
                <nav className="header__nav">
                    <Link to="/phim-le">Phim Lẻ</Link>
                    <Link to="/phim-bo">Phim Bộ</Link>

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
                                    <Link to="/category/anime">Anime</Link>
                                    <Link to="/category/bi-an">Bí Ẩn</Link>
                                    <Link to="/category/chien-tranh">Chiến Tranh</Link>
                                    <Link to="/category/chieu-rap">Chiếu Rạp</Link>
                                    <Link to="/category/chuyen-the">Chuyển Thể</Link>
                                    <Link to="/category/chinh-kich">Chính Kịch</Link>
                                    <Link to="/category/chinh-luan">Chính Luận</Link>
                                    <Link to="/category/chinh-tri">Chính Trị</Link>
                                    <Link to="/category/chuong-trinh-truyen-hinh">Chương Trình Truyền Hình</Link>
                                    <Link to="/category/concert-film">Concert Film</Link>
                                    <Link to="/category/cung-dau">Cung Đấu</Link>
                                    <Link to="/category/cuoi-tuan">Cuối Tuần</Link>
                                    <Link to="/category/cach-mang">Cách Mạng</Link>
                                    <Link to="/category/co-trang">Cổ Trang</Link>
                                    <Link to="/category/co-tich">Cổ Tích</Link>
                                    <Link to="/category/co-dien">Cổ Điển</Link>
                                    <Link to="/category/dc">DC</Link>
                                    <Link to="/category/disney">Disney</Link>
                                    <Link to="/category/gay-can">Gay Cấn</Link>
                                    <Link to="/category/gia-dinh">Gia Đình</Link>
                                    <Link to="/category/giang-sinh">Giáng Sinh</Link>
                                    <Link to="/category/gia-tuong">Giả Tưởng</Link>
                                    <Link to="/category/hoang-cung">Hoàng Cung</Link>
                                    <Link to="/category/hoat-hinh">Hoạt Hình</Link>
                                    <Link to="/category/hai">Hài</Link>
                                    <Link to="/category/hanh-dong">Hành Động</Link>
                                    <Link to="/category/hinh-su">Hình Sự</Link>
                                    <Link to="/category/hoc-duong">Học Đường</Link>
                                    <Link to="/category/khoa-hoc">Khoa Học</Link>
                                    <Link to="/category/kinh-di">Kinh Dị</Link>
                                    <Link to="/category/kinh-dien">Kinh Điển</Link>
                                    <Link to="/category/kich-noi">Kịch Nói</Link>
                                    <Link to="/category/ky-ao">Kỳ Ảo</Link>
                                    <Link to="/category/lgbt">LGBT+</Link>
                                    <Link to="/category/live-action">Live Action</Link>
                                    <Link to="/category/lang-man">Lãng Mạn</Link>
                                    <Link to="/category/lich-su">Lịch Sử</Link>
                                    <Link to="/category/marvel">Marvel</Link>
                                    <Link to="/category/mien-vien-tay">Miền Viễn Tây</Link>
                                    <Link to="/category/nghe-nghiep">Nghề Nghiệp</Link>
                                    <Link to="/category/nguoi-mau">Người Mẫu</Link>
                                    <Link to="/category/nhac-kich">Nhạc Kịch</Link>
                                    <Link to="/category/phieu-luu">Phiêu Lưu</Link>
                                    <Link to="/category/phep-thuat">Phép Thuật</Link>
                                    <Link to="/category/sieu-anh-hung">Siêu Anh Hùng</Link>
                                    <Link to="/category/thieu-nhi">Thiếu Nhi</Link>
                                    <Link to="/category/than-thoai">Thần Thoại</Link>
                                    <Link to="/category/the-thao">Thể Thao</Link>
                                    <Link to="/category/truyen-hinh-thuc-te">Truyền Hình Thực Tế</Link>
                                    <Link to="/category/tuoi-tre">Tuổi Trẻ</Link>
                                    <Link to="/category/tai-lieu">Tài Liệu</Link>
                                    <Link to="/category/tam-ly">Tâm Lý</Link>
                                    <Link to="/category/tinh-cam">Tình Cảm</Link>
                                    <Link to="/category/tap-luyen">Tập Luyện</Link>
                                    <Link to="/category/vien-tuong">Viễn Tưởng</Link>
                                    <Link to="/category/vo-thuat">Võ Thuật</Link>
                                    <Link to="/category/xuyen-khong">Xuyên Không</Link>
                                    <Link to="/category/dau-thuong">Đau Thương</Link>
                                    <Link to="/category/doi-thuong">Đời Thường</Link>
                                    <Link to="/category/am-thuc">Ẩm Thực</Link>
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
                                    <Link to="/country/anh">Anh</Link>
                                    <Link to="/country/canada">Canada</Link>
                                    <Link to="/country/han-quoc">Hàn Quốc</Link>
                                    <Link to="/country/hong-kong">Hồng Kông</Link>
                                    <Link to="/country/my">Mỹ</Link>
                                    <Link to="/country/nhat-ban">Nhật Bản</Link>
                                    <Link to="/country/phap">Pháp</Link>
                                    <Link to="/country/thai-lan">Thái Lan</Link>
                                    <Link to="/country/trung-quoc">Trung Quốc</Link>
                                    <Link to="/country/uc">Úc</Link>
                                    <Link to="/country/dai-loan">Đài Loan</Link>
                                    <Link to="/country/duc">Đức</Link>
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
