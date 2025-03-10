
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Hero from "@/components/Hero";
import ThemeGrid from "@/components/ThemeGrid";
import FeaturedTheme from "@/components/FeaturedTheme";
import CategoryTabs from "@/components/CategoryTabs";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import {
  getFeaturedThemes,
  getThemesByCategory,
} from "@/constants/themes";

interface IndexProps {
  initialCategory?: string;
}

const Index: React.FC<IndexProps> = ({ initialCategory = "all" }) => {
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [filteredThemes, setFilteredThemes] = useState(getThemesByCategory(initialCategory));
  const featuredThemes = getFeaturedThemes();
  const navigate = useNavigate();

  useEffect(() => {
    setFilteredThemes(getThemesByCategory(activeCategory));
  }, [activeCategory]);

  // Update active category when initialCategory prop changes
  useEffect(() => {
    if (initialCategory) {
      setActiveCategory(initialCategory);
    }
  }, [initialCategory]);

  const handleExploreAll = () => {
    navigate('/templates');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <Hero />
        
        {featuredThemes.length > 0 && (
          <section id="featured" className="py-16 md:py-24">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-display font-medium mb-3">
                  Featured Templates
                </h2>
                <p className="text-muted-foreground max-w-xl mx-auto">
                  Our most popular and highly-rated website templates for your next project
                </p>
              </div>
              
              <div className="grid gap-8">
                {featuredThemes.map((theme) => (
                  <FeaturedTheme key={theme.id} theme={theme} />
                ))}
              </div>
            </div>
          </section>
        )}
        
        <section id="themes" className="py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-medium mb-3">
                Browse All Templates
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Find the perfect template for your project from our collection
              </p>
            </div>
            
            <CategoryTabs 
              activeCategory={activeCategory} 
              onCategoryChange={setActiveCategory} 
            />
            
            <ThemeGrid themes={filteredThemes} />
          </div>
        </section>
        
        <section className="py-20 md:py-32 bg-gradient-to-b from-background to-secondary/30">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-display font-medium mb-4">
                Ready to build your next website?
              </h2>
              <p className="text-muted-foreground mb-8">
                Get started with our premium templates and create a stunning website in minutes.
              </p>
              <button 
                onClick={handleExploreAll}
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium transition-all hover:bg-primary/90"
              >
                Explore All Templates
              </button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
