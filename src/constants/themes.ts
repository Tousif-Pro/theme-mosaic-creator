
export type ThemeType = {
  id: string;
  title: string;
  description: string;
  category: string;
  image: string;
  tags: string[];
  isFeatured?: boolean;
  isNew?: boolean;
};

export const categories = [
  { id: "all", label: "All Themes" },
  { id: "landing", label: "Landing Pages" },
  { id: "dashboard", label: "Dashboards" },
  { id: "portfolio", label: "Portfolio" },
  { id: "ecommerce", label: "E-Commerce" },
  { id: "blog", label: "Blog" },
];

export const themes: ThemeType[] = [
  {
    id: "saas-startup",
    title: "SaaS Startup Landing Page",
    description: "Modern, clean landing page design perfect for SaaS startups looking to showcase their products.",
    category: "landing",
    image: "/lovable-uploads/5099c16b-b29a-4ade-9ead-d9483bb3476a.png",
    tags: ["Landing Page", "SaaS", "Startup"],
    isFeatured: true,
  },
  {
    id: "modern-business",
    title: "Modern Business Landing Page",
    description: "Elegant business landing page with a modern design for corporate and business websites.",
    category: "landing",
    image: "/lovable-uploads/f996413c-0dad-4b31-95c6-d378fe3dce49.png",
    tags: ["Landing Page", "Business", "Corporate"],
    isNew: true,
  },
  {
    id: "corporate-website",
    title: "Corporate Website Landing Page",
    description: "Professional corporate website design with sections for services, team, and contact information.",
    category: "landing",
    image: "/lovable-uploads/5099c16b-b29a-4ade-9ead-d9483bb3476a.png",
    tags: ["Corporate", "Business", "Professional"],
  },
  {
    id: "high-converting-saas",
    title: "High-Converting SaaS Product Page",
    description: "Conversion-focused product page design for SaaS applications with clear call-to-actions.",
    category: "landing",
    image: "/lovable-uploads/f996413c-0dad-4b31-95c6-d378fe3dce49.png",
    tags: ["SaaS", "Product Page", "Conversion"],
  },
  {
    id: "technology-company",
    title: "Technology Company Landing Page",
    description: "Bold and innovative landing page design for technology companies and startups.",
    category: "landing",
    image: "/lovable-uploads/5099c16b-b29a-4ade-9ead-d9483bb3476a.png",
    tags: ["Technology", "Landing Page", "Innovation"],
  },
  {
    id: "real-estate-agent",
    title: "Real Estate Agent Landing Page",
    description: "Elegant landing page design for real estate agents featuring property showcases.",
    category: "landing",
    image: "/lovable-uploads/f996413c-0dad-4b31-95c6-d378fe3dce49.png",
    tags: ["Real Estate", "Landing Page", "Property"],
  },
  {
    id: "developer-portfolio",
    title: "Developer Portfolio Landing Page",
    description: "Clean and minimalist portfolio design for developers to showcase their work and skills.",
    category: "portfolio",
    image: "/lovable-uploads/5099c16b-b29a-4ade-9ead-d9483bb3476a.png",
    tags: ["Portfolio", "Developer", "Personal"],
  },
  {
    id: "software-product",
    title: "Software Product Landing Page",
    description: "Feature-rich landing page design for software products with detailed feature breakdowns.",
    category: "landing",
    image: "/lovable-uploads/f996413c-0dad-4b31-95c6-d378fe3dce49.png",
    tags: ["Software", "Product", "Landing Page"],
  },
  {
    id: "admin-dashboard",
    title: "Professional Admin Dashboard",
    description: "Clean and intuitive admin dashboard design with data visualization components.",
    category: "dashboard",
    image: "/lovable-uploads/5099c16b-b29a-4ade-9ead-d9483bb3476a.png",
    tags: ["Admin", "Dashboard", "Analytics"],
    isFeatured: true,
  },
  {
    id: "crypto-dashboard",
    title: "Cryptocurrency Trading Dashboard",
    description: "Real-time cryptocurrency trading dashboard with charts and market data.",
    category: "dashboard",
    image: "/lovable-uploads/f996413c-0dad-4b31-95c6-d378fe3dce49.png",
    tags: ["Cryptocurrency", "Trading", "Dashboard"],
  },
  {
    id: "creative-portfolio",
    title: "Creative Portfolio Website",
    description: "Expressive portfolio website design for creative professionals and artists.",
    category: "portfolio",
    image: "/lovable-uploads/5099c16b-b29a-4ade-9ead-d9483bb3476a.png",
    tags: ["Portfolio", "Creative", "Artist"],
  },
  {
    id: "crm-dashboard",
    title: "Customer Relationship Management Dashboard",
    description: "Comprehensive CRM dashboard for managing customer interactions and relationships.",
    category: "dashboard",
    image: "/lovable-uploads/f996413c-0dad-4b31-95c6-d378fe3dce49.png",
    tags: ["CRM", "Dashboard", "Customer"],
  },
  {
    id: "analytics-dashboard",
    title: "Analytics Dashboard",
    description: "Data-focused analytics dashboard with multiple visualization options.",
    category: "dashboard",
    image: "/lovable-uploads/5099c16b-b29a-4ade-9ead-d9483bb3476a.png",
    tags: ["Analytics", "Dashboard", "Data"],
  },
  {
    id: "chat-app",
    title: "Modern Chat Application UI",
    description: "Clean and intuitive user interface for messaging and chat applications.",
    category: "dashboard",
    image: "/lovable-uploads/f996413c-0dad-4b31-95c6-d378fe3dce49.png",
    tags: ["Chat", "Messaging", "UI"],
  },
  {
    id: "online-marketplace",
    title: "Online Marketplace Website",
    description: "Feature-rich marketplace website design with product listings and user profiles.",
    category: "ecommerce",
    image: "/lovable-uploads/5099c16b-b29a-4ade-9ead-d9483bb3476a.png",
    tags: ["Marketplace", "E-commerce", "Shopping"],
  },
  {
    id: "professional-blog",
    title: "Professional Blog Website",
    description: "Elegant blog website design with article layouts and category navigation.",
    category: "blog",
    image: "/lovable-uploads/f996413c-0dad-4b31-95c6-d378fe3dce49.png",
    tags: ["Blog", "Content", "Articles"],
  },
  {
    id: "business-directory",
    title: "Business Directory Website",
    description: "Comprehensive business directory website with listing and search functionality.",
    category: "landing",
    image: "/lovable-uploads/5099c16b-b29a-4ade-9ead-d9483bb3476a.png",
    tags: ["Directory", "Business", "Listings"],
  },
  {
    id: "ai-chat-interface",
    title: "AI Chat Interface",
    description: "Modern chat interface design for AI and chatbot applications.",
    category: "dashboard",
    image: "/lovable-uploads/f996413c-0dad-4b31-95c6-d378fe3dce49.png",
    tags: ["AI", "Chat", "Chatbot"],
  },
];

export const getFeaturedThemes = () => themes.filter(theme => theme.isFeatured);
export const getNewThemes = () => themes.filter(theme => theme.isNew);
export const getThemesByCategory = (category: string) => 
  category === "all" ? themes : themes.filter(theme => theme.category === category);
export const getThemeById = (id: string) => themes.find(theme => theme.id === id);
