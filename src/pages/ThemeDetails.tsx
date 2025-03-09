
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Eye, ExternalLink, Github } from "lucide-react";
import { getThemeById, getThemesByCategory } from "@/constants/themes";
import ThemeGrid from "@/components/ThemeGrid";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const ThemeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(id ? getThemeById(id) : undefined);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      const foundTheme = getThemeById(id);
      setTheme(foundTheme);
      
      if (!foundTheme) {
        navigate("/");
      }
    }
  }, [id, navigate]);

  const handleGitHubRequest = () => {
    toast({
      title: "Access Request Sent",
      description: "We've received your request for repository access. Our team will contact you shortly.",
      duration: 4000,
    });
  };

  if (!theme) {
    return (
      <div className="container mx-auto px-4 py-20 md:py-32 text-center">
        <h1 className="text-2xl font-medium mb-4">Theme not found</h1>
        <Link 
          to="/" 
          className="inline-flex items-center text-blue-600 hover:underline"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to all themes
        </Link>
      </div>
    );
  }

  const relatedThemes = getThemesByCategory(theme.category)
    .filter(t => t.id !== theme.id)
    .slice(0, 3);

  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-12">
        <Link 
          to="/" 
          className="inline-flex items-center mb-8 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to all themes
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-10">
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-medium mb-3">
                {theme.title}
              </h1>
              <p className="text-lg text-muted-foreground">{theme.description}</p>
            </div>
            
            <div className="rounded-xl overflow-hidden border border-border">
              <div className="relative overflow-hidden">
                <div className="aspect-[16/9] relative">
                  <div className={cn("relative h-full transition-all duration-700", 
                    isImageLoaded ? "opacity-100" : "opacity-0")}>
                    <img
                      src={theme.image}
                      alt={theme.title}
                      className="w-full h-full object-cover object-top"
                      onLoad={() => setIsImageLoaded(true)}
                    />
                  </div>
                  {!isImageLoaded && (
                    <div className="absolute inset-0 bg-secondary animate-pulse" />
                  )}
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="rounded-xl border border-border p-6 space-y-4">
              <Button
                onClick={handleGitHubRequest}
                className="w-full bg-black text-white font-medium hover:bg-black/90"
              >
                <Github className="w-4 h-4 mr-2" />
                Request GitHub Access
              </Button>
              
              <a
                href="#"
                className="w-full py-3 px-4 rounded-lg bg-secondary text-secondary-foreground font-medium flex items-center justify-center hover:bg-secondary/80 transition-colors"
              >
                <Eye className="w-4 h-4 mr-2" />
                Live Preview
              </a>
            </div>
            
            <div className="rounded-xl border border-border p-6">
              <h3 className="text-lg font-medium mb-3">Theme Features</h3>
              <ul className="space-y-2">
                {[
                  "Responsive Design",
                  "Modern Layout",
                  "Performance Optimized",
                  "Customizable Components",
                  "SEO Best Practices",
                  "Cross-Browser Compatible"
                ].map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5">✓</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="rounded-xl border border-border p-6">
              <h3 className="text-lg font-medium mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {theme.tags.map((tag, idx) => (
                  <span 
                    key={idx} 
                    className="px-3 py-1 bg-secondary rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="rounded-xl border border-border p-6">
              <h3 className="text-lg font-medium mb-3">Need help or customization?</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Get this theme customized to your brand and specific requirements by contacting our team.
              </p>
              <a
                href="mailto:contact@example.com"
                className="text-sm text-blue-600 hover:underline flex items-center"
              >
                Contact us
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
          </div>
        </div>
        
        {relatedThemes.length > 0 && (
          <div className="mt-20">
            <ThemeGrid 
              themes={relatedThemes} 
              title="Related Templates" 
              description="You might also be interested in these similar templates"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ThemeDetails;
