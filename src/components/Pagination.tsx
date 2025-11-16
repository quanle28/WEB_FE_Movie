import React from "react";

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({
                                                          currentPage,
                                                          totalPages,
                                                          onPageChange,
                                                      }) => {
    // Tạo mảng các số trang, ví dụ: [1, 2, 3]
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav className="pagination">
            {/* Nút Về trang trước */}
            <button
                className="pagination__button"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                <i className="fa-solid fa-chevron-left"></i>
            </button>

            {/* Danh sách số trang */}
            {pageNumbers.map((number) => (
                <button
                    key={number}
                    className={`pagination__button ${
                        number === currentPage ? "pagination__button--active" : ""
                    }`}
                    onClick={() => onPageChange(number)}
                >
                    {number}
                </button>
            ))}

            {/* Nút Sang trang sau */}
            <button
                className="pagination__button"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                <i className="fa-solid fa-chevron-right"></i>
            </button>
        </nav>
    );
};
