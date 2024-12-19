import { useEffect, useState } from "react";

import { IProduct } from "@/models";
import { ProductCard } from "./ProductCard";

interface IProps {
  category: string;
}

export const RelatedProducts = ({ category }: IProps) => {
  const [relatedProducts, setRelatedProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    async function fetchRelatedProducts() {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_FAKE_STORE_URL}/products/category?type=${category}&limit=8`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setRelatedProducts(result.products);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchRelatedProducts();
  }, []);

  if (error)
    return (
      <div className="container mx-auto p-4 flex justify-center ">
        <h4 className="text-xl font-medium">Products not found</h4>
      </div>
    );

  return (
    <div className="mt-12">
      <h2 className="mb-6 text-lg font-semibold text-gray-800">
        Related Products
      </h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {loading
          ? [...Array(8)].map((_, index) => (
              <div
                key={index}
                className="h-56 bg-gray-300 rounded w-full max-w-sm animate-pulse"
              />
            ))
          : relatedProducts.map((product) => (
              <ProductCard
                id={product.id}
                image={product.image}
                title={product.title}
                price={product.price}
                category={product.category}
              />
            ))}
      </div>
    </div>
  );
};
