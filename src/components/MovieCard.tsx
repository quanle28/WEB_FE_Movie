import React from "react";
import {Movie} from "../data/mockData.ts";

// 👇 1. Dùng Movie type và thêm 2 props
type MovieCardProps = Movie & {
    onMouseEnter: (e: React.MouseEvent<HTMLAnchorElement>, movie: Movie) => void;
    onMouseLeave: () => void;
};

// 👇 2. Nhận `props`
export const MovieCard: React.FC<MovieCardProps> = (props) => {
    // 👇 3. Tách các props ra
    const {
        poster,
        title,
        subtitle,
        tags,
        onMouseEnter,
        onMouseLeave,
        ...movieObject // Lấy TẤT CẢ các props còn lại (id, genres, type...)
    } = props;

    // 👇 4. Tái tạo lại đối tượng movie hoàn chỉnh
    const movie: Movie = { poster, title, subtitle, tags, ...movieObject };

    return (
        <a href="#" className="movie-card"
           onMouseEnter={(e) => onMouseEnter(e, movie)}
           onMouseLeave={onMouseLeave}
        >
            <div className="movie-card__thumb">
                <img src={poster} alt={title} loading="lazy" />

                <div className="movie-card__badges">
                    {tags.map((tag, index) => (
                        // Thêm key={tag.text}
                        <span key={tag.text + index} className={`movie-card__badge movie-card__badge--${tag.color}`}>
                            {tag.text}
                        </span>
                    ))}
                </div>
            </div>
            <div className="movie-card__info">
                <h4 className="movie-card__title">{title}</h4>
                <p className="movie-card__subtitle">{subtitle}</p>
            </div>
        </a>
    );
};
