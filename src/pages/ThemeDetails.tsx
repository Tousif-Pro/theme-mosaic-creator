
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getThemeById, ThemeType } from "@/constants/themes";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

const ThemeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [theme, setTheme] = useState<ThemeType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (id) {
      const themeData = getThemeById(id);
      setTheme(themeData || null);
      setIsLoading(false);

      // Check if theme is already in user's projects
      const savedProjects = localStorage.getItem("userProjects");
      if (savedProjects && themeData) {
        const projects = JSON.parse(savedProjects);
        setIsSaved(projects.some((project: ThemeType) => project.id === themeData.id));
      }
    }
  }, [id]);

  const handleSaveProject = () => {
    if (!theme) return;

    const savedProjects = localStorage.getItem("userProjects");
    let projects: ThemeType[] = savedProjects ? JSON.parse(savedProjects) : [];

    if (isSaved) {
      // Remove from projects
      projects = projects.filter(project => project.id !== theme.id);
      toast({
        title: "Project removed",
        description: `${theme.title} has been removed from your projects.`
      });
      setIsSaved(false);
    } else {
      // Add to projects
      projects.push(theme);
      toast({
        title: "Project saved",
        description: `${theme.title} has been added to your projects.`
      });
      setIsSaved(true);
    }

    localStorage.setItem("userProjects", JSON.stringify(projects));
  };

  const handleViewCode = () => {
    if (id) {
      navigate(`/theme/${id}/code`);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-32">
          <div className="container mx-auto px-4">
            <div className="animate-pulse">
              <div className="h-8 w-64 bg-secondary rounded mb-4 mx-auto"></div>
              <div className="h-4 w-96 bg-secondary/60 rounded mb-12 mx-auto"></div>
              <div className="aspect-video w-full bg-secondary/40 rounded-lg"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!theme) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-32 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl font-display font-medium mb-4">Template Not Found</h1>
            <p className="text-muted-foreground mb-6">The template you're looking for doesn't exist.</p>
            <Button onClick={() => navigate("/templates")}>
              Browse Templates
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-display font-medium mb-3">
                {theme.title}
              </h1>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                {theme.description}
              </p>
              
              <div className="flex flex-wrap gap-2 justify-center mb-6">
                {theme.tags.map((tag, idx) => (
                  <span 
                    key={idx} 
                    className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-4 justify-center">
                <Button 
                  onClick={handleSaveProject}
                  variant={isSaved ? "outline" : "default"}
                >
                  {isSaved ? "Remove from Projects" : "Save to My Projects"}
                </Button>
                <Button onClick={handleViewCode} variant="secondary">
                  View Code
                </Button>
              </div>
            </div>
            
            <div className="rounded-lg overflow-hidden border border-border shadow-lg">
              <img 
                src={theme.image} 
                alt={theme.title}
                className="w-full h-auto"
              />
            </div>
            
            <div className="mt-12 grid gap-8">
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-display font-medium mb-4">About this template</h2>
                <p className="text-muted-foreground">
                  This {theme.category} template is perfect for creating professional websites quickly.
                  It comes with a responsive design that works on all devices and is easy to customize.
                </p>
              </div>
              
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="text-xl font-display font-medium mb-4">Features</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Fully responsive design</li>
                  <li>• Modern UI components</li>
                  <li>• Easy customization</li>
                  <li>• Optimized for performance</li>
                  <li>• Cross-browser compatibility</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ThemeDetails;
