import React from 'react';
import Avatar from '../assets/avatarfilm.png'; // Tạo 1 ảnh avatar mẫu

export const CommentSection: React.FC = () => {
    return (
        <section className="comment-section">
            <h3 className="section-title">Bình luận</h3>

            {/* 1. TABS (Thẻ) */}
            <div className="comment-section__tabs">
                <button className="comment-tab comment-tab--active">Bình luận</button>
                <button className="comment-tab">Đánh giá</button>
            </div>

            {/* 2. FORM (Cấu trúc [Avatar] [Input] [Button]) */}
            <form className="comment-section__form">
                <img
                    // src={Avatar}
                    src="https://i.pravatar.cc/100?img=10" // Dùng ảnh mẫu
                    alt="Avatar"
                    className="comment-form__avatar"
                />

                <textarea
                    className="comment-form__input"
                    placeholder="Viết bình luận..."
                    rows={2} // Đặt số hàng ban đầu
                />

                <button type="submit" className="comment-form__submit">
                    <span>Gửi</span>
                    <i className="fa-solid fa-paper-plane"></i>
                </button>
            </form>

            {/* 3. DANH SÁCH (Phần "chưa có bình luận") */}
            <div className="comment-section__list">
                <div className="comment-empty">
                    <i className="fa-regular fa-comment-dots"></i>
                    Chưa có bình luận nào
                </div>
            </div>
        </section>
    );
};
