// import React, {useRef, useState} from "react";
//
// type Badge = { text: string; color?: "green" | "blue" | "gray" };
// type Item = {
//     href: string;
//     thumb: string;
//     title: string;
//     subtitle?: string;
//     badges?: Badge[];
// };
//
// type ShowcaseSectionProps = {
//     title: string;               // "Phim Hàn Quốc mới"
//     accent?: "blue" | "yellow" | "pink";  // màu tiêu đề
//     seeAllHref: string;
//     items: Item[];               // danh sách poster
// };
//
// export const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({
//                                                                     title,
//                                                                     accent = "blue",
//                                                                     seeAllHref,
//                                                                     items,
//                                                                 }) => {
//     const scrollerRef = useRef<HTMLDivElement | null>(null);
//     const bodyRef = useRef<HTMLDivElement | null>(null);
//
//     const [hover, setHover] = useState<{
//         index: number;
//         left: number;
//         top: number;
//         width: number;
//     } | null>(null);
//
//     const scrollByOne = (dir: 1 | -1) => {
//         const el = scrollerRef.current;
//         if (!el) return;
//
//         const card = el.querySelector(".showcase__card") as HTMLElement;
//         if (!card) return;
//
//         const scrollAmount = card.offsetWidth + 24; // 24 là khoảng cách gap giữa các card
//         el.scrollBy({ left: dir * scrollAmount, behavior: "smooth" });
//     };
//
//     const openPreview = (e: React.MouseEvent, index: number) => {
//         const body = bodyRef.current!;
//         const card = (e.currentTarget as HTMLElement).closest(
//             ".showcase__card"
//         ) as HTMLElement;
//         if (!body || !card) return;
//
//         const bodyRect = body.getBoundingClientRect();
//         const cardRect = card.getBoundingClientRect();
//
//         // vị trí tương đối so với body
//         let left = cardRect.left - bodyRect.left;
//         const top = cardRect.top - bodyRect.top;
//         const width = 560; // chiều rộng preview
//
//         // giữ preview trong khung body
//         const maxLeft = bodyRect.width - width;
//         left = Math.max(0, Math.min(left, maxLeft));
//
//         setHover({ index, left, top, width });
//     };
//
//     const closePreview = () => setHover(null);
//
//     return (
//         <section className="showcase">
//             <div className="showcase__inner">
//                 {/* Aside trái */}
//                 <aside className="showcase__aside">
//                     <h3
//                         className={`showcase__title showcase__title--${accent}`}
//                         dangerouslySetInnerHTML={{
//                             __html: title.replace(" ", "<br/>"), // xuống dòng nhẹ giống hình
//                         }}
//                     />
//                     <a className="showcase__seeall" href={seeAllHref}>
//                         Xem toàn bộ <span>›</span>
//                     </a>
//                 </aside>
//
//                 {/* List phải */}
//                 <div className="showcase__body">
//                     <div className="showcase__rail">
//                         <div className="showcase__scroller" ref={scrollerRef}>
//                             {items.map((it, i) => (
//                                 <a key={i} href={it.href} className="showcase__card">
//                                     <div className="showcase__thumb">
//                                         <img src={it.thumb} alt={it.title} />
//                                         <div className="showcase__badges">
//                                             {it.badges?.map((b, idx) => (
//                                                 <span
//                                                     key={idx}
//                                                     className={`showcase__badge ${
//                                                         b.color ? `showcase__badge--${b.color}` : ""
//                                                     }`}
//                                                 >
//                             {b.text}
//                           </span>
//                                             ))}
//                                         </div>
//                                     </div>
//                                     <div className="showcase__meta">
//                                         <div className="showcase__name">{it.title}</div>
//                                         {it.subtitle && (
//                                             <div className="showcase__sub">{it.subtitle}</div>
//                                         )}
//                                     </div>
//                                 </a>
//                             ))}
//                         </div>
//
//                         <button
//                             className="showcase__arrow showcase__arrow--left"
//                             onClick={() => scrollByOne(-1)}
//                         >
//                             ‹
//                         </button>
//                         <button
//                             className="showcase__arrow showcase__arrow--right"
//                             onClick={() => scrollByOne(1)}
//                         >
//                             ›
//                         </button>
//
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

