import { ShowcaseSection } from "../components/ShowcaseSection";
import h1 from "../assets/homelist/homelist1.png";
import h2 from "../assets/homelist/homelist2.png";
import h3 from "../assets/homelist/homelist3.png";
import h4 from "../assets/homelist/homelist7.png";

import c1 from "../assets/homelist/homelist4.png";
import c2 from "../assets/homelist/homelist5.png";
import c3 from "../assets/homelist/homelist6.png";
import c4 from "../assets/homelist/homelist8.png";

import d1 from "../assets/homelist/homelist10.png";
import d2 from "../assets/homelist/homelist11.png";
import d3 from "../assets/homelist/homelist12.png";
import d4 from "../assets/homelist/homelist13.png";

export function HomeLists() {
    const korea = [
        { href: "/p/nu-hon-bung-no", thumb: h1, title: "Nụ Hôn Bùng Nổ", subtitle: "Dynamite Kiss", badges: [{ text: "PĐ. 1", color: "blue" }] },
        { href: "/p/nam-ngon-tay-dieu-ky", thumb: h2, title: "Năm Ngón Tay Diệu Kỳ", subtitle: "Spirit Fingers", badges: [{ text: "PĐ. 8", color: "gray" }, { text: "TM. 6", color: "green" }] },
        { href: "/p/tro-choi-thao-tung", thumb: h3, title: "Trò Chơi Thao Túng", subtitle: "The Manipulated" },
        { href: "/p/phi-cong-tre-theo-duoi-tinh-yeu", thumb: h4, title: "Phi Công Trẻ Theo Đuổi Tình Yêu", subtitle: "Noona Is a Woman to Me" },
        { href: "/p/phi-cong-tre-theo-duoi-tinh-yeu", thumb: h4, title: "Phi Công Trẻ Theo Đuổi Tình Yêu", subtitle: "Noona Is a Woman to Me" },
        { href: "/p/phi-cong-tre-theo-duoi-tinh-yeu", thumb: h4, title: "Phi Công Trẻ Theo Đuổi Tình Yêu", subtitle: "Noona Is a Woman to Me" },
        { href: "/p/phi-cong-tre-theo-duoi-tinh-yeu", thumb: h4, title: "Phi Công Trẻ Theo Đuổi Tình Yêu", subtitle: "Noona Is a Woman to Me" },
    ];

    const china = [
        { href: "/p/noi-nho-theo-gio-bac", thumb: c1, title: "Nỗi Nhớ Theo Gió Bắc", subtitle: "Yi Yi Xiang Bei Feng", badges: [{ text: "PĐ. 28", color: "blue" }] },
        { href: "/p/son-ha-cham", thumb: c2, title: "Sơn Hà Chẩm", subtitle: "Fight for Love", badges: [{ text: "PĐ. 28", color: "blue" }] },
        { href: "/p/thuy-long-ngam", thumb: c3, title: "Thủy Long Ngâm", subtitle: "Whispers of Fate", badges: [{ text: "PĐ. 31", color: "gray" }, { text: "LT. 25", color: "blue" }, { text: "TM. 30", color: "green" }] },
        { href: "/p/duong-trieu-quy-su-luc", thumb: c4, title: "Đường Triều Quỷ Sự Lục", subtitle: "Strange Tale Of Tang Dynasty", badges: [{ text: "PĐ. 31", color: "gray" }, { text: "LT. 25", color: "blue" }, { text: "TM. 30", color: "green" }] },
    ];

    const usuk = [
        { href: "/p/robin-hood", thumb: d1, title: "Robin Hood", subtitle: "Robin Hood", badges: [{ text: "PĐ. 28", color: "blue" }] },
        { href: "/p/duong-ve-coi-chet", thumb: d2, title: "Đường Về Cõi Chết", subtitle: "Down Cemetery Road", badges: [{ text: "PĐ. 28", color: "blue" }] },
        { href: "/p/9-1-1-nashville", thumb: d3, title: "9-1-1: Nashville", subtitle: "9-1-1: Nashville", badges: [{ text: "PĐ. 31", color: "gray" }, { text: "LT. 25", color: "blue" }, { text: "TM. 30", color: "green" }] },
        { href: "/p/ong-trum-giang-ho", thumb: d4, title: "Ông Trùm Giang Hồ", subtitle: "Tulsa King", badges: [{ text: "PĐ. 31", color: "gray" }, { text: "LT. 25", color: "blue" }, { text: "TM. 30", color: "green" }] },
    ];

    return (
        <>
            <section className="showcase-wrapper">
                <ShowcaseSection
                    title="Phim Hàn Quốc mới"
                    accent="blue"
                    seeAllHref="/quoc-gia/han-quoc"
                    items={korea}
                />
                <ShowcaseSection
                    title="Phim Trung Quốc mới"
                    accent="yellow"
                    seeAllHref="/quoc-gia/trung-quoc"
                    items={china}
                />
                <ShowcaseSection
                    title="Phim US-UK mới"
                    accent="pink"
                    seeAllHref="/quoc-gia/us-uk"
                    items={usuk}
                />

            </section>
        </>
    );
}
