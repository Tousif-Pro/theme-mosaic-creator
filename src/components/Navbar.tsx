
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: "My Projects", href: "/projects" },
    { label: "Latest", href: "/latest" },
    { label: "Featured", href: "/featured" },
    { label: "Templates", href: "/templates" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4",
        isScrolled ? "bg-white/80 dark:bg-black/80 backdrop-blur-xl shadow-sm" : "bg-transparent"
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link 
          to="/" 
          className="font-display text-xl font-semibold tracking-tight"
        >
          Theme<span className="text-blue-600">Mosaic</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "text-sm font-medium text-muted-foreground hover:text-foreground transition-colors",
                location.pathname === item.href && "text-foreground font-semibold"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        
        <div className="hidden md:flex items-center space-x-2">
          <button
            className="p-2 rounded-full hover:bg-secondary transition-colors duration-200"
            aria-label="Search"
          >
            <Search className="w-5 h-5" />
          </button>
        </div>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-background border-b border-border animate-slide-down">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "text-base py-2 font-medium text-muted-foreground hover:text-foreground transition-colors",
                  location.pathname === item.href && "text-foreground font-semibold"
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="flex items-center py-2">
              <Search className="w-5 h-5 mr-2" />
              <span className="text-base font-medium">Search</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
