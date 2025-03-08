
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ThemeType } from "@/constants/themes";

interface ThemeCardProps {
  theme: ThemeType;
  index: number;
}

const ThemeCard: React.FC<ThemeCardProps> = ({ theme, index }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, index * 100); // Stagger the animation

    return () => clearTimeout(timeout);
  }, [index]);

  const handleImageLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div 
      className={cn(
        "theme-card overflow-hidden rounded-xl bg-card border border-border",
        "opacity-0 translate-y-4",
        isVisible && "opacity-100 translate-y-0 transition-all duration-500 ease-out"
      )}
      style={{ transitionDelay: `${index * 50}ms` }}
    >
      <Link to={`/theme/${theme.id}`} className="block">
        <div className="relative overflow-hidden aspect-[16/9]">
          <div className={cn("image-reveal", isLoaded && "loaded")}>
            <img
              src={theme.image}
              alt={theme.title}
              className="w-full h-full object-cover object-top"
              onLoad={handleImageLoad}
            />
          </div>
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {theme.isFeatured && (
              <span className="px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-full">
                Featured
              </span>
            )}
            {theme.isNew && (
              <span className="px-2 py-1 bg-green-600 text-white text-xs font-medium rounded-full">
                New
              </span>
            )}
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-display text-lg font-medium truncate">{theme.title}</h3>
          <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{theme.description}</p>
          
          <div className="flex flex-wrap gap-2 mt-3">
            {theme.tags.slice(0, 3).map((tag, idx) => (
              <span 
                key={idx} 
                className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-md"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ThemeCard;
