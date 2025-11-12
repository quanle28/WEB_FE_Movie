import React, { useEffect } from "react";
import LogoMovie from "../assets/LOGOOO.svg";

type Props = {
    open: boolean;
    mode: "login" | "register";
    onClose: () => void;
    onSwitchMode: (m: "login" | "register") => void;
};

export const AuthModal: React.FC<Props> = ({
                                               open,
                                               mode,
                                               onClose,
                                               onSwitchMode,
                                           }) => {
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    if (!open) return null;

    const prevent = (e: React.MouseEvent) => e.stopPropagation();

    const isLogin = mode === "login";
    const title = isLogin ? "Đăng nhập" : "Tạo tài khoản mới";
    const submitText = isLogin ? "Đăng nhập" : "Đăng ký";

    return (
        <div className="modal" onClick={onClose} role="dialog" aria-modal="true">
            <div className="modal__dialog" onClick={prevent}>
                <button className="modal__close" onClick={onClose} aria-label="Đóng">×</button>

                <div className="modal__grid">
                    {/* Cột trái: ảnh + logo */}
                    <div className="modal__cover">
                        <div className="modal__cover-overlay" />
                        <div className="modal__cover-brand">
                            <img src={LogoMovie} alt="RoPhim" />
                        </div>
                    </div>

                    {/* Cột phải: form */}
                    <div className="modal__panel">
                        <h3 className="modal__title">{title}</h3>
                        {isLogin ? (
                            <p className="modal__sub">
                                Nếu bạn chưa có tài khoản,{" "}
                                <a
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); onSwitchMode("register"); }}
                                >
                                    đăng ký ngay
                                </a>
                            </p>
                        ) : (
                            <p className="modal__sub">
                                Nếu bạn đã có tài khoản,{" "}
                                <a
                                    href="#"
                                    onClick={(e) => { e.preventDefault(); onSwitchMode("login"); }}
                                >
                                    đăng nhập
                                </a>
                            </p>
                        )}

                        <form className="modal__form" onSubmit={(e) => e.preventDefault()}>
                            {/* Nếu là đăng ký thì có thêm tên hiển thị */}
                            {!isLogin && (
                                <label className="modal__field">
                                    <input type="text" placeholder="Tên hiển thị" required />
                                </label>
                            )}

                            <label className="modal__field">
                                <input type="email" placeholder="Email" required />
                            </label>

                            <label className="modal__field">
                                <input type="password" placeholder="Mật khẩu" required />
                            </label>

                            {/* Nếu là đăng ký: xác nhận mật khẩu */}
                            {!isLogin && (
                                <label className="modal__field">
                                    <input type="password" placeholder="Nhập lại mật khẩu" required />
                                </label>
                            )}

                            {/* Captcha mock */}
                            <div className="modal__captcha">
                                <span className="okdot">✔</span>
                                <div className="oktext">Thành công!</div>
                                <div className="provider">CLOUDFLARE</div>
                            </div>

                            <button className="modal__submit" type="submit">{submitText}</button>

                            {isLogin && (
                                <>
                                    <div className="modal__hint">
                                        <a href="#">Quên mật khẩu?</a>
                                    </div>
                                    <button type="button" className="modal__google">
                                        <img
                                            alt=""
                                            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                                        />
                                        Đăng nhập bằng Google
                                    </button>
                                </>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
