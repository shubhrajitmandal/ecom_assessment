import Link from "next/link";
import Image from "next/image";

interface IProps {
  id: number;
  image: string;
  title: string;
  price: number;
}

export const ProductCard = ({ id, image, title, price }: IProps) => {
  return (
    <Link key={id} href={`../product/${id}`}>
      <div className="border p-4 rounded cursor-pointer hover:shadow-lg transition-shadow">
        <Image
          width={300}
          height={300}
          src={image}
          alt={title}
          className="w-full h-48 object-contain mb-2"
        />
        <h2 className="text-lg font-bold truncate">{title}</h2>
        <p className="text-gray-500">${price}</p>
      </div>
    </Link>
  );
};
