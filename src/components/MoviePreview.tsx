import React from "react";
import {Movie} from "../data/mockData.ts";
import {Link} from "react-router-dom";

// Để MoviePreview nhận được toàn bộ dữ liệu của Movie
type MoviePreviewProps = {
    movie: Movie;
    // 👇 Bỏ 'transform' vì chúng ta không dùng nó nữa
    position: { left: number; top: number };
    onClose: () => void;
    onMouseEnter: () => void;
};

export const MoviePreview: React.FC<MoviePreviewProps> = ({
                                                              movie,
                                                              position,
                                                              onClose,
                                                              onMouseEnter,
                                                          }) => {
    if (!movie) return null;

    return (
        <div className="movie-preview"
             style={position}
             onMouseLeave={onClose}
             onMouseEnter={onMouseEnter}
        >
            {/* Hình ảnh/Video trong preview */}
            <div className="movie-preview__media">
                <img src={movie.poster} alt={movie.title} /> {/* Dùng poster tạm */}
                {/* Có thể thêm video player ở đây */}
            </div>

            <div className="movie-preview__content">
                <h3 className="movie-preview__title">{movie.title}</h3>
                <p className="movie-preview__subtitle">{movie.subtitle}</p>

                {/* Các nút hành động */}
                <div className="movie-preview__actions">
                    <Link
                        to={`/xem-phim/${movie.slug}`}
                        className="btn btn--primary"
                    >
                        <i className="fa-solid fa-play"></i> Xem ngay
                    </Link>
                    <button className="btn btn--secondary">
                        <i className="fa-regular fa-heart"></i> Thích
                    </button>
                    <button className="btn btn--secondary">
                        <i className="fa-solid fa-info"></i> Chi tiết
                    </button>
                </div>

                {/* Metadata (IMDB, năm, thời lượng) */}
                <div className="movie-preview__meta">
                    <span className="movie-preview__imdb">IMDB 5.8</span>{" "}
                    <span>2025</span> <span>1h 20m</span>
                </div>

                {/* Thể loại */}
                <div className="movie-preview__genres">
                    {movie.genres.map((genre, index) => (
                        <span key={index}>{genre.replace(/-/g, " ")}</span> // replace "-" to space
                    ))}
                </div>
            </div>
        </div>
    );
};
