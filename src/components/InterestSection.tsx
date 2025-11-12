// src/components/InterestSection.tsx
import React from "react";

type Topic = {
    label: string;
    type: string;   // dùng để gán màu
    href: string;   // link khi click
};

const topics: Topic[] = [
    { label: "Marvel",            type: "primary",  href: "/chu-de/marvel" },
    { label: "Keo Lỳ Slayyy",     type: "purple",   href: "/chu-de/keo-ly-slayyy" },
    { label: "Sitcom",            type: "green",    href: "/chu-de/sitcom" },
    { label: "4K",                type: "gray",     href: "/chu-de/4k" },
    { label: "Lồng Tiếng Cực Mạnh", type: "violet", href: "/chu-de/long-tieng-cuc-manh" },
    { label: "Đỉnh Nóc",          type: "teal",     href: "/chu-de/dinh-noc" },
    { label: "Xuyên Không",       type: "orange",   href: "/chu-de/xuyen-khong" },
    { label: "9x",                type: "green2",   href: "/chu-de/9x" },
    { label: "Cổ Trang",          type: "red",      href: "/chu-de/co-trang" },
    { label: "Tham Vọng",         type: "pink",     href: "/chu-de/tham-vong" },
    { label: "Chữa Lành",         type: "softpink", href: "/chu-de/chua-lanh" },
    { label: "Phù Thủy",          type: "magenta",  href: "/chu-de/phu-thuy" },
];

export const InterestSection: React.FC = () => {
    return (
        <section className="interest">
            <div className="interest__inner">
                <h2 className="interest__title">Bạn đang quan tâm gì?</h2>

                <div className="interest__grid">
                    {topics.map((topic) => (
                        <a
                            key={topic.label}
                            href={topic.href}
                            className={`interest__card interest__card--${topic.type}`}
                        >
                            <div className="interest__card-content">
                                <div className="interest__card-title">{topic.label}</div>
                                <div className="interest__card-cta">
                                    Xem toàn bộ <span>›</span>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};
