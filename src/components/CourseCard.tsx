import Image from "next/image";

interface CourseCardProps {
  title: string;
  description: string;
  author: string;
  price: number;
  imageUrl: string;
}

export function CourseCardSkeleton() {
  return (
    <div className="border-4 rounded-2xl py-4 px-4  flex flex-col gap-2  bg-[#FFFFFE] w-75 h-80 hover:bg-[#F4F4F8] hover:cursor-pointer border-[#F4F4F9]">
      <div className="skeleton h-40 w-67.5"></div>
      <div className="skeleton w-50 h-5"></div>
      <div className="skeleton w-30 h-3"></div>
      <div className="skeleton w-20 h-5"></div>
    </div>
  );
}

export function CourseCard({
  title,
  author,
  price,
  imageUrl,
}: CourseCardProps) {
  return (
    <div className="border-4 rounded-2xl py-4 px-4  flex flex-col gap-2  bg-[#FFFFFE] w-75 h-80 hover:bg-[#F4F4F8] hover:cursor-pointer border-[#F4F4F9]">
      <Image
        width={270}
        height={205}
        className="rounded-2xl"
        src={imageUrl}
        alt={title}
      />
      <h1 className="text-xl text-wrap">{title}</h1>
      <span className="text-gray-700 text-xs">{author}</span>
      <p>$ {price}</p>
    </div>
  );
}
