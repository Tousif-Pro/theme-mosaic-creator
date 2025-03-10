
import React, { useState } from "react";
import ThemeGrid from "@/components/ThemeGrid";
import CategoryTabs from "@/components/CategoryTabs";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getThemesByCategory } from "@/constants/themes";

const Templates = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [filteredThemes, setFilteredThemes] = useState(getThemesByCategory("all"));

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setFilteredThemes(getThemesByCategory(category));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32">
        <section id="themes" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-5xl font-display font-medium mb-3">
                Our Templates Collection
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Browse our comprehensive library of beautiful, responsive website templates
              </p>
            </div>
            
            <CategoryTabs 
              activeCategory={activeCategory} 
              onCategoryChange={handleCategoryChange} 
            />
            
            <div className="mt-12">
              <ThemeGrid themes={filteredThemes} />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Templates;