import React, { useEffect, useRef, useState } from "react";

type Badge = { text: string; color?: "green" | "blue" | "gray" };
type Item = {
    href: string;
    thumb: string;
    title: string;
    subtitle?: string;
    badges?: Badge[];
};

type ShowcaseSectionProps = {
    title: string;
    accent?: "blue" | "yellow" | "pink";
    seeAllHref: string;
    items: Item[];
};

const PREVIEW_WIDTH = 460;
const PREVIEW_HEIGHT = 360; // ➕ NEW: ước lượng chiều cao preview để clamp top

export const ShowcaseSection: React.FC<ShowcaseSectionProps> = ({
                                                                    title,
                                                                    accent = "blue",
                                                                    seeAllHref,
                                                                    items,
                                                                }) => {
    const scrollerRef = useRef<HTMLDivElement | null>(null);
    const bodyRef = useRef<HTMLDivElement | null>(null);

    const [hover, setHover] = useState<{
        index: number;
        left: number;
        top: number;
        width: number;
    } | null>(null);

    // ➕ NEW: delay nhỏ để tránh flicker khi di chuyển từ thumb sang preview
    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
    const cancelClose = () => { if (closeTimer.current) clearTimeout(closeTimer.current); };
    const closeSoon = () => {
        cancelClose();
        closeTimer.current = setTimeout(() => setHover(null), 80);
    };
    const closeNow = () => { cancelClose(); setHover(null); };

    /** Cuộn đúng 1 card mỗi lần */
    const scrollByOne = (dir: 1 | -1) => {
        const el = scrollerRef.current;
        if (!el) return;
        const card = el.querySelector(".showcase__card") as HTMLElement | null;
        if (!card) return;
        const gap = 24;
        const step = card.offsetWidth + gap;
        el.scrollBy({ left: dir * step, behavior: "smooth" });
    };

    /** Tính và mở preview tại vị trí thumbnail được hover */
    const openPreview = (e: React.MouseEvent, index: number) => {
        const bodyEl = bodyRef.current;
        const cardEl = (e.currentTarget as HTMLElement).closest(
            ".showcase__card"
        ) as HTMLElement | null;
        if (!bodyEl || !cardEl) return;

        const bodyRect = bodyEl.getBoundingClientRect();
        const cardRect = cardEl.getBoundingClientRect();

        // 🔧 CHANGED: canh giữa preview theo card cho đẹp
        let left = (cardRect.left - bodyRect.left) + (cardRect.width / 2) - (PREVIEW_WIDTH / 2);


        // clamp trái/phải trong khung body
        const maxLeft = bodyRect.width - PREVIEW_WIDTH;
        left = Math.max(0, Math.min(left, maxLeft));

        // 🔧 CHANGED: clamp top để không tràn khung
        let top = cardRect.top - bodyRect.top - 20;
        const maxTop = Math.max(0, bodyRect.height - PREVIEW_HEIGHT);
        top = Math.max(0, Math.min(top, maxTop));

        cancelClose(); // ➕ NEW: nếu đang đếm ngược đóng thì huỷ
        setHover({ index, left, top, width: PREVIEW_WIDTH });
    };

    // ➕ NEW: đóng preview khi cuộn, rời khỏi body, thay đổi kích thước
    useEffect(() => {
        const sc = scrollerRef.current;
        const onScroll = () => closeNow();
        sc?.addEventListener("scroll", onScroll, { passive: true });

        const onResize = () => closeNow();
        window.addEventListener("resize", onResize);

        return () => {
            sc?.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return (
        <section className="showcase">
            <div className="showcase__inner">
                {/* Aside trái */}
                <aside className="showcase__aside">
                    <h3
                        className={`showcase__title showcase__title--${accent}`}
                        dangerouslySetInnerHTML={{ __html: title.replace(" ", "<br/>") }}
                    />
                    <a className="showcase__seeall" href={seeAllHref}>
                        Xem toàn bộ <span>›</span>
                    </a>
                </aside>

                {/* Phần phải */}
                <div
                    className="showcase__body"
                    ref={bodyRef}
                    onMouseLeave={closeSoon}      // ➕ NEW: rời body thì đóng nhẹ
                    onMouseEnter={cancelClose}     // ➕ NEW: vào lại thì huỷ đóng
                >
                    <div className="showcase__rail">
                        <div className="showcase__scroller" ref={scrollerRef}>
                            {items.map((it, i) => (
                                <a key={i} href={it.href} className="showcase__card">
                                    <div
                                        className="showcase__thumb"
                                        onMouseEnter={(e) => openPreview(e, i)} // 🔧 giữ nguyên
                                        onMouseLeave={closeSoon}               // 🔧 dùng closeSoon thay vì đóng ngay
                                    >
                                        <img src={it.thumb} alt={it.title} />
                                        <div className="showcase__badges">
                                            {it.badges?.map((b, idx) => (
                                                <span
                                                    key={idx}
                                                    className={`showcase__badge ${
                                                        b.color ? `showcase__badge--${b.color}` : ""
                                                    }`}
                                                >
                          {b.text}
                        </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="showcase__meta">
                                        <div className="showcase__name">{it.title}</div>
                                        {it.subtitle && <div className="showcase__sub">{it.subtitle}</div>}
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* arrows */}
                        <button
                            className="showcase__arrow showcase__arrow--left"
                            onClick={() => scrollByOne(-1)}
                            aria-label="Prev"
                        >
                            ‹
                        </button>
                        <button
                            className="showcase__arrow showcase__arrow--right"
                            onClick={() => scrollByOne(1)}
                            aria-label="Next"
                        >
                            ›
                        </button>
                    </div>

                    {/* PREVIEW nổi */}
                    {hover && (
                        <div
                            className="preview"
                            style={{ left: hover.left, top: hover.top, width: hover.width }}
                            onMouseEnter={cancelClose}  // ➕ NEW: di vào preview thì giữ mở
                            onMouseLeave={closeSoon}    // ➕ NEW: rời preview mới đóng
                        >
                            <div className="preview__poster">
                                <img src={items[hover.index].thumb} alt="" />
                                <div className="preview__poster-fade" />
                            </div>

                            <div className="preview__content">
                                <h4 className="preview__title">{items[hover.index].title}</h4>
                                {items[hover.index].subtitle && (
                                    <div className="preview__sub">{items[hover.index].subtitle}</div>
                                )}

                                <div className="preview__actions">
                                    <a className="btn btn--play" href={items[hover.index].href}>
                                        <i className="fa-solid fa-play" /> Xem ngay
                                    </a>
                                    <button className="btn btn--ghost">
                                        <i className="fa-regular fa-heart" /> Thích
                                    </button>
                                    <a className="btn btn--ghost" href={items[hover.index].href}>
                                        <i className="fa-solid fa-circle-info" /> Chi tiết
                                    </a>
                                </div>

                                <div className="preview__meta">
                  <span className="chip chip--imdb">
                    <strong>IMDb</strong> 9.0
                  </span>
                                    <span className="chip">T16</span>
                                    <span className="chip">2025</span>
                                    <span className="chip">Phần 1</span>
                                    <span className="chip">Tập 8</span>
                                </div>

                                <div className="preview__tags">
                                    <span>Chính Kịch</span>•<span>Đời Thường</span>•<span>Hài</span>•
                                    <span>Tâm Lý</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};
