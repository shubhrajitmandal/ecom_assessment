import { GetStaticProps } from "next";
import { useState, useCallback } from "react";

import { Search, ProductCard, Pagination, Sort } from "@/components";
import { IProduct } from "@/models";

interface IProductsProps {
  items: IProduct[];
  pages: number;
  count: number;
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?page=1`
  );
  const { items, pages, count } = await res.json();

  return {
    props: {
      items,
      pages,
      count,
    },
    revalidate: 10,
  };
};

export default function Home({ items, pages, count }: IProductsProps) {
  const [products, setProducts] = useState(items);

  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [isSorting, setIsSorting] = useState(false);
  const [sortOption, setSortOption] = useState<string>("default");

  const [isFetchingPrevPage, setIsFetchingPrevPage] = useState(false);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(pages);
  const [totalProducts, setTotalProducts] = useState(count);

  const handleSearch = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!searchQuery) return;

      setIsSearching(true);
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/products?q=${searchQuery}&sort=${sortOption}&page=1`
        );
        const data = await res.json();
        const { items, pages, count } = data;
        setProducts(items);
        setTotalPages(pages);
        setCurrentPage(1);
        setTotalProducts(count);
      } catch (error) {
        console.error(error);
      } finally {
        setIsSearching(false);
      }
    },
    [searchQuery, currentPage]
  );

  const clearSearch = useCallback(async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products?page=1`
      );
      const data = await res.json();
      const { items, pages, count } = data;

      setProducts(items);
      setTotalPages(pages);
      setSearchQuery("");
      setCurrentPage(1);
      setTotalProducts(count);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleSort = async (sortOption: string) => {
    setIsSorting(true);
    setSortOption(sortOption);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products?q=${searchQuery}&sort=${sortOption}&page=${currentPage}`
      );
      const data = await res.json();
      const { items, pages } = data;

      setProducts(items);
      setTotalPages(pages);
    } catch (error) {
      console.log(error);
    } finally {
      setIsSorting(false);
    }
  };

  const getPrevPage = useCallback(async () => {
    setIsFetchingPrevPage(true);
    try {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/api/products?q=${searchQuery}&sort=${sortOption}&page=${
          currentPage - 1
        }`
      );
      const data = await res.json();
      const { items, pages } = data;

      setProducts([...items]);
      setTotalPages(pages);
      setCurrentPage(currentPage - 1);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetchingPrevPage(false);
    }
  }, [currentPage, searchQuery, sortOption]);

  const getNextPage = useCallback(async () => {
    setIsFetchingNextPage(true);
    try {
      const res = await fetch(
        `${
          process.env.NEXT_PUBLIC_API_URL
        }/api/products?q=${searchQuery}&sort=${sortOption}&page=${
          currentPage + 1
        }`
      );
      const data = await res.json();
      const { items, pages } = data;

      setProducts([...items]);
      setTotalPages(pages);
      setCurrentPage(currentPage + 1);
      window.scrollTo(0, 0);
    } catch (error) {
      console.error(error);
    } finally {
      setIsFetchingNextPage(false);
    }
  }, [currentPage, searchQuery, sortOption]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Product Listing</h1>

      {/* Search */}
      <Search
        loading={isSearching}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        clearSearch={clearSearch}
      />

      {/* Sorting  */}
      <div className="mb-6 flex items-center justify-between">
        <div>Total items: {totalProducts}</div>
        <Sort
          isSorting={isSorting}
          sortOption={sortOption}
          handleSort={handleSort}
        />
      </div>

      {/* Product List */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
              category={product.category}
            />
          ))}
        </div>
      ) : (
        <div className="container w-full flex justify-center bordered">
          <h1 className="text-xl font-semibold text-gray-500">
            No product found
          </h1>
        </div>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        isFetchingPrevPage={isFetchingPrevPage}
        isFetchingNextPage={isFetchingNextPage}
        getPrevPage={getPrevPage}
        getNextPage={getNextPage}
      />
    </div>
  );
}
