// Định nghĩa kiểu dữ liệu cho một bộ phim
export type Movie = {
    id: string;
    title: string;
    subtitle: string;
    poster: string;
    tags: { text: string; color: "blue" | "green" | "gray" }[];
    type: "phim-le" | "phim-bo";
    genres: string[];
    country: string;
    topics: string[];
    slug: string; // 👈 TÊN PHIM TRÊN URL (ví dụ: "khach-san-vuon-xoai")
    videoUrl: string; // 👈 LINK NHÚNG VIDEO
    description: string; // 👈 THÊM TRƯỜNG MÔ TẢ NÀY
};

export const MOCK_ALL_MOVIES: Movie[] = [
    // Phim Lẻ, Thể loại Anime
    {
        id: "movie_1",
        title: "Phim Lẻ Anime 1",
        subtitle: "Your Name",
        poster: "https://picsum.photos/id/101/300/450",
        tags: [{ text: "L.Tiếng", color: "blue" }],
        type: "phim-le", // 👈
        genres: ["anime", "tinh-cam", "gia-tuong"],
        country: "han-quoc",
        topics: ["marvel", "keo-ly-slayyy","sitcom", "4k","long-tieng-cuc-manh", "dinh-noc", "xuyen-khong", "9x", "co-trang", "tham-vong", "chua-lanh", "phu-thuy"], // 👈 Thêm chủ đề
        slug: "phim-le-anime-1-your-name", // 👈
        videoUrl: "https://vip.opstream90.com/share/a8ae6106b51fa41d5f17865c0d958263",
        description: "Hai con người xa lạ bỗng bị hoán đổi cơ thể cho nhau một cách kỳ lạ, tạo nên những tình huống dở khóc dở cười nhưng cũng đầy lãng mạn."
    },
    // Phim Bộ, Thể loại Hành Động
    {
        id: "movie_2",
        title: "Phim Bộ Hành Động",
        subtitle: "Game of Thrones",
        poster: "https://picsum.photos/id/102/300/450",
        tags: [{ text: "T.Minh", color: "green" }],
        type: "phim-bo", // 👈
        genres: ["hanh-dong", "chinh-kich", "gia-tuong"], // 👈
        country: "anh",
        topics: ["chua-lanh", "hoc-duong"],
        slug: "phim-le-anime-1s", // 👈
        videoUrl: "https://www.youtube.com/embed/3KRc-KKYNFU",
        description: "Một quản lý khách sạn tham vọng cùng cô gái miễn cưỡng của mình đi đến Malaga. Tại đó, họ tìm thấy điều họ hằng khao khát trong vườn xoài thanh bình của một người nông dân."
    },
    // Phim Lẻ, Thể loại Bí Ẩn
    {
        id: "movie_3"+ Math.floor(Math.random() * 70),
        title: "Phim Lẻ Bí Ẩn",
        subtitle: "Shutter Island",
        poster: "https://picsum.photos/id/103/300/450",
        tags: [{ text: "L.Tiếng", color: "blue" }],
        type: "phim-le", // 👈
        genres: ["bi-an", "tam-ly"], // 👈
        country: "canada",
        topics: ["chua-lanh", "hoc-duong"],
        slug: "phim-le-anime-1-sd-name", // 👈
        videoUrl: "https://www.youtube.com/embed/3KRc-KKYNFU",
        description: "Một quản lý khách sạn tham vọng cùng cô gái miễn cưỡng của mình đi đến Malaga. Tại đó, họ tìm thấy điều họ hằng khao khát trong vườn xoài thanh bình của một người nông dân."
    },
    // ... (Thêm 47 phim nữa với 'type' và 'genres' khác nhau)
];
