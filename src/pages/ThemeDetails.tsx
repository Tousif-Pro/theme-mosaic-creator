
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Eye, ExternalLink, Github, X } from "lucide-react";
import { getThemeById, getThemesByCategory } from "@/constants/themes";
import ThemeGrid from "@/components/ThemeGrid";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogClose, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ThemeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(id ? getThemeById(id) : undefined);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { toast } = useToast();
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
  });

  useEffect(() => {
    if (id) {
      const foundTheme = getThemeById(id);
      setTheme(foundTheme);
      
      if (!foundTheme) {
        navigate("/");
      }
    }
  }, [id, navigate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error if user types in a required field
    if (name === 'name' || name === 'email') {
      setFormErrors(prev => ({
        ...prev,
        [name]: false
      }));
    }
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const errors = {
      name: !formData.name.trim(),
      email: !formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    };
    
    if (errors.name || errors.email) {
      setFormErrors(errors);
      return;
    }
    
    // Submit the form data (in a real app, this would send data to a server)
    toast({
      title: "Request Submitted Successfully",
      description: "We've received your GitHub access request. Our team will contact you shortly.",
      duration: 5000,
    });
    
    // Close the dialog and reset form
    setShowRequestForm(false);
    setFormData({
      name: "",
      email: "",
      company: "",
      message: ""
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
                onClick={() => setShowRequestForm(true)}
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

      {/* GitHub Access Request Form Dialog */}
      <Dialog open={showRequestForm} onOpenChange={setShowRequestForm}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogTitle className="flex justify-between items-center">
            <span>Request GitHub Access</span>
            <DialogClose className="h-4 w-4 opacity-70 ring-offset-background transition-opacity hover:opacity-100">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </DialogTitle>
          <DialogDescription>
            Fill out this form to request access to the GitHub repository for {theme.title}.
          </DialogDescription>
          
          <form onSubmit={handleSubmitRequest} className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="required">
                Name <span className="text-destructive">*</span>
              </Label>
              <Input 
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={formErrors.name ? "border-destructive" : ""}
                placeholder="Your full name"
              />
              {formErrors.name && (
                <p className="text-sm text-destructive">Please enter your name</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email" className="required">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input 
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className={formErrors.email ? "border-destructive" : ""}
                placeholder="your.email@example.com"
              />
              {formErrors.email && (
                <p className="text-sm text-destructive">Please enter a valid email address</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company">Company/Organization</Label>
              <Input 
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                placeholder="Your company or organization (optional)"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Additional Information</Label>
              <Textarea 
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Tell us more about your project and how you plan to use this template"
                rows={4}
              />
            </div>
            
            <div className="flex justify-end gap-2 pt-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowRequestForm(false)}
              >
                Cancel
              </Button>
              <Button type="submit">Submit Request</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ThemeDetails;
