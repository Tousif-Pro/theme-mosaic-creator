
import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Eye, ExternalLink, Github, Mail, Phone, MapPin } from "lucide-react";
import { getThemeById } from "@/constants/themes";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

const ThemeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(id ? getThemeById(id) : undefined);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const { toast } = useToast();
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
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
  const themeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (id) {
      const foundTheme = getThemeById(id);
      setTheme(foundTheme);
      
      if (!foundTheme) {
        navigate("/");
      } else {
        // Scroll to the top of the page when theme is loaded
        window.scrollTo({ top: 0, behavior: "smooth" });
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

  return (
    <div className="min-h-screen pt-16" ref={themeRef}>
      <div className="container mx-auto px-4 py-12">
        <Link 
          to="/templates" 
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
              <Button
                variant="link"
                onClick={() => setShowContactModal(true)}
                className="text-sm text-blue-600 hover:underline p-0 h-auto flex items-center"
              >
                Contact us
                <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* GitHub Access Request Form Dialog */}
      <Dialog open={showRequestForm} onOpenChange={setShowRequestForm}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogTitle className="flex justify-between items-center">
            <span>Request GitHub Access</span>
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

      {/* Contact Information Modal */}
      <Dialog open={showContactModal} onOpenChange={setShowContactModal}>
        <DialogContent className="sm:max-w-[450px]">
          <DialogTitle>Contact Us</DialogTitle>
          <DialogDescription>
            Reach out to our team for any questions or customization requests.
          </DialogDescription>
          
          <div className="space-y-4 mt-2">
            <div className="flex items-start">
              <Mail className="w-5 h-5 mr-3 text-blue-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium">Email</h4>
                <a href="mailto:info@themosaic.com" className="text-sm text-muted-foreground hover:underline">
                  info@themosaic.com
                </a>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex items-start">
              <Phone className="w-5 h-5 mr-3 text-blue-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium">Phone</h4>
                <a href="tel:+1234567890" className="text-sm text-muted-foreground hover:underline">
                  +1 (234) 567-890
                </a>
              </div>
            </div>
            
            <Separator />
            
            <div className="flex items-start">
              <MapPin className="w-5 h-5 mr-3 text-blue-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium">Office</h4>
                <p className="text-sm text-muted-foreground">
                  123 Template Street, Suite 456<br />
                  San Francisco, CA 94107
                </p>
              </div>
            </div>
            
            <div className="pt-4">
              <Button 
                className="w-full"
                variant="outline"
                onClick={() => setShowContactModal(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ThemeDetails;
