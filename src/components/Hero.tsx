
import React from "react";
import { ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative overflow-hidden pt-32 pb-24 md:pt-44 md:pb-32">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-blue-600/20 blur-[100px] opacity-50" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-blue-600/10 blur-[100px] opacity-30" />
      </div>
      
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 border border-border rounded-full bg-background/50 backdrop-blur-sm">
            <span className="text-sm font-medium text-muted-foreground">
              The ultimate theme collection
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-display font-semibold leading-tight mb-4">
            Beautiful website templates for your next project
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Discover premium, responsive website templates designed with attention to detail. From landing pages to dashboards, find the perfect starting point.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href="#themes" 
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium transition-all hover:bg-primary/90 w-full sm:w-auto"
            >
              Explore Themes
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
            
            <a 
              href="#featured" 
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-secondary text-secondary-foreground font-medium transition-all hover:bg-secondary/80 w-full sm:w-auto"
            >
              View Featured
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
