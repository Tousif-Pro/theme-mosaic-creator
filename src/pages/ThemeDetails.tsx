
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Eye, Code, Download, CheckCircle, ExternalLink } from "lucide-react";
import { getThemeById, getThemesByCategory } from "@/constants/themes";
import ThemeGrid from "@/components/ThemeGrid";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const ThemeDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [theme, setTheme] = useState(id ? getThemeById(id) : undefined);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [selectedTab, setSelectedTab] = useState<"preview" | "code">("preview");
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

  const handleDownload = () => {
    toast({
      title: "Download started",
      description: "Your theme is being prepared for download.",
      duration: 3000,
    });
  };

  // Get theme-specific code based on the theme category
  const getThemeCode = () => {
    if (!theme) return '';

    switch (theme.category) {
      case 'landing':
        return `// Landing Page Theme: ${theme.title}
import React from "react";
import { Button } from "./components/ui/button";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="text-xl font-bold text-blue-600">Your Brand</div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-blue-600">Features</a>
            <a href="#pricing" className="text-gray-700 hover:text-blue-600">Pricing</a>
            <a href="#testimonials" className="text-gray-700 hover:text-blue-600">Testimonials</a>
            <Button variant="outline">Log in</Button>
            <Button>Get Started</Button>
          </div>
        </nav>
      </header>
      
      <main>
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            ${theme.title}
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            ${theme.description}
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Button size="lg">Get Started Free</Button>
            <Button size="lg" variant="outline">Watch Demo</Button>
          </div>
        </section>
      </main>
    </div>
  );
}`;

      case 'dashboard':
        return `// Dashboard Theme: ${theme.title}
import React from "react";
import { Card } from "./components/ui/card";
import { 
  BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, Legend, ResponsiveContainer 
} from "recharts";

// Sample data for charts
const data = [
  { name: 'Jan', value: 400 },
  { name: 'Feb', value: 300 },
  { name: 'Mar', value: 600 },
  { name: 'Apr', value: 800 },
  { name: 'May', value: 500 },
  { name: 'Jun', value: 900 },
];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <aside className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 hidden md:block">
          <div className="p-6">
            <h2 className="text-xl font-bold">Your Dashboard</h2>
          </div>
          <nav className="mt-6">
            <a href="#" className="flex items-center px-6 py-3 bg-blue-50 text-blue-600">
              <span>Dashboard</span>
            </a>
            <a href="#" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50">
              <span>Analytics</span>
            </a>
            <a href="#" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50">
              <span>Reports</span>
            </a>
            <a href="#" className="flex items-center px-6 py-3 text-gray-700 hover:bg-gray-50">
              <span>Settings</span>
            </a>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 ml-0 md:ml-64 p-6">
          <h1 className="text-2xl font-bold mb-6">${theme.title}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-2">Total Users</h3>
              <p className="text-3xl font-bold">12,345</p>
              <p className="text-sm text-green-600 mt-2">+12% from last month</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-2">Revenue</h3>
              <p className="text-3xl font-bold">$34,567</p>
              <p className="text-sm text-green-600 mt-2">+8% from last month</p>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-2">Active Projects</h3>
              <p className="text-3xl font-bold">24</p>
              <p className="text-sm text-red-600 mt-2">-2 from last month</p>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">Monthly Revenue</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="value" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
            <Card className="p-6">
              <h3 className="text-lg font-medium mb-4">User Growth</h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#3b82f6" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}`;

      case 'portfolio':
        return `// Portfolio Theme: ${theme.title}
import React from "react";
import { Card, CardContent } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";

// Sample projects data
const projects = [
  {
    id: 1,
    title: "E-commerce Website",
    description: "A full-featured online store with product catalog, cart, and checkout.",
    image: "/path/to/project-image.jpg",
    tags: ["React", "Next.js", "Tailwind CSS", "Stripe"],
    link: "#"
  },
  {
    id: 2,
    title: "Design System",
    description: "A comprehensive design system with reusable components and guidelines.",
    image: "/path/to/project-image.jpg",
    tags: ["Figma", "React", "Storybook"],
    link: "#"
  },
  {
    id: 3,
    title: "Mobile App",
    description: "A cross-platform mobile app for productivity and task management.",
    image: "/path/to/project-image.jpg",
    tags: ["React Native", "Firebase", "Redux"],
    link: "#"
  }
];

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-white">
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="text-xl font-bold">Your Name</div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#about" className="text-gray-700 hover:text-blue-600">About</a>
            <a href="#projects" className="text-gray-700 hover:text-blue-600">Projects</a>
            <a href="#skills" className="text-gray-700 hover:text-blue-600">Skills</a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600">Contact</a>
          </div>
        </nav>
      </header>
      
      <main>
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Hello, I'm a Creative Developer
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            I create beautiful and functional websites and applications that help businesses grow.
          </p>
          <div className="flex justify-center space-x-4">
            <Button size="lg">View My Work</Button>
            <Button size="lg" variant="outline">Contact Me</Button>
          </div>
        </section>
        
        <section id="projects" className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold mb-12 text-center">My Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map(project => (
              <Card key={project.id} className="overflow-hidden">
                <div className="aspect-video bg-gray-100"></div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full">View Project</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}`;

      case 'ecommerce':
        return `// E-commerce Theme: ${theme.title}
import React from "react";
import { 
  Card, 
  CardContent,
  CardFooter
} from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";

// Sample products data
const products = [
  {
    id: 1,
    name: "Premium Headphones",
    description: "Wireless noise-cancelling headphones with premium sound quality.",
    price: 199.99,
    image: "/path/to/product-image.jpg",
    category: "Audio",
    rating: 4.7,
    isNew: true,
    isSale: false
  },
  {
    id: 2,
    name: "Smart Watch",
    description: "Track your fitness, heart rate, and receive notifications on your wrist.",
    price: 149.99,
    originalPrice: 199.99,
    image: "/path/to/product-image.jpg",
    category: "Wearables",
    rating: 4.5,
    isNew: false,
    isSale: true
  },
  {
    id: 3,
    name: "Laptop Backpack",
    description: "Water-resistant backpack with multiple compartments for your devices.",
    price: 59.99,
    image: "/path/to/product-image.jpg",
    category: "Accessories",
    rating: 4.8,
    isNew: false,
    isSale: false
  }
];

export default function EcommerceStore() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold">Your Store</div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
              <a href="#" className="text-gray-700 hover:text-blue-600">Shop</a>
              <a href="#" className="text-gray-700 hover:text-blue-600">Categories</a>
              <a href="#" className="text-gray-700 hover:text-blue-600">Sale</a>
              <a href="#" className="text-gray-700 hover:text-blue-600">Contact</a>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-700 hover:text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              <button className="text-gray-700 hover:text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">${theme.title}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <Card key={product.id} className="overflow-hidden">
              <div className="relative">
                <div className="aspect-square bg-gray-100"></div>
                {product.isNew && (
                  <Badge className="absolute top-2 left-2 bg-blue-600">New</Badge>
                )}
                {product.isSale && (
                  <Badge className="absolute top-2 left-2 bg-red-600">Sale</Badge>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-2">{product.description}</p>
                <div className="flex items-center justify-between">
                  {product.originalPrice ? (
                    <div>
                      <span className="font-bold">${product.price}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">${product.originalPrice}</span>
                    </div>
                  ) : (
                    <span className="font-bold">${product.price}</span>
                  )}
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button className="w-full">Add to Cart</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}`;

      case 'blog':
        return `// Blog Theme: ${theme.title}
import React from "react";
import { Card, CardContent } from "./components/ui/card";
import { Badge } from "./components/ui/badge";

// Sample blog posts data
const blogPosts = [
  {
    id: 1,
    title: "Getting Started with React Hooks",
    excerpt: "Learn how to use React Hooks to simplify your functional components.",
    image: "/path/to/blog-image.jpg",
    date: "May 15, 2023",
    author: {
      name: "Jane Smith",
      avatar: "/path/to/avatar.jpg"
    },
    category: "Development",
    readTime: "5 min read"
  },
  {
    id: 2,
    title: "Mastering CSS Grid Layout",
    excerpt: "A comprehensive guide to using CSS Grid for modern web layouts.",
    image: "/path/to/blog-image.jpg",
    date: "April 28, 2023",
    author: {
      name: "John Doe",
      avatar: "/path/to/avatar.jpg"
    },
    category: "Design",
    readTime: "8 min read"
  },
  {
    id: 3,
    title: "The Future of JavaScript",
    excerpt: "Exploring upcoming features and trends in JavaScript development.",
    image: "/path/to/blog-image.jpg",
    date: "April 10, 2023",
    author: {
      name: "Alex Johnson",
      avatar: "/path/to/avatar.jpg"
    },
    category: "Development",
    readTime: "6 min read"
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold">Your Blog</div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
              <a href="#" className="text-gray-700 hover:text-blue-600">Articles</a>
              <a href="#" className="text-gray-700 hover:text-blue-600">Categories</a>
              <a href="#" className="text-gray-700 hover:text-blue-600">About</a>
              <a href="#" className="text-gray-700 hover:text-blue-600">Contact</a>
            </div>
            <button className="text-gray-700 hover:text-blue-600">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <section className="py-12 text-center">
          <h1 className="text-4xl font-bold mb-4">${theme.title}</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            ${theme.description}
          </p>
        </section>
        
        <section className="py-6">
          <h2 className="text-2xl font-bold mb-6">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map(post => (
              <Card key={post.id} className="overflow-hidden">
                <div className="aspect-video bg-gray-100"></div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Badge>{post.category}</Badge>
                    <span className="text-sm text-gray-500">{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-300 mr-2"></div>
                      <span className="text-sm">{post.author.name}</span>
                    </div>
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}`;

      default:
        return `// General Theme: ${theme.title}
import React from "react";
import { ThemeProvider } from "./components/ThemeProvider";

export default function App() {
  return (
    <ThemeProvider>
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-10">
          <h1 className="text-3xl font-bold mb-6">${theme.title}</h1>
          <p className="text-lg text-muted-foreground mb-10">
            ${theme.description}
          </p>
          
          {/* Place your components here */}
        </div>
      </main>
    </ThemeProvider>
  );
}`;
    }
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
              <div className="flex border-b border-border">
                <button
                  onClick={() => setSelectedTab("preview")}
                  className={cn(
                    "flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center",
                    selectedTab === "preview"
                      ? "bg-primary/5 text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Preview
                </button>
                <button
                  onClick={() => setSelectedTab("code")}
                  className={cn(
                    "flex-1 py-3 px-4 text-sm font-medium flex items-center justify-center",
                    selectedTab === "code"
                      ? "bg-primary/5 text-primary border-b-2 border-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Code className="w-4 h-4 mr-2" />
                  Code
                </button>
              </div>
              
              <div className="relative overflow-hidden">
                <div className="aspect-[16/9] relative">
                  <div className={cn(
                    "absolute inset-0 transition-opacity duration-300",
                    selectedTab === "preview" ? "opacity-100" : "opacity-0"
                  )}>
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
                  
                  <div className={cn(
                    "absolute inset-0 transition-opacity duration-300 bg-secondary/50 p-4",
                    selectedTab === "code" ? "opacity-100" : "opacity-0 pointer-events-none"
                  )}>
                    <pre className="bg-background p-4 rounded-lg text-xs h-full overflow-auto">
                      <code className="text-foreground">
                        {getThemeCode()}
                      </code>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="rounded-xl border border-border p-6 space-y-4">
              <button
                onClick={handleDownload}
                className="w-full py-3 px-4 rounded-lg bg-primary text-primary-foreground font-medium flex items-center justify-center hover:bg-primary/90 transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Theme
              </button>
              
              <a
                href="#"
                className="w-full py-3 px-4 rounded-lg bg-secondary text-secondary-foreground font-medium flex items-center justify-center hover:bg-secondary/80 transition-colors"
              >
                <Eye className="w-4 h-4 mr-2" />
                Live Preview
              </a>
              
              <Link
                to={`/theme/${id}/code`}
                className="w-full py-3 px-4 rounded-lg bg-secondary text-secondary-foreground font-medium flex items-center justify-center hover:bg-secondary/80 transition-colors"
              >
                <Code className="w-4 h-4 mr-2" />
                View All Components
              </Link>
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
                    <CheckCircle className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
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
              <h3 className="text-lg font-medium mb-3">Need customization?</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Get this theme customized to your brand and specific requirements.
              </p>
              <a
                href="#"
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
