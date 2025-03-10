
import React from "react";
import ThemeGrid from "@/components/ThemeGrid";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getFeaturedThemes } from "@/constants/themes";

const Featured = () => {
  const featuredThemes = getFeaturedThemes();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-5xl font-display font-medium mb-3">
                Featured Templates
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our most popular and highly-rated website templates
              </p>
            </div>
            
            <ThemeGrid themes={featuredThemes} />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Featured;
