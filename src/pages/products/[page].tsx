import { GetStaticProps, GetStaticPaths } from "next";
import { useEffect, useState } from "react";

import { Search, ProductCard, Pagination } from "@/components";
import { IProduct } from "@/models";

interface IProductsProps {
  items: IProduct[];
  currentPage: number;
  pages: number;
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const currentPage = parseInt(params?.page as string, 10);

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?page=${currentPage}`
  );
  const { items, pages } = await res.json();

  return {
    props: {
      items,
      currentPage,
      pages,
    },
    revalidate: 10,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/products?page=1`
  );
  const { pages: totalPages } = await res.json();

  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default function ProductsPage({
  items,
  currentPage,
  pages,
}: IProductsProps) {
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([...items]);
  const [totalPages, setTotalPages] = useState(pages);

  useEffect(() => {
    setProducts(items);
  }, [items]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;

    setLoading(true);
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products?q=${searchQuery}&page=${currentPage}`
      );
      const data = await res.json();
      const { items, pages } = data;

      setProducts(items);
      setTotalPages(pages);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products?page=${currentPage}`
      );
      const data = await res.json();
      const { items, pages } = data;

      setProducts(items);
      setTotalPages(pages);
      setSearchQuery("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Product Listing</h1>

      {/* Search */}
      <Search
        loading={loading}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handleSearch={handleSearch}
        clearSearch={clearSearch}
      />

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
      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  );
}
