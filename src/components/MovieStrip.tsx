// src/components/MovieStrip.tsx
import React, { useRef, useState } from "react";

type MovieStripProps = {
    thumbs: string[];
    activeIndex: number;
    onSelect: (index: number) => void;
};

export const MovieStrip: React.FC<MovieStripProps> = ({
                                                          thumbs,
                                                          activeIndex,
                                                          onSelect,
                                                      }) => {
    const stripRef = useRef<HTMLDivElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!stripRef.current) return;
        setIsDragging(true);
        setStartX(e.clientX);
        setScrollLeft(stripRef.current.scrollLeft);
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging || !stripRef.current) return;
        const walk = e.clientX - startX;
        stripRef.current.scrollLeft = scrollLeft - walk;
    };

    const stopDragging = () => setIsDragging(false);

    return (
        <div
            ref={stripRef}
            className="movie-strip"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={stopDragging}
            onMouseLeave={stopDragging}
        >
            {thumbs.map((src, index) => (
                <button
                    key={index}
                    type="button"
                    className={`movie-strip__item ${
                        index === activeIndex ? "movie-strip__item--active" : ""
                    }`}
                    onClick={() => onSelect(index)}
                >
                    <img src={src} alt={`Thumb ${index + 1}`} />
                </button>
            ))}
        </div>
    );
};
