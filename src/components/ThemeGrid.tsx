
import React from "react";
import ThemeCard from "./ThemeCard";
import { ThemeType } from "@/constants/themes";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleThemeClick = (themeId: string) => {
    navigate(`/theme/${themeId}`);
  };

  const handleExploreClick = () => {
    navigate("/templates");
  };

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
          
          {title === "Browse All Templates" && (
            <button 
              onClick={handleExploreClick}
              className="mt-6 inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium transition-all hover:bg-primary/90"
            >
              Explore Now
            </button>
          )}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {themes.map((theme, index) => (
          <div 
            key={theme.id} 
            className="flex flex-col gap-4 cursor-pointer"
            onClick={() => handleThemeClick(theme.id)}
          >
            <ThemeCard theme={theme} index={index} />
            <h3 className="text-xl font-medium px-1">{theme.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ThemeGrid;
