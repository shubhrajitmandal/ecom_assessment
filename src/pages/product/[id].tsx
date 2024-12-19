import { GetServerSideProps } from "next";
import Image from "next/image";

import { RelatedProducts } from "@/components";
import { IProduct } from "@/models";

interface IProductDetailProps {
  product: IProduct | null;
}

export default function ProductDetail({ product }: IProductDetailProps) {
  if (!product) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold">Product not found</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-6">
      <div className="grid grid-cols-1 gap-8 overflow-hidden bg-white md:grid-cols-2 ">
        <div className="flex items-center justify-center">
          <Image
            width={500}
            height={500}
            src={product.image}
            alt={product.title}
          />
        </div>

        <div className="flex flex-col justify-center p-6">
          <h1 className="mb-3 text-2xl font-bold text-gray-800">
            {product.title}
          </h1>
          <p className="mb-3 badge badge-outline !text-gray-400 font-bold capitalize">
            {product.category}
          </p>
          <p className="mb-6 text-gray-600">{product.description}</p>
          <div className="mb-6 text-4xl font-semibold text-gray-900">
            ${product.price}
          </div>
          <button className="rounded-md bg-blue-600 px-6 py-3 text-lg text-white transition hover:bg-blue-700">
            Add to Cart
          </button>
        </div>
      </div>

      <RelatedProducts category={product.category} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_FAKE_STORE_URL}/products/${id}`
    );

    if (!res.ok) {
      return { props: { product: null } };
    }

    const data = await res.json();
    const product: IProduct = data.product;

    return {
      props: { product },
    };
  } catch (error) {
    console.error("Failed to fetch product details:", error);

    return {
      props: { product: null },
    };
  }
};
