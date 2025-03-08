
import React from "react";
import { cn } from "@/lib/utils";
import { categories } from "@/constants/themes";

interface CategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({ 
  activeCategory, 
  onCategoryChange 
}) => {
  return (
    <div className="w-full overflow-x-auto scrollbar-none py-6 mb-8">
      <div className="flex space-x-3 min-w-max">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              "px-6 py-3 rounded-full text-sm font-medium transition-all",
              activeCategory === category.id
                ? "bg-black text-white shadow-sm" 
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            )}
          >
            {category.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;
