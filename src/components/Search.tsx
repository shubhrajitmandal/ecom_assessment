import { Dispatch, SetStateAction } from "react";

interface ISearchProps {
  loading: boolean;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
  handleSearch: (e: React.FormEvent) => Promise<void>;
  clearSearch: () => Promise<void>;
}

export const Search = ({
  loading,
  searchQuery = "",
  setSearchQuery,
  handleSearch,
  clearSearch,
}: ISearchProps) => {
  return (
    <form onSubmit={handleSearch} className="mb-6 flex items-center gap-4">
      <label className="input input-bordered flex items-center gap-2 w-full ">
        <input
          className="grow"
          name="q"
          placeholder="Search products (title or category)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fill-rule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clip-rule="evenodd"
          />
        </svg>
      </label>

      <div className="flex gap-2">
        <button type="submit" className="btn">
          {loading && <span className="loading loading-spinner" />}
          {loading ? "Searching..." : "Search"}
        </button>

        {searchQuery && (
          <button type="button" onClick={clearSearch} className="btn">
            Clear
          </button>
        )}
      </div>
    </form>
  );
};
