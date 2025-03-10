
import React, { useEffect, useState } from "react";
import ThemeGrid from "@/components/ThemeGrid";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { ThemeType } from "@/constants/themes";

const Projects = () => {
  const [userProjects, setUserProjects] = useState<ThemeType[]>([]);

  useEffect(() => {
    // Load user's selected projects from localStorage
    const savedProjects = localStorage.getItem("userProjects");
    if (savedProjects) {
      setUserProjects(JSON.parse(savedProjects));
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-5xl font-display font-medium mb-3">
                My Projects
              </h1>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Your saved templates and current projects
              </p>
            </div>
            
            {userProjects.length > 0 ? (
              <ThemeGrid themes={userProjects} />
            ) : (
              <div className="text-center py-20 bg-secondary/10 rounded-lg">
                <h3 className="text-xl font-medium mb-2">No projects yet</h3>
                <p className="text-muted-foreground mb-6">
                  Browse our templates and select ones you'd like to use
                </p>
                <a 
                  href="/templates"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium transition-all hover:bg-primary/90"
                >
                  Browse Templates
                </a>
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Projects;
