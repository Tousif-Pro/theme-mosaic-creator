
import React from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Copy, Download, ArrowRight } from "lucide-react";
import { getThemeById } from "@/constants/themes";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";

const ThemeCode = () => {
  const { id } = useParams<{ id: string }>();
  const theme = id ? getThemeById(id) : undefined;
  const { toast } = useToast();

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    toast({
      title: "Code copied",
      description: "The code has been copied to your clipboard",
      duration: 3000,
    });
  };

  const handleDownloadCode = () => {
    toast({
      title: "Download started",
      description: "Your template code is being prepared for download",
      duration: 3000,
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

  // Define complete template code structured by component
  const themeComponents = [
    {
      name: "App.tsx",
      description: "Main application component with routing",
      code: `import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;`
    },
    {
      name: "components/Navbar.tsx",
      description: "Navigation bar component",
      code: `import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-sm dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="font-bold text-xl text-indigo-600 dark:text-indigo-400">
                ${theme.title.split(" ")[0]}
              </span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                to="/"
                className="border-indigo-500 text-gray-900 dark:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="border-transparent text-gray-500 dark:text-gray-300 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={toggleMenu}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
          <div className="hidden sm:flex sm:items-center">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium">
              Get Started
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="sm:hidden" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="bg-indigo-50 dark:bg-gray-800 border-indigo-500 text-indigo-700 dark:text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="border-transparent text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 hover:text-gray-700 dark:hover:text-white block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;`
    },
    {
      name: "components/Hero.tsx",
      description: "Hero section component for landing pages",
      code: `import React from "react";

const Hero = () => {
  return (
    <div className="relative bg-white dark:bg-gray-900 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white dark:bg-gray-900 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
          <svg
            className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white dark:text-gray-900 transform translate-x-1/2"
            fill="currentColor"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <polygon points="50,0 100,0 50,100 0,100" />
          </svg>

          <div className="relative pt-6 px-4 sm:px-6 lg:px-8"></div>

          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
                <span className="block xl:inline">${theme.title.split(" ")[0]}</span>{" "}
                <span className="block text-indigo-600 dark:text-indigo-400 xl:inline">
                  ${theme.title.split(" ").slice(1).join(" ")}
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 dark:text-gray-400 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                ${theme.description}
              </p>
              <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                <div className="rounded-md shadow">
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
                  >
                    Get started
                  </a>
                </div>
                <div className="mt-3 sm:mt-0 sm:ml-3">
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                  >
                    Learn more
                  </a>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
        <img
          className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
          alt=""
        />
      </div>
    </div>
  );
};

export default Hero;`
    },
    {
      name: "components/Features.tsx",
      description: "Features section component",
      code: `import React from "react";

const Features = () => {
  const features = [
    {
      title: "Responsive Design",
      description: "Our templates are fully responsive and work on all devices.",
      icon: "📱",
    },
    {
      title: "Modern Technologies",
      description: "Built with the latest frameworks and best practices.",
      icon: "🚀",
    },
    {
      title: "Customizable",
      description: "Easily customize to match your brand and requirements.",
      icon: "🎨",
    },
    {
      title: "Well Documented",
      description: "Comprehensive documentation to get you started quickly.",
      icon: "📝",
    },
  ];

  return (
    <div className="py-12 bg-white dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">
            Features
          </h2>
          <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            A better way to build websites
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-300 lg:mx-auto">
            Everything you need to create amazing web experiences
          </p>
        </div>

        <div className="mt-10">
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
            {features.map((feature) => (
              <div key={feature.title} className="relative">
                <dt>
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                    <span className="text-xl">{feature.icon}</span>
                  </div>
                  <p className="ml-16 text-lg leading-6 font-medium text-gray-900 dark:text-white">
                    {feature.title}
                  </p>
                </dt>
                <dd className="mt-2 ml-16 text-base text-gray-500 dark:text-gray-300">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Features;`
    },
    {
      name: "components/Footer.tsx",
      description: "Footer component",
      code: `import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 overflow-hidden sm:px-6 lg:px-8">
        <nav
          className="-mx-5 -my-2 flex flex-wrap justify-center"
          aria-label="Footer"
        >
          <div className="px-5 py-2">
            <Link
              to="/"
              className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              Home
            </Link>
          </div>

          <div className="px-5 py-2">
            <Link
              to="/about"
              className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              About
            </Link>
          </div>

          <div className="px-5 py-2">
            <Link
              to="/contact"
              className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              Contact
            </Link>
          </div>

          <div className="px-5 py-2">
            <a
              href="#"
              className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              Blog
            </a>
          </div>

          <div className="px-5 py-2">
            <a
              href="#"
              className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              Careers
            </a>
          </div>

          <div className="px-5 py-2">
            <a
              href="#"
              className="text-base text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              Privacy
            </a>
          </div>
        </nav>
        <div className="mt-8 flex justify-center space-x-6">
          <a
            href="#"
            className="text-gray-400 hover:text-gray-500 dark:hover:text-white"
          >
            <span className="sr-only">Facebook</span>
            <svg
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                clipRule="evenodd"
              />
            </svg>
          </a>

          <a
            href="#"
            className="text-gray-400 hover:text-gray-500 dark:hover:text-white"
          >
            <span className="sr-only">Instagram</span>
            <svg
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                clipRule="evenodd"
              />
            </svg>
          </a>

          <a
            href="#"
            className="text-gray-400 hover:text-gray-500 dark:hover:text-white"
          >
            <span className="sr-only">Twitter</span>
            <svg
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>

          <a
            href="#"
            className="text-gray-400 hover:text-gray-500 dark:hover:text-white"
          >
            <span className="sr-only">GitHub</span>
            <svg
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
        <p className="mt-8 text-center text-base text-gray-400">
          &copy; 2023 ${theme.title} Template. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;`
    },
    {
      name: "pages/HomePage.tsx",
      description: "Home page component",
      code: `import React from "react";
import Hero from "../components/Hero";
import Features from "../components/Features";

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Features />
      
      {/* Testimonials Section */}
      <div className="py-12 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-10">
            <h2 className="text-base text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">
              Testimonials
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              What our clients say
            </p>
          </div>
          
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "Sarah Thompson",
                role: "Marketing Director",
                content: "This template exceeded all my expectations. It's beautifully designed and incredibly easy to customize.",
              },
              {
                name: "Mark Johnson",
                role: "CEO",
                content: "The code quality is outstanding. We were able to launch our site in record time thanks to this template.",
              },
              {
                name: "Lisa Rodriguez",
                role: "Developer",
                content: "As a developer, I appreciate the clean code and thoughtful organization. Makes customization a breeze.",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-900 overflow-hidden shadow rounded-lg p-6"
              >
                <div className="text-gray-500 dark:text-gray-300 mb-4">
                  "{testimonial.content}"
                </div>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-indigo-200 flex items-center justify-center">
                    <span className="text-indigo-600 font-bold">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* CTA Section */}
      <div className="bg-indigo-700">
        <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block">Download the template today.</span>
          </h2>
          <p className="mt-4 text-lg leading-6 text-indigo-200">
            Everything you need to build beautiful websites that convert.
          </p>
          <a
            href="#"
            className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
          >
            Get started
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;`
    },
    {
      name: "pages/AboutPage.tsx",
      description: "About page component",
      code: `import React from "react";

const AboutPage = () => {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-base font-semibold text-indigo-600 dark:text-indigo-400 tracking-wide uppercase">
            About Us
          </h1>
          <p className="mt-1 text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight">
            We build amazing web experiences
          </p>
          <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500 dark:text-gray-300">
            Our mission is to make beautiful, high-performance websites accessible to everyone.
          </p>
        </div>
        
        <div className="mt-20">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">
              Our Story
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              From humble beginnings
            </p>
          </div>
          
          <div className="mt-12 max-w-3xl mx-auto text-gray-500 dark:text-gray-300 space-y-6">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
            </p>
            <p>
              Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
            </p>
          </div>
        </div>
        
        <div className="mt-20">
          <div className="lg:text-center mb-12">
            <h2 className="text-base text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">
              Our Team
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Meet the people behind our success
            </p>
          </div>
          
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                name: "John Smith",
                role: "Founder & CEO",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                bio: "John has over 15 years of experience in web development and design.",
              },
              {
                name: "Emily Johnson",
                role: "Creative Director",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                bio: "Emily leads our design team with her impeccable taste and attention to detail.",
              },
              {
                name: "Michael Wilson",
                role: "Lead Developer",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                bio: "Michael ensures our code is clean, efficient, and follows best practices.",
              },
            ].map((person) => (
              <div key={person.name} className="text-center">
                <div className="mx-auto h-40 w-40 rounded-full overflow-hidden">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {person.name}
                  </h3>
                  <p className="text-indigo-600 dark:text-indigo-400">{person.role}</p>
                  <p className="mt-2 text-gray-500 dark:text-gray-300">
                    {person.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;`
    },
    {
      name: "pages/ContactPage.tsx",
      description: "Contact page component",
      code: `import React, { useState } from "react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You would typically handle form submission here
    console.log("Form submitted:", formData);
    setSubmitted(true);
    
    // Reset form after submission
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
    
    // Reset submitted state after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="relative bg-white dark:bg-gray-800 shadow-xl rounded-lg">
          <div className="grid grid-cols-1 lg:grid-cols-3">
            {/* Contact information */}
            <div className="relative overflow-hidden rounded-l-lg py-10 px-6 bg-indigo-700 sm:px-10 xl:p-12">
              <div className="absolute inset-0 pointer-events-none sm:hidden" aria-hidden="true">
                <svg
                  className="absolute inset-0 w-full h-full"
                  width="343"
                  height="388"
                  viewBox="0 0 343 388"
                  fill="none"
                  preserveAspectRatio="xMidYMid slice"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M-99 461.107L608.107-246l707.103 707.107-707.103 707.103L-99 461.107z"
                    fill="url(#linear1)"
                    fillOpacity=".1"
                  />
                  <defs>
                    <linearGradient
                      id="linear1"
                      x1="254.553"
                      y1="107.554"
                      x2="961.66"
                      y2="814.66"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#fff" />
                      <stop offset="1" stopColor="#fff" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div
                className="hidden absolute top-0 right-0 bottom-0 w-1/2 pointer-events-none sm:block lg:hidden"
                aria-hidden="true"
              >
                <svg
                  className="absolute inset-0 w-full h-full"
                  width="359"
                  height="339"
                  viewBox="0 0 359 339"
                  fill="none"
                  preserveAspectRatio="xMidYMid slice"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M-161 382.107L546.107-325l707.103 707.107-707.103 707.103L-161 382.107z"
                    fill="url(#linear2)"
                    fillOpacity=".1"
                  />
                  <defs>
                    <linearGradient
                      id="linear2"
                      x1="192.553"
                      y1="28.553"
                      x2="899.66"
                      y2="735.66"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#fff" />
                      <stop offset="1" stopColor="#fff" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div
                className="hidden absolute top-0 right-0 bottom-0 w-1/2 pointer-events-none lg:block"
                aria-hidden="true"
              >
                <svg
                  className="absolute inset-0 w-full h-full"
                  width="160"
                  height="678"
                  viewBox="0 0 160 678"
                  fill="none"
                  preserveAspectRatio="xMidYMid slice"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M-161 679.107L546.107-28l707.103 707.107-707.103 707.103L-161 679.107z"
                    fill="url(#linear3)"
                    fillOpacity=".1"
                  />
                  <defs>
                    <linearGradient
                      id="linear3"
                      x1="192.553"
                      y1="325.553"
                      x2="899.66"
                      y2="1032.66"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#fff" />
                      <stop offset="1" stopColor="#fff" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white">Contact information</h3>
              <p className="mt-6 text-base text-indigo-50 max-w-3xl">
                Have a question? Need support? We're here to help. Reach out to us using any of the methods below.
              </p>
              <dl className="mt-8 space-y-6">
                <dt>
                  <span className="sr-only">Address</span>
                </dt>
                <dd className="flex text-base text-indigo-50">
                  <svg
                    className="flex-shrink-0 w-6 h-6 text-indigo-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                  <span className="ml-3">123 Main St, Anytown, CA 12345, USA</span>
                </dd>
                <dt>
                  <span className="sr-only">Phone number</span>
                </dt>
                <dd className="flex text-base text-indigo-50">
                  <svg
                    className="flex-shrink-0 w-6 h-6 text-indigo-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    ></path>
                  </svg>
                  <span className="ml-3">+1 (555) 123-4567</span>
                </dd>
                <dt>
                  <span className="sr-only">Email</span>
                </dt>
                <dd className="flex text-base text-indigo-50">
                  <svg
                    className="flex-shrink-0 w-6 h-6 text-indigo-200"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                  <span className="ml-3">contact@example.com</span>
                </dd>
              </dl>
              <ul className="mt-8 flex space-x-12">
                <li>
                  <a className="text-indigo-200 hover:text-indigo-100" href="#">
                    <span className="sr-only">Facebook</span>
                    <svg
                      className="w-7 h-7"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </li>
                <li>
                  <a className="text-indigo-200 hover:text-indigo-100" href="#">
                    <span className="sr-only">Twitter</span>
                    <svg
                      className="w-7 h-7"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </li>
                <li>
                  <a className="text-indigo-200 hover:text-indigo-100" href="#">
                    <span className="sr-only">LinkedIn</span>
                    <svg
                      className="w-7 h-7"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    </svg>
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact form */}
            <div className="py-10 px-6 sm:px-10 lg:col-span-2 xl:p-12">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Send us a message
              </h3>
              {submitted ? (
                <div className="mt-8 p-4 bg-green-50 dark:bg-green-900 rounded-md">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg
                        className="h-5 w-5 text-green-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
                        Message sent successfully
                      </h3>
                      <div className="mt-2 text-sm text-green-700 dark:text-green-300">
                        <p>
                          Thank you for your message. We'll get back to you as soon as possible.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      Name
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="name"
                        id="name"
                        autoComplete="given-name"
                        className="py-3 px-4 block w-full shadow-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                        required
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      Email
                    </label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="py-3 px-4 block w-full shadow-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                        required
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      Subject
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="subject"
                        id="subject"
                        className="py-3 px-4 block w-full shadow-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-900 dark:text-gray-100"
                    >
                      Message
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        className="py-3 px-4 block w-full shadow-sm text-gray-900 dark:text-white bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                        required
                        value={formData.message}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;`
    },
    {
      name: "setup-instructions.md",
      description: "Setup instructions for the template",
      code: `# ${theme.title} Setup Instructions

## Getting Started

Follow these steps to get your ${theme.title} up and running:

### 1. Prerequisites

Make sure you have Node.js (v14 or later) and npm/yarn installed on your system.

### 2. Project Setup

1. Create a new React project using Create React App:

\`\`\`bash
npx create-react-app my-${theme.id.toLowerCase()} --template typescript
cd my-${theme.id.toLowerCase()}
\`\`\`

2. Install the required dependencies:

\`\`\`bash
npm install react-router-dom tailwindcss postcss autoprefixer lucide-react
\`\`\`

3. Initialize Tailwind CSS:

\`\`\`bash
npx tailwindcss init -p
\`\`\`

4. Configure Tailwind CSS by updating the tailwind.config.js file with the following:

\`\`\`javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
\`\`\`

5. Add Tailwind directives to your CSS file (src/index.css):

\`\`\`css
@tailwind base;
@tailwind components;
@tailwind utilities;
\`\`\`

### 3. File Structure

Copy the provided components into your project's src directory, maintaining the following structure:

\`\`\`
src/
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── Footer.tsx
├── pages/
│   ├── HomePage.tsx
│   ├── AboutPage.tsx
│   ├── ContactPage.tsx
├── App.tsx
├── App.css
├── index.css
\`\`\`

### 4. Add Google Fonts

Add the following to the <head> section of your public/index.html file:

\`\`\`html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
\`\`\`

### 5. Starting the Development Server

Run the following command to start the development server:

\`\`\`bash
npm start
\`\`\`

The application will be available at http://localhost:3000.

## Customization

### Changing Colors

To change the primary color scheme, modify the Tailwind theme values in the tailwind.config.js file. For example, to change from indigo to emerald:

\`\`\`javascript
theme: {
  extend: {
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      display: ['Inter', 'sans-serif'],
    },
    colors: {
      indigo: {
        50: '#ecfdf5',
        100: '#d1fae5',
        200: '#a7f3d0',
        400: '#34d399',
        500: '#10b981',
        600: '#059669',
        700: '#047857',
      },
    },
  },
}
\`\`\`

### Modifying Components

Each component is fully customizable. You can modify text, colors, images, and layouts to match your brand requirements.

### Adding New Pages

To add a new page:

1. Create a new component in the pages/ directory
2. Add a new route in App.tsx within the <Routes> component

\`\`\`jsx
<Route path="/new-page" element={<NewPage />} />
\`\`\`

3. Add a link to the new page in the Navbar component

## Additional Resources

For more customization options, refer to:

- [React Router Documentation](https://reactrouter.com/docs/en/v6)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Lucide Icons Documentation](https://lucide.dev/docs/lucide-react)

## Support

If you need any assistance with this template, please contact us at support@example.com.
`
    },
    {
      name: "App.css",
      description: "Main stylesheet for the application",
      code: `/* Main stylesheet */

/* Base styles */
body {
  font-family: 'Inter', sans-serif;
}

/* Animation */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

/* Utility classes */
.section-padding {
  padding-top: 4rem;
  padding-bottom: 4rem;
}

@media (min-width: 768px) {
  .section-padding {
    padding-top: 6rem;
    padding-bottom: 6rem;
  }
}

/* Custom focus styles */
.custom-focus:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.5);
}

/* Dark mode adjustments */
.dark .custom-focus:focus {
  box-shadow: 0 0 0 3px rgba(129, 140, 248, 0.5);
}

/* Hover card effect */
.hover-card {
  transition: transform 0.2s, box-shadow 0.2s;
}

.hover-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.dark .hover-card:hover {
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.2);
}

/* Gradient background */
.gradient-bg {
  background: linear-gradient(to right, rgba(99, 102, 241, 0.1), rgba(99, 102, 241, 0.05));
}

.dark .gradient-bg {
  background: linear-gradient(to right, rgba(99, 102, 241, 0.2), rgba(99, 102, 241, 0.1));
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.dark ::-webkit-scrollbar-track {
  background: #1a1a1a;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.dark ::-webkit-scrollbar-thumb {
  background: #555;
}

.dark ::-webkit-scrollbar-thumb:hover {
  background: #777;
}`
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <Link
          to={`/theme/${id}`}
          className="inline-flex items-center mb-8 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="mr-2 w-4 h-4" />
          Back to theme details
        </Link>

        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-display font-medium mb-3">
            {theme.title} - Complete Code
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Below you'll find all the components and code needed to implement this template.
          </p>
          
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleDownloadCode} className="flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Download Source Code
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-10">
          {/* Component Navigation */}
          <div className="border border-border rounded-xl p-4 h-fit lg:sticky lg:top-24 space-y-1">
            <h3 className="font-medium mb-4">Components</h3>
            {themeComponents.map((component, index) => (
              <a
                key={index}
                href={`#${component.name.replace(/\//g, '-').replace(/\./g, '-')}`}
                className="block py-2 px-3 rounded-md text-sm hover:bg-secondary transition-colors"
              >
                {component.name}
              </a>
            ))}
          </div>

          {/* Component Code */}
          <div className="space-y-10">
            {themeComponents.map((component, index) => (
              <div 
                key={index}
                id={component.name.replace(/\//g, '-').replace(/\./g, '-')}
                className="border border-border rounded-xl overflow-hidden"
              >
                <div className="flex justify-between items-center p-4 bg-secondary/50 border-b border-border">
                  <div>
                    <h3 className="font-medium">{component.name}</h3>
                    <p className="text-sm text-muted-foreground">{component.description}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => handleCopyCode(component.code)}
                    className="flex items-center"
                  >
                    <Copy className="w-4 h-4 mr-2" />
                    Copy
                  </Button>
                </div>
                <div className="relative">
                  <pre className="p-4 overflow-x-auto text-sm">
                    <code className="language-tsx">{component.code}</code>
                  </pre>
                </div>
              </div>
            ))}
            
            <div className="flex justify-between mt-10">
              <Link
                to={`/theme/${id}`}
                className="inline-flex items-center text-blue-600 hover:underline"
              >
                <ArrowLeft className="mr-2 w-4 h-4" />
                Back to theme details
              </Link>
              <Link
                to="/"
                className="inline-flex items-center text-blue-600 hover:underline"
              >
                Browse more templates
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeCode;
