import React, { useState, useEffect } from 'react';
import { Menu, X, Newspaper, Calendar, TrendingUp } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '../hooks/useTheme';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = 80; // Account for fixed header
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Skip to content link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary-600 text-white px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a>

      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-in-out ${
          isScrolled
            ? 'bg-white/95 dark:bg-dark-900/95 backdrop-blur-md shadow-xl border-b border-gray-200 dark:border-dark-700'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
          <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
            {/* Logo and Institute Info */}
            <div className="flex items-center space-x-2 sm:space-x-3 min-w-0 flex-1">
              <div className="flex-shrink-0">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  isScrolled 
                    ? 'bg-gradient-to-br from-primary-600 to-accent-teal' 
                    : 'bg-white/20 backdrop-blur-md border border-white/30'
                }`}>
                  <img className={`w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 rounded-lg ${
                    isScrolled ? 'text-white' : 'text-white' 
                  }`} src="/assets/SPIT.png" alt="Logo" />
                </div>
              </div>
              <div className="hidden xs:block min-w-0 flex-1">
                <div className={`text-xs font-normal leading-tight transition-colors duration-500 ${
                  isScrolled 
                    ? 'text-gray-600 dark:text-gray-400' 
                    : 'text-gray-300 dark:text-gray-400'
                }`}>
                  Bharatiya Vidya Bhavans
                </div>
                <h1 className={`font-playfair font-bold text-sm sm:text-base lg:text-lg leading-tight transition-colors duration-500 ${
                  isScrolled 
                    ? 'text-gray-900 dark:text-white' 
                    : 'text-white dark:text-white'
                }`}>
                  Sardar Patel Institute of Technology
                </h1>
                <div className={`text-xs font-normal leading-tight transition-colors duration-500 ${
                  isScrolled 
                    ? 'text-gray-600 dark:text-gray-400' 
                    : 'text-gray-300 dark:text-gray-400'
                }`}>
                  News & Events Portal
                </div>
              </div>
            </div>

            {/* Navigation Menu - Desktop */}
            <nav className="hidden lg:flex items-center space-x-4 xl:space-x-6">
              <button
                onClick={() => scrollToSection('news-events')}
                className={`flex items-center space-x-2 text-sm font-medium px-3 xl:px-4 py-2 rounded-lg transition-all duration-500 whitespace-nowrap ${
                  isScrolled
                    ? 'text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-accent-teal hover:bg-gray-100 dark:hover:bg-dark-800'
                    : 'text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm'
                }`}
              >
                <Newspaper className="w-4 h-4" />
                <span>Latest News</span>
              </button>
              <button
                onClick={() => scrollToSection('news-events')}
                className={`flex items-center space-x-2 text-sm font-medium px-3 xl:px-4 py-2 rounded-lg transition-all duration-500 whitespace-nowrap ${
                  isScrolled
                    ? 'text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-accent-teal hover:bg-gray-100 dark:hover:bg-dark-800'
                    : 'text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm'
                }`}
              >
                <Calendar className="w-4 h-4" />
                <span>Events</span>
              </button>
              <a
                href="https://spit-website.vercel.app/"
                className={`text-sm font-medium px-3 xl:px-4 py-2 rounded-lg transition-all duration-500 whitespace-nowrap ${
                  isScrolled
                    ? 'text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-accent-teal hover:bg-gray-100 dark:hover:bg-dark-800'
                    : 'text-white/90 hover:text-white hover:bg-white/10 backdrop-blur-sm'
                }`}
              >
                Back to Home
              </a>
            </nav>

            {/* Right Side - Theme Toggle & Mobile Menu Button */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className={`transition-all duration-500 ${
                isScrolled ? '' : 'drop-shadow-lg'
              }`}>
                <ThemeToggle />
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2 rounded-lg transition-all duration-500 ${
                  isScrolled
                    ? 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-800'
                    : 'text-white hover:bg-white/10 backdrop-blur-sm drop-shadow-lg'
                }`}
                aria-label="Toggle mobile menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen 
            ? 'max-h-96 opacity-100' 
            : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <div className="bg-white/95 dark:bg-dark-900/95 backdrop-blur-md border-t border-gray-200 dark:border-dark-700 shadow-lg">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 space-y-2">
              <button
                onClick={() => scrollToSection('news-events')}
                className="flex items-center space-x-3 w-full px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-lg transition-all duration-300 font-medium"
              >
                <Newspaper className="w-5 h-5 text-primary-600 dark:text-accent-teal" />
                <span>Latest News</span>
              </button>
              <button
                onClick={() => scrollToSection('news-events')}
                className="flex items-center space-x-3 w-full px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-lg transition-all duration-300 font-medium"
              >
                <Calendar className="w-5 h-5 text-accent-gold" />
                <span>Events</span>
              </button>
              <a
                href="https://spit-website.vercel.app/"
                className="flex items-center space-x-3 w-full px-4 py-3 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-dark-800 rounded-lg transition-all duration-300 font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <TrendingUp className="w-5 h-5 text-accent-purple" />
                <span>Back to Home</span>
              </a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};