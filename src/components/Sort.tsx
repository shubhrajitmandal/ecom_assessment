interface ISortProps {
  isSorting: boolean;
  sortOption: string;
  handleSort: (option: string) => Promise<void>;
}

export const Sort = ({ isSorting, sortOption, handleSort }: ISortProps) => {
  return (
    <div className="flex items-center justify-end gap-4">
      <label
        htmlFor="sorting"
        className="text-gray-700 font-medium flex items-center gap-2"
      >
        {isSorting && <span className="loading loading-spinner" />}
        {isSorting ? "Sorting..." : "Sort by: "}
      </label>
      <select
        id="sorting"
        value={sortOption}
        onChange={(e) => handleSort(e.target.value)}
        className="select select-bordered w-48 max-w-xs"
        disabled={isSorting}
      >
        <option value="default">Default</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  );
};
