import type { NextApiRequest, NextApiResponse } from "next";

import { IProduct } from "@/models";

interface IApiResponse {
  items: IProduct[];
  pages: number;
}

interface IApiError {
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IApiResponse | IApiError>
) {
  const PRODUCTS_PER_PAGE = 20;

  try {
    const { q = "", page = "1" } = req.query;

    const searchQuery = (q as string).toLowerCase();

    // Fetch data from the external API
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_FAKE_STORE_URL}/products?limit=150`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch products from external API");
    }
    const data = await response.json();
    const { products }: { products: IProduct[] } = data;

    // filtering
    let filteredProducts;
    filteredProducts = products.filter(
      (p) =>
        p.title.toLowerCase().includes(searchQuery) ||
        p.category.toLowerCase().includes(searchQuery)
    );

    // pagination
    const paginate = (array: IProduct[], page: number, pageSize: number) => {
      const totalItems = array.length;
      const totalPages = Math.ceil(totalItems / pageSize);

      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const items = array.slice(startIndex, endIndex);

      return {
        items,
        totalPages,
      };
    };
    const { items, totalPages } = paginate(
      filteredProducts,
      parseInt(page as string, 10),
      PRODUCTS_PER_PAGE
    );

    // response
    res.status(200).json({
      items,
      pages: totalPages,
    });
  } catch (error) {
    console.error("API Fetch Error:", error);
    res.status(500).json({ error: "Failed to fetch products." });
  }
}
