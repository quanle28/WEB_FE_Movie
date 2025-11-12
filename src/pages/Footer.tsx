import React from "react";
import LogoMovie from "../assets/LOGOOO.svg";
import Flag from "../assets/vn_flag.svg";


export const Footer: React.FC = () => {
    return (
        <footer className="footer">
            {/* Banner chủ quyền */}
            <div className="footer__ribbon">
                <img src={Flag} alt="Logo" className="footer__img-flag" />
                Hoàng Sa &amp; Trường Sa là của Việt Nam!
            </div>

            {/* Logo + social */}
            <div className="footer__top">
                <div className="footer__brand">
                    <a href="/">
                        <img src={LogoMovie} alt="Logo" className="footer__logo" />
                    </a>
                </div>

                <div className="footer__social">
                    <a href="#" aria-label="Telegram" className="footer__socbtn">
                        <i className="fa-solid fa-paper-plane"></i>
                    </a>
                    <a href="#" aria-label="Discord" className="footer__socbtn">
                        <i className="fa-brands fa-discord"></i>
                    </a>
                    <a href="#" aria-label="X" className="footer__socbtn">
                        <i className="fa-brands fa-x-twitter"></i>
                    </a>
                    <a href="#" aria-label="Facebook" className="footer__socbtn">
                        <i className="fa-brands fa-facebook-f"></i>
                    </a>
                    <a href="#" aria-label="TikTok" className="footer__socbtn">
                        <i className="fa-brands fa-tiktok"></i>
                    </a>
                    <a href="#" aria-label="YouTube" className="footer__socbtn">
                        <i className="fa-brands fa-youtube"></i>
                    </a>
                    <a href="#" aria-label="Reddit" className="footer__socbtn">
                        <i className="fa-brands fa-reddit-alien"></i>
                    </a>
                    <a href="#" aria-label="Instagram" className="footer__socbtn">
                        <i className="fa-brands fa-instagram"></i>
                    </a>
                </div>
            </div>

            {/* Link điều hướng */}
            <nav className="footer__nav">
                <a href="#">Hỏi-Đáp</a>
                <a href="#">Chính sách bảo mật</a>
                <a href="#">Điều khoản sử dụng</a>
                <a href="#">Giới thiệu</a>
                <a href="#">Liên hệ</a>
            </nav>

            {/* Mô tả */}
            <div className="footer__desc">
                QTQPhim – Phim hay mới nhất - Trang xem phim online chất lượng cao miễn phí Vietsub, thuyết minh, lồng tiếng full HD. Kho
                phim mới khổng lồ, phim chiếu rạp, phim bộ, phim lẻ từ nhiều quốc gia như Việt Nam, Hàn Quốc, Trung Quốc, Thái Lan,
                Nhật Bản, Âu Mỹ... đa dạng thể loại. Khám phá nền tảng phim trực tuyến hay nhất 2024 chất lượng 4K!
            </div>

            {/* Bản quyền */}
            <div className="footer__copy">© 2025 QTQPhim</div>
        </footer>
    );
};
