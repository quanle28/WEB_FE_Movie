import React from 'react';
import { Movie } from '../data/mockData';

type EpisodeListProps = {
    movie: Movie;
};

export const EpisodeList: React.FC<EpisodeListProps> = ({ movie }) => {
    // Nếu là phim bộ, bạn sẽ lặp qua danh sách tập
    // Nếu là phim lẻ, chỉ hiển thị 1 mục
    return (
        <section className="episode-list">
            <h3 className="section-title">Các bản chiếu</h3>
            <div className="episode-list__grid">
                {/* Đây là 1 item, nếu là phim bộ thì bạn map qua đây */}
                <a href="#" className="episode-list__item episode-list__item--active">
                    <div className="episode-list__thumb">
                        <img src={movie.poster} alt={movie.title} />
                        <span className="episode-list__tag">Đang xem</span>
                    </div>
                    <div className="episode-list__info">
                        <span>Phụ đề</span>
                        <h4>{movie.title}</h4>
                    </div>
                </a>
                {/* Thêm các tập khác ở đây nếu là phim bộ */}
            </div>
        </section>
    );
};
