
import React from "react";
import ThemeGrid from "@/components/ThemeGrid";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getNewThemes } from "@/constants/themes";

const Latest = () => {
  const latestThemes = getNewThemes();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-5xl font-display font-medium mb-3">
                Latest Templates
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Our newest additions to the template collection
              </p>
            </div>
            
            {latestThemes.length > 0 ? (
              <ThemeGrid themes={latestThemes} />
            ) : (
              <div className="text-center py-20 bg-secondary/10 rounded-lg">
                <h3 className="text-xl font-medium">No new templates yet</h3>
                <p className="text-muted-foreground">
                  Check back soon for our newest designs
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Latest;
