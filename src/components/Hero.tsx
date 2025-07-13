import React from 'react';
import { TrendingUp, Award, Calendar, Newspaper } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export const Hero: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver();

  const scrollToNewsEvents = () => {
    const element = document.getElementById('news-events');
    if (element) {
      const headerHeight = 80; // Account for fixed header
      const elementPosition = element.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-18 lg:pt-20"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-dark-900 to-accent-purple dark:from-dark-900 dark:via-dark-800 dark:to-dark-900">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
      </div>

      {/* Floating Excellence Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-4 sm:left-10 w-12 h-12 sm:w-16 sm:h-16 bg-accent-gold/20 rounded-full animate-pulse"></div>
        <div className="absolute top-32 sm:top-40 right-8 sm:right-20 w-10 h-10 sm:w-12 sm:h-12 bg-accent-teal/20 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 sm:bottom-40 left-8 sm:left-20 w-16 h-16 sm:w-20 sm:h-20 bg-accent-purple/20 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-4 sm:right-10 w-12 h-12 sm:w-14 sm:h-14 bg-primary-400/20 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`transition-all duration-1000 ${
          isVisible ? 'animate-fade-in' : 'opacity-0'
        }`}>
          {/* News & Events Badge */}
          <div className={`inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-accent-gold/20 to-accent-teal/20 backdrop-blur-md border border-white/20 rounded-full mb-6 sm:mb-8 transition-all duration-700 delay-200 ${
            isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
          }`}>
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-accent-gold mr-2 sm:mr-3" />
            <span className="text-white font-semibold text-base sm:text-lg">News & Events Portal</span>
          </div>

          <h1 className={`font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight transition-all duration-700 delay-400 ${
            isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
          }`}>
            Stay Connected
          </h1>
          <h2 className={`font-playfair text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-accent-gold mb-4 sm:mb-6 leading-tight transition-all duration-700 delay-600 ${
            isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
          }`}>
            Latest Updates & Events
          </h2>
          <p className={`font-poppins text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-4 transition-all duration-700 delay-800 ${
            isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
          }`}>
            Discover the latest news, achievements, events, and announcements from Sardar Patel Institute of Technology. Stay informed about our academic excellence and institutional developments.
          </p>
          
          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-12 sm:mb-16 px-4 transition-all duration-700 delay-1000 ${
            isVisible ? 'animate-fade-in' : 'opacity-0'
          }`}>
            <button
              onClick={scrollToNewsEvents}
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-accent-gold to-accent-gold/90 hover:from-accent-gold/90 hover:to-accent-gold text-dark-900 font-semibold text-base sm:text-lg rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group w-full sm:w-auto"
            >
              <Newspaper className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 group-hover:rotate-12 transition-transform duration-300" />
              Latest News
            </button>
            <button
              onClick={scrollToNewsEvents}
              className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-accent-teal to-accent-teal/90 hover:from-accent-teal/90 hover:to-accent-teal text-white font-semibold text-base sm:text-lg rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-xl group w-full sm:w-auto"
            >
              <Calendar className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 group-hover:rotate-12 transition-transform duration-300" />
              Upcoming Events
            </button>
          </div>

          {/* Quick Stats */}
          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto px-4 transition-all duration-700 delay-1200 ${
            isVisible ? 'animate-fade-in' : 'opacity-0'
          }`}>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 sm:p-6 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center justify-center mb-2 sm:mb-3">
                <div className="p-2 sm:p-3 bg-accent-gold/20 rounded-lg">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-accent-gold" />
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">50+</h3>
              <p className="text-gray-300 text-sm sm:text-base">Achievements</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 sm:p-6 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center justify-center mb-2 sm:mb-3">
                <div className="p-2 sm:p-3 bg-accent-teal/20 rounded-lg">
                  <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-accent-teal" />
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">100+</h3>
              <p className="text-gray-300 text-sm sm:text-base">Events Annually</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-4 sm:p-6 hover:bg-white/15 transition-all duration-300 sm:col-span-1 col-span-1">
              <div className="flex items-center justify-center mb-2 sm:mb-3">
                <div className="p-2 sm:p-3 bg-accent-purple/20 rounded-lg">
                  <Newspaper className="w-5 h-5 sm:w-6 sm:h-6 text-accent-purple" />
                </div>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">200+</h3>
              <p className="text-gray-300 text-sm sm:text-base">News Updates</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce transition-all duration-700 delay-1400 ${
        isVisible ? 'animate-fade-in' : 'opacity-0'
      }`}>
        <div 
          className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white rounded-full flex justify-center cursor-pointer hover:border-accent-gold transition-colors duration-300" 
          onClick={scrollToNewsEvents}
        >
          <div className="w-1 h-2 sm:h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};