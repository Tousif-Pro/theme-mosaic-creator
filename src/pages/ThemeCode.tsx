
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Copy, Check, Code, Layout, Button as ButtonIcon } from "lucide-react";
import { getThemeById } from "@/constants/themes";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

type ComponentType = {
  name: string;
  description: string;
  code: string;
  type: "layout" | "component" | "utility";
};

const ThemeCode: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [theme, setTheme] = useState(id ? getThemeById(id) : undefined);
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const { toast } = useToast();

  // Mock component data - in a real app, this would come from your backend
  const mockComponents: Record<string, ComponentType[]> = {
    "saas-startup": [
      {
        name: "Header",
        description: "Main navigation header with logo, links and CTA button",
        type: "layout",
        code: `import React from 'react';

const Header = () => {
  return (
    <header className="w-full py-4 px-6 flex items-center justify-between">
      <div className="flex items-center">
        <img src="/logo.svg" alt="SaaS Logo" className="h-8 w-auto" />
        <nav className="ml-12 hidden md:flex">
          <ul className="flex space-x-8">
            <li><a href="#features" className="text-gray-600 hover:text-gray-900">Features</a></li>
            <li><a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a></li>
            <li><a href="#testimonials" className="text-gray-600 hover:text-gray-900">Testimonials</a></li>
            <li><a href="#faq" className="text-gray-600 hover:text-gray-900">FAQ</a></li>
          </ul>
        </nav>
      </div>
      <div className="flex items-center">
        <a href="/login" className="text-gray-600 hover:text-gray-900 mr-6">Log in</a>
        <a href="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Start Free Trial
        </a>
      </div>
    </header>
  );
};

export default Header;`
      },
      {
        name: "Hero",
        description: "Hero section with headline, subtext, and call-to-action buttons",
        type: "component",
        code: `import React from 'react';

const Hero = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
          The modern way to build your SaaS product
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-10">
          Streamline your workflow, boost productivity, and scale your business with our all-in-one platform.
        </p>
        <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <a 
            href="/signup" 
            className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition w-full sm:w-auto"
          >
            Get Started — It's Free
          </a>
          <a 
            href="/demo" 
            className="px-8 py-3 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition w-full sm:w-auto"
          >
            Schedule a Demo
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;`
      },
      {
        name: "Features",
        description: "Feature grid showcasing main product functionalities",
        type: "component",
        code: `import React from 'react';
import { CheckCircle, Clock, Lock, BarChart } from 'lucide-react';

const features = [
  {
    title: 'Automated Workflows',
    description: 'Set up custom workflows to automate your business processes and save time.',
    icon: Clock
  },
  {
    title: 'Advanced Analytics',
    description: 'Gain insights into your business with detailed analytics and reporting.',
    icon: BarChart
  },
  {
    title: 'Enterprise Security',
    description: 'Keep your data secure with enterprise-grade security features.',
    icon: Lock
  },
  {
    title: 'Unlimited Users',
    description: 'Add as many team members as you need without extra charges.',
    icon: CheckCircle
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to succeed</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform provides all the tools you need to build, launch, and grow your SaaS business.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
              <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;`
      },
      {
        name: "Pricing",
        description: "Pricing table with different subscription tiers",
        type: "component",
        code: `import React from 'react';
import { Check } from 'lucide-react';

const pricingPlans = [
  {
    name: 'Starter',
    price: '$29',
    period: 'per month',
    description: 'Perfect for small teams and startups',
    features: [
      'Up to 5 team members',
      'Basic analytics',
      '24/7 email support',
      '1GB storage',
      'Standard integrations'
    ],
    cta: 'Start Free Trial',
    highlighted: false
  },
  {
    name: 'Professional',
    price: '$79',
    period: 'per month',
    description: 'For growing businesses',
    features: [
      'Up to 20 team members',
      'Advanced analytics',
      '24/7 priority support',
      '10GB storage',
      'Premium integrations',
      'Automated workflows'
    ],
    cta: 'Start Free Trial',
    highlighted: true
  },
  {
    name: 'Enterprise',
    price: '$199',
    period: 'per month',
    description: 'For large organizations',
    features: [
      'Unlimited team members',
      'Custom analytics',
      'Dedicated account manager',
      'Unlimited storage',
      'Custom integrations',
      'Advanced security',
      'API access'
    ],
    cta: 'Contact Sales',
    highlighted: false
  }
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that's right for your business. All plans include a 14-day free trial.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div 
              key={index} 
              className={\`p-8 rounded-xl border \${
                plan.highlighted 
                  ? 'border-blue-600 shadow-lg' 
                  : 'border-gray-200 shadow-sm'
              }\`}
            >
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="flex items-end">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-600 ml-2">{plan.period}</span>
                </div>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button 
                className={\`w-full py-3 rounded-md font-medium \${
                  plan.highlighted 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }\`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;`
      },
      {
        name: "Footer",
        description: "Site footer with links and company information",
        type: "layout",
        code: `import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">SaaS Platform</h3>
            <p className="text-gray-400 mb-4">
              Building the future of business software. Streamlined workflows, powerful features.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Features</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Pricing</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Integrations</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Changelog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Documentation</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Careers</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Press</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white">Privacy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Terms</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white">Security</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} SaaS Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;`
      },
    ],
    "developer-portfolio": [
      {
        name: "NavBar",
        description: "Responsive navigation bar with mobile menu",
        type: "layout",
        code: `import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed w-full bg-slate-900/90 backdrop-blur-sm text-white z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold">
          <span className="text-blue-400">Dev</span>Portfolio
        </a>
        
        {/* Desktop Menu */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li><a href="#home" className="hover:text-blue-400 transition">Home</a></li>
            <li><a href="#about" className="hover:text-blue-400 transition">About</a></li>
            <li><a href="#projects" className="hover:text-blue-400 transition">Projects</a></li>
            <li><a href="#skills" className="hover:text-blue-400 transition">Skills</a></li>
            <li><a href="#contact" className="hover:text-blue-400 transition">Contact</a></li>
          </ul>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-slate-900 border-t border-slate-800">
          <nav className="container mx-auto px-4 py-4">
            <ul className="flex flex-col space-y-4">
              <li><a href="#home" className="block py-2 hover:text-blue-400 transition" onClick={() => setIsOpen(false)}>Home</a></li>
              <li><a href="#about" className="block py-2 hover:text-blue-400 transition" onClick={() => setIsOpen(false)}>About</a></li>
              <li><a href="#projects" className="block py-2 hover:text-blue-400 transition" onClick={() => setIsOpen(false)}>Projects</a></li>
              <li><a href="#skills" className="block py-2 hover:text-blue-400 transition" onClick={() => setIsOpen(false)}>Skills</a></li>
              <li><a href="#contact" className="block py-2 hover:text-blue-400 transition" onClick={() => setIsOpen(false)}>Contact</a></li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default NavBar;`
      },
      {
        name: "HeroSection",
        description: "Developer portfolio hero section with introduction and CTA",
        type: "component",
        code: `import React from 'react';
import { GitHub, Linkedin, Mail, ArrowDown } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center pt-16 bg-slate-900 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="block">Hi, I'm</span>
              <span className="text-blue-400">John Developer</span>
            </h1>
            <h2 className="text-2xl md:text-3xl mb-6 text-slate-300">Full Stack Developer</h2>
            <p className="text-lg text-slate-300 mb-8">
              I build modern, responsive web applications using React, Node.js, and other cutting-edge technologies.
            </p>
            <div className="flex space-x-4 mb-8">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition"
              >
                <GitHub size={24} />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition"
              >
                <Linkedin size={24} />
              </a>
              <a 
                href="mailto:john@example.com" 
                className="p-2 bg-slate-800 rounded-full hover:bg-slate-700 transition"
              >
                <Mail size={24} />
              </a>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <a 
                href="#contact" 
                className="px-6 py-3 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 transition text-center"
              >
                Contact Me
              </a>
              <a 
                href="/resume.pdf" 
                target="_blank" 
                className="px-6 py-3 bg-slate-800 text-white rounded-md font-medium hover:bg-slate-700 transition text-center"
              >
                Download Resume
              </a>
            </div>
          </div>
          <div className="order-1 md:order-2 flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-blue-400">
                <img
                  src="/profile-image.jpg"
                  alt="John Developer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-slate-800 px-4 py-2 rounded-lg">
                <span className="text-blue-400 font-bold">5+ Years</span>
                <span className="block text-sm text-slate-300">Experience</span>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <a href="#about" className="text-slate-300 hover:text-white">
            <ArrowDown size={32} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;`
      },
      {
        name: "ProjectsSection",
        description: "Grid of developer projects with details",
        type: "component",
        code: `import React from 'react';
import { ExternalLink, GitHub } from 'lucide-react';

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce application built with React, Node.js, and MongoDB.',
    image: '/project1.jpg',
    tags: ['React', 'Node.js', 'MongoDB', 'Express', 'Redux'],
    liveUrl: 'https://project1.example.com',
    githubUrl: 'https://github.com/johndeveloper/project1',
  },
  {
    title: 'Travel Booking App',
    description: 'A travel booking application with authentication and payment processing.',
    image: '/project2.jpg',
    tags: ['React', 'Firebase', 'Stripe', 'Tailwind CSS'],
    liveUrl: 'https://project2.example.com',
    githubUrl: 'https://github.com/johndeveloper/project2',
  },
  {
    title: 'Task Management System',
    description: 'Drag-and-drop task management system with team collaboration features.',
    image: '/project3.jpg',
    tags: ['TypeScript', 'React', 'Node.js', 'Socket.io'],
    liveUrl: 'https://project3.example.com',
    githubUrl: 'https://github.com/johndeveloper/project3',
  },
  {
    title: 'Weather Dashboard',
    description: 'Interactive weather dashboard using OpenWeatherMap API with location tracking.',
    image: '/project4.jpg',
    tags: ['JavaScript', 'API Integration', 'Chart.js', 'Geolocation'],
    liveUrl: 'https://project4.example.com',
    githubUrl: 'https://github.com/johndeveloper/project4',
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-20 bg-slate-800 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-2">My Projects</h2>
          <div className="w-20 h-1 bg-blue-400 mx-auto mb-6"></div>
          <p className="text-slate-300 max-w-2xl mx-auto">
            Here are some of my recent projects. Each project was an opportunity to learn new technologies and solve interesting problems.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="bg-slate-700 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition duration-300">
              <div className="h-48 relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover hover:scale-110 transition duration-300"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-slate-300 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="text-xs bg-slate-600 text-slate-200 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-400 hover:text-blue-300"
                  >
                    <ExternalLink size={16} className="mr-1" />
                    Live Demo
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-400 hover:text-blue-300"
                  >
                    <GitHub size={16} className="mr-1" />
                    Source Code
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a
            href="https://github.com/johndeveloper"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 rounded-md bg-blue-500 text-white font-medium hover:bg-blue-600 transition"
          >
            See More on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;`
      },
    ],
    "admin-dashboard": [
      {
        name: "Dashboard",
        description: "Main admin dashboard layout with sidebar and content area",
        type: "layout",
        code: `import React, { useState } from 'react';
import { Menu, X, Home, BarChart, Users, Settings, Bell, Search, Sun, Moon } from 'lucide-react';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // In a real application, you would add/remove dark mode classes to the HTML element
  };

  return (
    <div className={\`min-h-screen flex \${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}\`}>
      {/* Sidebar */}
      <div className={\`
        fixed inset-y-0 left-0 z-50 w-64 transition-all duration-300 transform 
        \${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 md:static md:inset-auto md:h-screen
        \${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}
        shadow-lg
      \`}>
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <div className="flex items-center">
            <span className="text-xl font-semibold">Admin Dashboard</span>
          </div>
          <button 
            className="md:hidden"
            onClick={toggleSidebar}
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="px-2 py-4">
          <ul className="space-y-2">
            <li>
              <a 
                href="#" 
                className={\`flex items-center px-4 py-2 rounded-lg \${
                  darkMode 
                    ? 'hover:bg-gray-700 text-white' 
                    : 'hover:bg-gray-200 text-gray-700'
                }\`}
              >
                <Home className="w-5 h-5 mr-3" />
                <span>Dashboard</span>
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className={\`flex items-center px-4 py-2 rounded-lg \${
                  darkMode 
                    ? 'hover:bg-gray-700 text-white' 
                    : 'hover:bg-gray-200 text-gray-700'
                }\`}
              >
                <BarChart className="w-5 h-5 mr-3" />
                <span>Analytics</span>
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className={\`flex items-center px-4 py-2 rounded-lg \${
                  darkMode 
                    ? 'hover:bg-gray-700 text-white' 
                    : 'hover:bg-gray-200 text-gray-700'
                }\`}
              >
                <Users className="w-5 h-5 mr-3" />
                <span>Users</span>
              </a>
            </li>
            <li>
              <a 
                href="#" 
                className={\`flex items-center px-4 py-2 rounded-lg \${
                  darkMode 
                    ? 'hover:bg-gray-700 text-white' 
                    : 'hover:bg-gray-200 text-gray-700'
                }\`}
              >
                <Settings className="w-5 h-5 mr-3" />
                <span>Settings</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Navigation */}
        <header className={\`h-16 flex items-center justify-between px-4 md:px-6 shadow-sm \${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }\`}>
          <div className="flex items-center">
            <button 
              className="mr-4 md:hidden"
              onClick={toggleSidebar}
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className={\`relative \${darkMode ? 'text-gray-200' : 'text-gray-600'}\`}>
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="w-5 h-5" />
              </span>
              <input 
                type="text" 
                placeholder="Search..." 
                className={\`py-2 pl-10 pr-4 rounded-lg focus:outline-none focus:ring \${
                  darkMode 
                    ? 'bg-gray-700 focus:ring-gray-600 text-white' 
                    : 'bg-gray-100 focus:ring-blue-200 text-gray-700'
                }\`}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="relative">
              <Bell className="w-6 h-6" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button onClick={toggleDarkMode}>
              {darkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
            </button>
            <div className="w-8 h-8 rounded-full bg-gray-400 overflow-hidden">
              <img 
                src="/avatar.jpg" 
                alt="User avatar" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </header>
        
        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <h1 className="text-2xl font-semibold mb-6">Dashboard Overview</h1>
          
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[
              { title: 'Total Users', value: '10,249', change: '+12%' },
              { title: 'New Customers', value: '1,423', change: '+18%' },
              { title: 'Total Revenue', value: '$45,291', change: '+32%' },
              { title: 'Pending Orders', value: '56', change: '-8%' }
            ].map((stat, index) => (
              <div 
                key={index} 
                className={\`p-4 rounded-lg shadow-sm \${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                }\`}
              >
                <h3 className={\`text-sm font-medium \${
                  darkMode ? 'text-gray-300' : 'text-gray-500'
                }\`}>
                  {stat.title}
                </h3>
                <div className="flex items-end justify-between mt-2">
                  <p className="text-2xl font-semibold">{stat.value}</p>
                  <span className={\`text-sm \${
                    stat.change.startsWith('+') 
                      ? 'text-green-500' 
                      : 'text-red-500'
                  }\`}>
                    {stat.change}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Chart and Table (placeholders) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className={\`col-span-2 p-4 rounded-lg shadow-sm \${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }\`}>
              <h2 className="text-lg font-medium mb-4">Revenue Over Time</h2>
              <div className="h-80 bg-gray-200 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Chart will render here</p>
              </div>
            </div>
            
            <div className={\`p-4 rounded-lg shadow-sm \${
              darkMode ? 'bg-gray-800' : 'bg-white'
            }\`}>
              <h2 className="text-lg font-medium mb-4">Recent Transactions</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={darkMode ? 'text-gray-300' : 'text-gray-600'}>
                      <th className="text-left pb-3 font-medium">User</th>
                      <th className="text-left pb-3 font-medium">Amount</th>
                      <th className="text-left pb-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {[
                      { user: 'John Doe', amount: '$102.00', status: 'Completed' },
                      { user: 'Jane Smith', amount: '$75.40', status: 'Pending' },
                      { user: 'Bob Johnson', amount: '$210.35', status: 'Failed' },
                      { user: 'Alice Brown', amount: '$54.20', status: 'Completed' },
                      { user: 'David Lee', amount: '$189.75', status: 'Pending' }
                    ].map((transaction, index) => (
                      <tr key={index}>
                        <td className="py-3">{transaction.user}</td>
                        <td className="py-3">{transaction.amount}</td>
                        <td className="py-3">
                          <span className={\`px-2 py-1 rounded-full text-xs font-medium \${
                            transaction.status === 'Completed'
                              ? 'bg-green-100 text-green-800'
                              : transaction.status === 'Pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }\`}>
                            {transaction.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;`
      },
    ]
  };

  useEffect(() => {
    if (id) {
      const foundTheme = getThemeById(id);
      setTheme(foundTheme);
      
      // Set active component to first component if available
      if (mockComponents[id] && mockComponents[id].length > 0) {
        setActiveComponent(mockComponents[id][0].name);
      }
    }
  }, [id]);

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    
    toast({
      title: "Code copied to clipboard",
      description: "You can now paste it into your project",
      duration: 2000,
    });
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
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

  // Get components for this theme or show empty state
  const components = mockComponents[id] || [];

  return (
    <div className="min-h-screen pt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <Link 
            to={`/theme/${id}`} 
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to theme details
          </Link>
          
          <h1 className="text-2xl md:text-3xl font-display font-medium">
            {theme.title} <span className="text-muted-foreground">Components</span>
          </h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8">
          {/* Component List */}
          <div className="space-y-6">
            <div className="bg-card rounded-lg border border-border p-4">
              <h3 className="text-lg font-medium mb-4">Components</h3>
              
              {components.length === 0 ? (
                <p className="text-muted-foreground text-sm py-2">
                  No components available yet
                </p>
              ) : (
                <div className="space-y-1">
                  {components.map((component) => (
                    <button
                      key={component.name}
                      onClick={() => setActiveComponent(component.name)}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-md text-sm flex items-center",
                        activeComponent === component.name
                          ? "bg-primary/10 text-primary font-medium"
                          : "hover:bg-secondary text-foreground"
                      )}
                    >
                      {component.type === 'layout' ? (
                        <Layout className="w-4 h-4 mr-2 flex-shrink-0" />
                      ) : component.type === 'component' ? (
                        <Code className="w-4 h-4 mr-2 flex-shrink-0" />
                      ) : (
                        <ButtonIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                      )}
                      {component.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            <div className="bg-card rounded-lg border border-border p-4">
              <h3 className="text-lg font-medium mb-2">Setup Instructions</h3>
              <ol className="text-sm text-muted-foreground space-y-2 pl-4 list-decimal">
                <li>Create a new React project with <code>npm create vite@latest</code></li>
                <li>Install Tailwind CSS: <code>npm install -D tailwindcss</code></li>
                <li>Initialize Tailwind: <code>npx tailwindcss init</code></li>
                <li>Copy the component code into your project</li>
                <li>Install required dependencies</li>
              </ol>
            </div>
          </div>
          
          {/* Code Display */}
          <div className="bg-card rounded-lg border border-border overflow-hidden">
            {components.length === 0 ? (
              <div className="p-8 text-center">
                <Code className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-medium mb-2">No Components Available</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  This theme doesn't have any component code available yet. 
                  Check back later or explore other themes.
                </p>
              </div>
            ) : activeComponent ? (
              <>
                <div className="border-b border-border p-4 flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">{activeComponent}</h3>
                    <p className="text-sm text-muted-foreground">
                      {components.find(c => c.name === activeComponent)?.description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleCopyCode(components.find(c => c.name === activeComponent)?.code || '')}
                    className="inline-flex items-center px-3 py-1 rounded-md bg-secondary text-secondary-foreground text-sm hover:bg-secondary/80"
                  >
                    {copied ? <Check className="w-4 h-4 mr-1" /> : <Copy className="w-4 h-4 mr-1" />}
                    {copied ? 'Copied' : 'Copy'}
                  </button>
                </div>
                <div className="p-0">
                  <pre className="overflow-auto max-h-[70vh] p-4 text-sm">
                    <code>
                      {components.find(c => c.name === activeComponent)?.code}
                    </code>
                  </pre>
                </div>
              </>
            ) : (
              <div className="p-8 text-center">
                <p className="text-muted-foreground">
                  Select a component to view its code
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeCode;
