'use client';
import Link from 'next/link';
import Image from 'next/image';

type Category = { label: string; imageUrl: string; key: string };
const categories: Category[] = [
  { label: "Music", key: "music", imageUrl: "/badge/music-note.svg" },
  { label: "Sport", key: "sport", imageUrl: "/badge/sport.svg" },
  { label: "Food", key: "food", imageUrl: "/badge/restaurant.png" },
  { label: "Beauty", key: "beauty", imageUrl: "/badge/hair.png" }
];

export default function CategoriesBadge() {
  return (
    <div className="flex flex-wrap justify-center gap-20">
      {categories.map((category) => (
        <Link
          key={category.key}
          href={`/events`}
          className="flex flex-col items-center space-y-3"
        >
          <div className="flex items-center justify-center w-24 h-24 rounded-full border border-gray-200 hover:shadow-md transition duration-300">
            <div className="relative w-10 h-10">
              <Image src={category.imageUrl} alt={category.label} fill className="object-contain" />
            </div>
          </div>
          <span className="text-center text-gray-600 text-sm font-semibold w-24 truncate">
            {category.label}
          </span>
        </Link>
      ))}
    </div>
  );
}