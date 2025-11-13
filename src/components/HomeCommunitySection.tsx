import React, {useCallback, useRef, useEffect} from "react";
import poster1 from "../assets/homecommunitysection/poster1.png";
import poster2 from "../assets/homecommunitysection/poster2.png";
import poster3 from "../assets/homecommunitysection/poster3.png";
import poster4 from "../assets/homecommunitysection/poster4.png";
import poster5 from "../assets/homecommunitysection/poster5.png";

const topUsers = [
    {
        name: "Xuân Thúy Đào",
        avatar: "https://i.pravatar.cc/100?img=10",
        poster: poster1,
        text: "Phim nhồi thêm kiểu Death race nhưng gói gọn trong 30'",
    },
    {
        name: "Soun Pham",
        avatar: "https://i.pravatar.cc/100?img=11",
        poster: poster2,
        text: "Không ấy mới 6 tập đầu tư khủng vậy thì ráng tới 12 nhé...",
    },
    {
        name: "Thai Ha",
        avatar: "https://i.pravatar.cc/100?img=12",
        poster: poster3,
        text: "xem mà mồm cười toe toét hyhy ",
    },
    {
        name: "BloodyBranch",
        avatar: "https://i.pravatar.cc/100?img=13",
        poster: poster4,
        text: "tr ơi cái tập bùng nổ nhất lun á, cả cp chính lẫn phụ...",
    },
    {
        name: "Karib",
        avatar: "https://i.pravatar.cc/100?img=14",
        poster: poster5,
        text: "phim cuốn vc xem ko ngừng dc mặc dù mai phải đi làm sớm...",
    },
    {
        name: "No Name",
        avatar: "https://i.pravatar.cc/100?img=15",
        poster: poster3,
        text: "Không ấy mới 6 tập đầu tư khủng vậy thì ráng tới 12 nhé...",
    },
    {
        name: "Xuân Thúy Đào",
        avatar: "https://i.pravatar.cc/100?img=16",
        poster: poster1,
        text: "Phim nhồi thêm kiểu Death race nhưng gói gọn trong 30'",
    },
    {
        name: "Soun Pham",
        avatar: "https://i.pravatar.cc/100?img=17",
        poster: poster2,
        text: "Không ấy mới 6 tập đầu tư khủng vậy thì ráng tới 12 nhé...",
    },
    {
        name: "Thai Ha",
        avatar: "https://i.pravatar.cc/100?img=18",
        poster: poster3,
        text: "xem mà mồm cười toe toét hyhy ",
    },
    {
        name: "BloodyBranch",
        avatar: "https://i.pravatar.cc/100?img=19",
        poster: poster4,
        text: "tr ơi cái tập bùng nổ nhất lun á, cả cp chính lẫn phụ...",
    }
];

