
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
    <div className="w-full overflow-x-auto scrollbar-none py-4 mb-8">
      <div className="flex space-x-2 min-w-max">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all",
              activeCategory === category.id
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
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
