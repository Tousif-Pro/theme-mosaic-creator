
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { ThemeType } from "@/constants/themes";
import { cn } from "@/lib/utils";

interface FeaturedThemeProps {
  theme: ThemeType;
}

const FeaturedTheme: React.FC<FeaturedThemeProps> = ({ theme }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 via-blue-50/50 to-white dark:from-blue-900/10 dark:via-blue-900/5 dark:to-background border border-border">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl md:text-3xl font-display font-medium mb-4">
            {theme.title}
          </h2>
          
          <p className="text-muted-foreground mb-6">
            {theme.description}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {theme.tags.map((tag, idx) => (
              <span 
                key={idx} 
                className="px-3 py-1 bg-white dark:bg-white/10 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <Link
            to={`/theme/${theme.id}`}
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline font-medium"
          >
            View Theme
            <ArrowRight className="ml-1 w-4 h-4" />
          </Link>
        </div>
        
        <div className="relative overflow-hidden rounded-xl shadow-lg">
          {/* Loading skeleton */}
          <div className={cn(
            "absolute inset-0 bg-secondary/20", 
            isImageLoaded ? "opacity-0" : "opacity-100",
            "transition-opacity duration-300"
          )}>
            {!isImageLoaded && (
              <div className="absolute inset-0 bg-secondary animate-pulse" />
            )}
          </div>

          <div className="aspect-[16/10] relative">
            <img
              src={theme.image}
              alt={theme.title}
              className={cn(
                "absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-300",
                isImageLoaded ? "opacity-100" : "opacity-0"
              )}
              onLoad={() => setIsImageLoaded(true)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedTheme;
