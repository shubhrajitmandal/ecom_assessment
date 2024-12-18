import Link from "next/link";

interface IPaginationProps {
  currentPage: number;
  totalPages: number;
}

export const Pagination = ({ currentPage, totalPages }: IPaginationProps) => {
  return (
    <div className="flex justify-center items-center mt-6 space-x-4">
      {currentPage > 1 && (
        <Link href={`/products?page=${currentPage - 1}`}>
          <button className="btn">Previous</button>
        </Link>
      )}
      <span>
        Page {currentPage} of {totalPages}
      </span>
      {currentPage < totalPages && (
        <Link href={`/products?page=${currentPage + 1}`}>
          <button className="btn">Next</button>
        </Link>
      )}
    </div>
  );
};
