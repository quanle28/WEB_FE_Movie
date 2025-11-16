import React from 'react';
// Import mock data để làm sidebar
import { MOCK_ALL_MOVIES } from '../data/mockData';

// Dữ liệu giả lập cho diễn viên
const mockActors = [
    { id: 1, name: 'Josephine Park', image: 'https://i.pravatar.cc/100?img=1' },
    { id: 2, name: 'Dar Salim', image: 'https://i.pravatar.cc/100?img=2' },
    { id: 3, name: 'Josephine Chavarria', image: 'https://i.pravatar.cc/100?img=3' },
    { id: 4, name: 'Anders W. Berthelsen', image: 'https://i.pravatar.cc/100?img=4' },
    { id: 5, name: 'Sara Jiménez', image: 'https://i.pravatar.cc/100?img=5' },
    { id: 6, name: 'Sebastian Jessen', image: 'https://i.pravatar.cc/100?img=6' },
];

// Dữ liệu giả lập cho Đề xuất
const mockSuggestions = MOCK_ALL_MOVIES.slice(0, 3); // Lấy 3 phim đầu tiên

export const WatchSidebar: React.FC = () => {
    return (
        <>
            {/* Phần Diễn viên */}
            <section className="actor-list">
                <h3 className="section-title">Diễn viên</h3>
                <div className="actor-list__grid">
                    {mockActors.map(actor => (
                        <a href="#" key={actor.id} className="actor-list__item">
                            <img src={actor.image} alt={actor.name} />
                            <span>{actor.name}</span>
                        </a>
                    ))}
                </div>
            </section>

            {/* Phần Đề xuất */}
            <section className="suggestion-list">
                <h3 className="section-title">Đề xuất cho bạn</h3>
                <div className="suggestion-list__grid">
                    {mockSuggestions.map(movie => (
                        <a href={`/xem-phim/${movie.slug}`} key={movie.id} className="suggestion-list__item">
                            <img src={movie.poster} alt={movie.title} />
                            <div className="suggestion-list__info">
                                <h4>{movie.title}</h4>
                                <div className="suggestion-list__meta">
                                    <span className="chip">T16</span>
                                    <span className="chip">2024</span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </section>
        </>
    );
};