export const HomeCommunitySection: React.FC = () => {
    // 👉 ref cho dải thẻ top bình luận
    const carouselRef = useRef<HTMLDivElement | null>(null);

    // 👉 hàm cuộn 1 “bước” sang trái / phải
    const scrollTopDiscuss = useCallback((dir: 1 | -1) => {
        const el = carouselRef.current;
        if (!el) return;

        const cards = el.querySelectorAll(".community__card") as NodeListOf<HTMLElement>;
        if (!cards.length) return;

        const gap = 16;                                   // giống CSS
        const step = cards[0].offsetWidth + gap;         // bề rộng 1 card + gap

        // số card hiển thị được trong viewport
        const visibleCount = Math.max(1, Math.floor(el.clientWidth / step));

        // index tối đa (đảm bảo page cuối hiển thị trọn card cuối cùng)
        const maxIndex = Math.max(0, cards.length - visibleCount);

        // index hiện tại (làm tròn theo step)
        const currentIndex = Math.round(el.scrollLeft / step);

        // index tiếp theo
        let nextIndex = currentIndex + dir;
        if (nextIndex < 0) nextIndex = maxIndex;       // cuộn vòng
        if (nextIndex > maxIndex) nextIndex = 0;

        el.scrollTo({
            left: nextIndex * step,                      // luôn thẳng theo từng card
            behavior: "smooth",
        });
    }, []);


    // 👉 auto-play mỗi 5s
    useEffect(() => {
        const id = setInterval(() => {
            scrollTopDiscuss(1);
        }, 5000);

        return () => clearInterval(id);
    }, [scrollTopDiscuss]);

    return (
        <section className="home-community">
            {/* TOP BÌNH LUẬN */}
            <div className="community__top">
                <h2 className="community__title">
                    <i className="fa-solid fa-medal"></i> TOP BÌNH LUẬN
                </h2>
                <div className="community__carousel-wrapper">
                    <div className="community__carousel" ref={carouselRef}>
                        {topUsers.map((u, i) => (
                            <div key={i} className="community__card">
                                {/* nền blur theo poster */}
                                <div
                                    className="community__bg"
                                    style={{ backgroundImage: `url(${u.poster})` }}
                                />

                                <div className="community__card-header">
                                    <div className="community__user">
                                        <img
                                            src={u.avatar}
                                            alt={u.name}
                                            className="community__avatar"
                                        />
                                        <div className="community__user-info">
                                            <h4>{u.name}</h4>
                                            <span className="community__vip">
                                                <i className="fa-solid fa-infinity" />
                                            </span>
                                        </div>
                                    </div>

                                    <img
                                        src={u.poster}
                                        alt={u.name}
                                        className="community__poster"
                                    />
                                </div>

                                <p className="community__text">{u.text}</p>

                                <div className="community__stats">
                                  <span>
                                    <i className="fa-regular fa-eye" /> {5 + i}
                                  </span>
                                                    <span>
                                    <i className="fa-regular fa-heart" /> {3 + i}
                                  </span>
                                                    <span>
                                    <i className="fa-regular fa-comment" /> {i}
                                  </span>
                                </div>

                                {/* lớp fade cuối đáy */}
                                <div className="community__fade"></div>
                            </div>
                        ))}
                    </div>

                    {/* Nút trái / phải */}
                    <button
                        className="community__arrow community__arrow--left"
                        onClick={() => scrollTopDiscuss(-1)}
                        aria-label="Trước"
                    >
                        <i className="fa-solid fa-chevron-left" />
                    </button>
                    <button
                        className="community__arrow community__arrow--right"
                        onClick={() => scrollTopDiscuss(1)}
                        aria-label="Sau"
                    >
                        <i className="fa-solid fa-chevron-right" />
                    </button>
                </div>
            </div>

            <div className="community__bottom">
                {/* SÔI NỔI NHẤT */}
                <div className="community__col">
                    <h3><i className="fa-solid fa-clapperboard"></i> SÔI NỔI NHẤT</h3>
                    <ul>
                        {["Trò Chơi Thao Túng", "Năm Ngón Tay Diệu Kỳ", "X Thân Mến!", "Frankenstein", "Thế Lực: Bản Châu Á"].map(
                            (name, i) => (
                                <li key={i}>
                                    <span className="rank">{i + 1}.</span> {name}
                                </li>
                            )
                        )}
                    </ul>
                </div>

                {/* YÊU THÍCH NHẤT */}
                <div className="community__col">
                    <h3><i className="fa-solid fa-heart"></i> YÊU THÍCH NHẤT</h3>
                    <ul>
                        {["Trò Chơi Thao Túng", "X Thân Mến!", "Năm Ngón Tay Diệu Kỳ", "Nụ Hôn Bùng Nổ", "Frankenstein"].map(
                            (name, i) => (
                                <li key={i}>
                                    <span className="rank">{i + 1}.</span> {name}
                                </li>
                            )
                        )}
                    </ul>
                </div>

                {/* BÌNH LUẬN MỚI */}
                <div className="community__col">
                    <h3><i className="fa-solid fa-bolt"></i> BÌNH LUẬN MỚI</h3>
                    <ul className="community__comments">
                        {[
                            { name: "Kim Jiwon", text: "mà cutee chết đi được 😭" },
                            { name: "NGUYỄN MINH ĐỨC", text: "chú Ngố với người Sấm Sét hài vl 😆" },
                            { name: "haftthu", text: "xem giơ gắt này cười đau bụng 🤣" },
                        ].map((c, i) => (
                            <li key={i}>
                                <strong>{c.name}</strong>
                                <p>{c.text}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};
