import React from 'react';
import { Movie } from '../data/mockData';

type WatchInfoProps = {
    movie: Movie;
};

export const WatchInfo: React.FC<WatchInfoProps> = ({ movie }) => {
    return (
        <section className="watch-info">
            <div className="watch-info__poster">
                <img src={movie.poster} alt={movie.title} />
            </div>

            {/* Cột trái: Thông tin */}
            <div className="watch-info__details">
                <h2 className="watch-info__title">{movie.title}</h2>
                <p className="watch-info__subtitle">{movie.subtitle}</p>

                <div className="watch-info__meta">
                    <span className="chip chip--imdb2"><strong>IMDb</strong> 5.8</span>
                    {movie.tags.map(tag => (
                        <span key={tag.text} className="chip2">{tag.text}</span>
                    ))}
                    <span className="chip2">2025</span>
                    <span className="chip2">1h 20m</span>
                </div>

                <div className="watch-info__tags">
                    {movie.genres.map(genre => (
                        <span key={genre}>{genre.replace(/-/g, ' ')}</span>
                    ))}
                </div>

                <p className="watch-info__desc">{movie.description}</p>
                <a href="#" className="watch-info__more">
                    Thông tin phim <i className="fa-solid fa-chevron-right"></i>
                </a>
            </div>

            {/* Cột phải: Nút actions */}
            <div className="watch-info__actions">
                <button className="btn-action">
                    <i className="fa-regular fa-star"></i> Đánh giá
                </button>
                <button className="btn-action">
                    <i className="fa-regular fa-comment"></i> Bình luận
                </button>
                <button className="btn-action btn-action--rating">
                    <strong>4.0</strong>
                    <span>Đánh giá</span>
                </button>
            </div>
        </section>
    );
};
