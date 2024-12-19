interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  isFetchingPrevPage: boolean;
  isFetchingNextPage: boolean;
  getPrevPage: () => Promise<void>;
  getNextPage: () => Promise<void>;
}

export const Pagination = ({
  currentPage,
  totalPages,
  isFetchingPrevPage,
  isFetchingNextPage,
  getPrevPage,
  getNextPage,
}: IPaginationProps) => {
  return (
    <div className="flex justify-center items-center mt-6 space-x-4">
      {currentPage > 1 && (
        <button
          className="btn"
          onClick={getPrevPage}
          disabled={isFetchingPrevPage}
        >
          {isFetchingPrevPage && <span className="loading loading-spinner" />}
          Previous
        </button>
      )}
      <span>
        Page {currentPage} of {totalPages}
      </span>
      {currentPage < totalPages && (
        <button
          className="btn"
          onClick={getNextPage}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage && <span className="loading loading-spinner" />}
          Next
        </button>
      )}
    </div>
  );
};
