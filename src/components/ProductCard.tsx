import Link from "next/link";
import Image from "next/image";

interface IProps {
  id: number;
  image: string;
  title: string;
  price: number;
  category: string;
}

export const ProductCard = ({ id, image, title, price, category }: IProps) => {
  return (
    <Link key={id} href={`../product/${id}`}>
      <div className="border p-4 rounded-lg cursor-pointer hover:shadow-lg transition-shadow bg-white">
        <Image
          width={300}
          height={300}
          src={image}
          alt={title}
          className="w-full h-48 object-contain "
        />
        <div className="mt-2 overflow-hidden">
          <h2 className="text-lg font-medium truncate text-gray-700">
            {title}
          </h2>
          <p className="text-sm text-gray-400 text-nowrap text-clip capitalize">
            {category}
          </p>
          <p className="text-xl font-bold mt-1">${price}</p>
        </div>
      </div>
    </Link>
  );
};
