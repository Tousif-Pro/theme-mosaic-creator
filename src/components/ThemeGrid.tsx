
import React from "react";
import ThemeCard from "./ThemeCard";
import { ThemeType } from "@/constants/themes";

interface ThemeGridProps {
  themes: ThemeType[];
  title?: string;
  description?: string;
}

const ThemeGrid: React.FC<ThemeGridProps> = ({ 
  themes, 
  title, 
  description 
}) => {
  return (
    <div className="w-full">
      {(title || description) && (
        <div className="mb-10 text-center max-w-2xl mx-auto">
          {title && (
            <h2 className="text-3xl md:text-4xl font-display font-medium mb-3">{title}</h2>
          )}
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {themes.map((theme, index) => (
          <ThemeCard key={theme.id} theme={theme} index={index} />
        ))}
      </div>
    </div>
  );
};

export default ThemeGrid;
