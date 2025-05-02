import React from "react";
import Image from "next/image";

type Category = {
  label: string;
  imageUrl: string;
};

const categories: Category[] = [
  { label: "Music", imageUrl: "/badge/music-note.svg" },
  { label: "Sport", imageUrl: "/badge/sport.svg" },
  { label: "Food", imageUrl: "/badge/theater-masks.svg" },
  { label: "Beauty", imageUrl: "/badge/heart-partner-handshake.svg" }
];

const CategoriesBadge: React.FC = () => {
  return (
    <div className="flex flex-wrap justify-center gap-20">
      {categories.map((category) => (
        <div key={category.label} className="flex flex-col items-center space-y-3">
          {/* Lingkaran Badge */}
          <div className="flex items-center justify-center w-24 h-24 rounded-full border border-grey-200 hover:shadow-md transition duration-300">
            <div className="relative w-10 h-10">
              <Image
                src={category.imageUrl}
                alt={category.label}
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Text Label */}
          <div className="text-center text-gray-600 text-sm font-semibold w-24">
            {category.label}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoriesBadge;
