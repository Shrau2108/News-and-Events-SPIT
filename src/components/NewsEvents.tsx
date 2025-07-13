import React, { useState, useEffect } from 'react';
import { Calendar, Clock, ChevronLeft, ChevronRight, Filter, Search, Newspaper, Users, Award, TrendingUp } from 'lucide-react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  year: string;
  category: 'news' | 'event';
  type: 'academic' | 'research' | 'student' | 'achievement' | 'collaboration';
  image: string;
  featured?: boolean;
  tags: string[];
}

const newsEventsData: NewsItem[] = [
  // 2025 Data
  {
    id: '2025-1',
    title: 'SPIT Achieves NIRF Ranking Excellence 2025',
    excerpt: 'Outstanding performance in National Institutional Ranking Framework with significant improvements across all parameters.',
    content: 'Sardar Patel Institute of Technology has achieved remarkable success in the NIRF Rankings 2025, showcasing excellence in teaching, research, and industry collaboration.',
    date: '2025-01-15',
    year: '2025',
    category: 'news',
    type: 'achievement',
    image: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg',
    featured: true,
    tags: ['NIRF', 'Rankings', 'Excellence', 'Achievement']
  },
  {
    id: '2025-2',
    title: 'International Research Symposium 2025',
    excerpt: 'Annual research symposium bringing together global experts in technology and innovation.',
    content: 'Three-day international symposium featuring cutting-edge research presentations, workshops, and networking opportunities.',
    date: '2025-03-20',
    year: '2025',
    category: 'event',
    type: 'research',
    image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg',
    featured: true,
    tags: ['Research', 'International', 'Symposium', 'Innovation']
  },
  {
    id: '2025-3',
    title: 'New AI and Machine Learning Center Inauguration',
    excerpt: 'State-of-the-art AI research center equipped with latest technology and computing infrastructure.',
    content: 'The new AI and ML center will serve as a hub for cutting-edge research and industry collaboration.',
    date: '2025-02-10',
    year: '2025',
    category: 'news',
    type: 'academic',
    image: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg',
    featured: false,
    tags: ['AI', 'Machine Learning', 'Technology', 'Infrastructure']
  },

  // 2024 Data
  {
    id: '2024-1',
    title: 'SPIT Students Win National Hackathon 2024',
    excerpt: 'Team of computer engineering students secured first place in prestigious national level coding competition.',
    content: 'Our students demonstrated exceptional problem-solving skills and innovative thinking in the 48-hour hackathon challenge.',
    date: '2024-11-15',
    year: '2024',
    category: 'news',
    type: 'achievement',
    image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg',
    featured: true,
    tags: ['Hackathon', 'Students', 'Achievement', 'Coding']
  },
  {
    id: '2024-2',
    title: 'Industry Partnership Summit 2024',
    excerpt: 'Annual summit connecting academia with industry leaders for collaborative research and placement opportunities.',
    content: 'Over 50 industry partners participated in this years summit, creating new avenues for student internships and research projects.',
    date: '2024-09-25',
    year: '2024',
    category: 'event',
    type: 'collaboration',
    image: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg',
    featured: false,
    tags: ['Industry', 'Partnership', 'Collaboration', 'Placement']
  },
  {
    id: '2024-3',
    title: 'Research Paper Published in Nature Communications',
    excerpt: 'Faculty research on sustainable energy solutions published in prestigious international journal.',
    content: 'Groundbreaking research in renewable energy systems gains international recognition and citation.',
    date: '2024-07-30',
    year: '2024',
    category: 'news',
    type: 'research',
    image: 'https://images.pexels.com/photos/414837/pexels-photo-414837.jpeg',
    featured: false,
    tags: ['Research', 'Publication', 'Sustainability', 'Energy']
  },

  // 2023 Data
  {
    id: '2023-1',
    title: 'Smart Campus Initiative Launch',
    excerpt: 'Implementation of IoT-based smart campus solutions for enhanced student experience and energy efficiency.',
    content: 'Comprehensive smart campus project featuring automated systems, energy management, and digital services.',
    date: '2023-08-15',
    year: '2023',
    category: 'news',
    type: 'academic',
    image: 'https://images.pexels.com/photos/256417/pexels-photo-256417.jpeg',
    featured: true,
    tags: ['Smart Campus', 'IoT', 'Technology', 'Innovation']
  },
  {
    id: '2023-2',
    title: 'Annual Technical Festival - TechFest 2023',
    excerpt: 'Three-day technical extravaganza featuring competitions, workshops, and tech exhibitions.',
    content: 'Students from across the country participated in various technical competitions and interactive sessions.',
    date: '2023-10-20',
    year: '2023',
    category: 'event',
    type: 'student',
    image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg',
    featured: false,
    tags: ['TechFest', 'Competition', 'Students', 'Technical']
  },

  // 2022 Data
  {
    id: '2022-1',
    title: 'SPIT Receives Excellence in Engineering Education Award',
    excerpt: 'Recognition for outstanding contribution to engineering education and student development.',
    content: 'The award acknowledges our commitment to quality education, research excellence, and industry readiness.',
    date: '2022-12-10',
    year: '2022',
    category: 'news',
    type: 'achievement',
    image: 'https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg',
    featured: true,
    tags: ['Award', 'Excellence', 'Education', 'Recognition']
  },
  {
    id: '2022-2',
    title: 'International Conference on Emerging Technologies',
    excerpt: 'Global conference bringing together researchers and industry experts to discuss future technologies.',
    content: 'Two-day international conference featuring keynote speakers, research presentations, and panel discussions.',
    date: '2022-05-15',
    year: '2022',
    category: 'event',
    type: 'research',
    image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg',
    featured: false,
    tags: ['Conference', 'International', 'Technology', 'Research']
  },

  // 2021 Data
  {
    id: '2021-1',
    title: 'Virtual Learning Platform Launch',
    excerpt: 'Launch of comprehensive online learning platform with advanced features for remote education.',
    content: 'State-of-the-art virtual learning environment ensuring continuity of quality education during challenging times.',
    date: '2021-08-20',
    year: '2021',
    category: 'news',
    type: 'academic',
    image: 'https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg',
    featured: false,
    tags: ['Virtual Learning', 'Online Education', 'Technology', 'Innovation']
  },
  {
    id: '2021-2',
    title: 'Student Innovation Challenge 2021',
    excerpt: 'Annual innovation challenge encouraging students to develop solutions for real-world problems.',
    content: 'Students presented innovative projects addressing social, environmental, and technological challenges.',
    date: '2021-11-30',
    year: '2021',
    category: 'event',
    type: 'student',
    image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg',
    featured: false,
    tags: ['Innovation', 'Student Projects', 'Challenge', 'Solutions']
  },

  // 2020 Data
  {
    id: '2020-1',
    title: 'SPIT Adapts to Digital Transformation',
    excerpt: 'Successful transition to digital learning and remote collaboration during unprecedented times.',
    content: 'Comprehensive digital transformation ensuring uninterrupted academic progress and student engagement.',
    date: '2020-06-15',
    year: '2020',
    category: 'news',
    type: 'academic',
    image: 'https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg',
    featured: false,
    tags: ['Digital Transformation', 'Remote Learning', 'Adaptation', 'Technology']
  },
  {
    id: '2020-2',
    title: 'COVID-19 Research Initiative',
    excerpt: 'Faculty and students collaborate on research projects addressing pandemic challenges.',
    content: 'Multidisciplinary research efforts focusing on healthcare technology, data analysis, and social impact.',
    date: '2020-09-10',
    year: '2020',
    category: 'event',
    type: 'research',
    image: 'https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg',
    featured: false,
    tags: ['COVID-19', 'Research', 'Healthcare', 'Collaboration']
  }
];

const years = ['2025', '2024', '2023', '2022', '2021', '2020'];
const categories = ['all', 'news', 'event'];
const types = ['all', 'academic', 'research', 'student', 'achievement', 'collaboration'];

export const NewsEvents: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver();
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [expandedYears, setExpandedYears] = useState<Set<string>>(new Set(['2025']));
  const [currentSlide, setCurrentSlide] = useState(0);

  // Filter featured items for carousel
  const featuredItems = newsEventsData.filter(item => item.featured);

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredItems.length]);

  // Filter data based on selected filters
  const filteredData = newsEventsData.filter(item => {
    const matchesYear = selectedYear === 'all' || item.year === selectedYear;
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesType = selectedType === 'all' || item.type === selectedType;
    const matchesSearch = searchTerm === '' || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesYear && matchesCategory && matchesType && matchesSearch;
  });

  // Group filtered data by year
  const groupedData = years.reduce((acc, year) => {
    acc[year] = filteredData.filter(item => item.year === year);
    return acc;
  }, {} as Record<string, NewsItem[]>);

  const toggleYearExpansion = (year: string) => {
    const newExpanded = new Set(expandedYears);
    if (newExpanded.has(year)) {
      newExpanded.delete(year);
    } else {
      newExpanded.add(year);
    }
    setExpandedYears(newExpanded);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredItems.length) % featuredItems.length);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'news': return <Newspaper className="w-4 h-4" />;
      case 'event': return <Calendar className="w-4 h-4" />;
      default: return <TrendingUp className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'academic': return 'bg-primary-600';
      case 'research': return 'bg-accent-teal';
      case 'student': return 'bg-accent-purple';
      case 'achievement': return 'bg-accent-gold';
      case 'collaboration': return 'bg-primary-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <section 
      id="news-events"
      ref={ref}
      className={`py-12 sm:py-16 lg:py-20 xl:py-24 bg-gradient-to-br from-gray-50 to-white dark:from-dark-900 dark:to-dark-800 transition-all duration-700 ${
        isVisible ? 'animate-fade-in' : 'opacity-0'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
        {/* Header */}
        <div className={`text-center mb-8 sm:mb-12 lg:mb-16 transition-all duration-700 delay-200 ${
          isVisible ? 'animate-slide-up' : 'opacity-0 translate-y-8'
        }`}>
          <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-accent-gold/20 to-accent-teal/20 backdrop-blur-md border border-accent-gold/30 rounded-full mb-4 sm:mb-6">
            <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-accent-gold mr-2 sm:mr-3" />
            <span className="text-gray-800 dark:text-white font-semibold text-base sm:text-lg">News & Events</span>
          </div>
          <h2 className="font-playfair text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4 px-4">
            Latest Updates & Announcements
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
            Stay updated with the latest news, achievements, events, and developments at Sardar Patel Institute of Technology
          </p>
        </div>

        {/* Featured Carousel */}
        {featuredItems.length > 0 && (
          <div className={`mb-8 sm:mb-12 lg:mb-16 transition-all duration-700 delay-400 ${
            isVisible ? 'animate-fade-in' : 'opacity-0'
          }`}>
            <div className="relative bg-white dark:bg-dark-800 rounded-2xl shadow-xl border border-gray-200 dark:border-dark-700 overflow-hidden">
              <div className="bg-gradient-to-r from-primary-600 to-accent-teal p-4 sm:p-6">
                <h3 className="font-playfair text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
                  Featured Highlights
                </h3>
                <p className="text-primary-100 text-sm sm:text-base">
                  Showcasing our most significant achievements and upcoming events
                </p>
              </div>
              
              <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
                {featuredItems.map((item, index) => (
                  <div
                    key={item.id}
                    className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                      index === currentSlide 
                        ? 'opacity-100 translate-x-0' 
                        : index < currentSlide 
                          ? 'opacity-0 -translate-x-full' 
                          : 'opacity-0 translate-x-full'
                    }`}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 h-full min-h-0">
                      <div className="relative overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                        <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                          <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white ${getTypeColor(item.type)}`}>
                            {getCategoryIcon(item.category)}
                            <span className="ml-1 capitalize">{item.category}</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-4 sm:p-6 lg:p-8 flex flex-col justify-center">
                        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-3">
                          <Clock className="w-4 h-4" />
                          <time>{new Date(item.date).toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}</time>
                        </div>
                        <h4 className="font-playfair text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white mb-3 sm:mb-4">
                          {item.title}
                        </h4>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 mb-4 sm:mb-6 leading-relaxed">
                          {item.content}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {item.tags.slice(0, 3).map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-2 sm:px-3 py-1 bg-gray-100 dark:bg-dark-600 text-gray-700 dark:text-gray-300 text-xs sm:text-sm rounded-full"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Navigation Arrows */}
                <button
                  onClick={prevSlide}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-white transition-all duration-300"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-1.5 sm:p-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-full text-white transition-all duration-300"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
                
                {/* Slide Indicators */}
                <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2">
                  {featuredItems.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentSlide 
                          ? 'bg-white w-6 sm:w-8' 
                          : 'bg-white/50 hover:bg-white/75'
                      } ${index !== currentSlide ? 'w-2' : ''}`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className={`mb-8 sm:mb-12 transition-all duration-700 delay-600 ${
          isVisible ? 'animate-fade-in' : 'opacity-0'
        }`}>
          <div className="bg-white dark:bg-dark-800 rounded-xl shadow-lg border border-gray-200 dark:border-dark-700 p-4 sm:p-6">
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" />
              <h3 className="font-playfair text-lg sm:text-xl font-bold text-gray-900 dark:text-white">
                Filter & Search
              </h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search news & events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 sm:py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base"
                />
              </div>

              {/* Category Filter */}
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2.5 sm:py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>

              {/* Type Filter */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="px-4 py-2.5 sm:py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base"
              >
                {types.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>

              {/* Year Filter */}
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="px-4 py-2.5 sm:py-2 border border-gray-300 dark:border-dark-600 rounded-lg bg-white dark:bg-dark-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm sm:text-base"
              >
                <option value="all">All Years</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Year-based Content */}
        <div className={`transition-all duration-700 delay-800 ${
          isVisible ? 'animate-fade-in' : 'opacity-0'
        }`}>
          <div className="space-y-6">
            {years.map((year, yearIndex) => {
              const yearData = groupedData[year];
              if (yearData.length === 0 && selectedYear !== 'all') return null;
              
              return (
                <div
                  key={year}
                  className={`bg-white dark:bg-dark-800 rounded-xl shadow-lg border border-gray-200 dark:border-dark-700 overflow-hidden animate-scale-in ${
                    year === '2025' ? 'ring-2 ring-accent-gold/50' : ''
                  }`}
                  style={{ animationDelay: `${yearIndex * 100}ms` }}
                >
                  {/* Year Header */}
                  <button
                    onClick={() => toggleYearExpansion(year)}
                    className={`w-full p-4 sm:p-6 flex items-center justify-between transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-inset ${
                      year === '2025' 
                        ? 'bg-gradient-to-r from-accent-gold/10 to-accent-gold/20 dark:from-accent-gold/5 dark:to-accent-gold/10 hover:from-accent-gold/20 hover:to-accent-gold/30'
                        : 'bg-gradient-to-r from-gray-50 to-gray-100 dark:from-dark-700 dark:to-dark-600 hover:from-gray-100 hover:to-gray-200 dark:hover:from-dark-600 dark:hover:to-dark-500'
                    }`}
                  >
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                      <div className={`p-3 text-white rounded-lg transition-all duration-300 ${
                        year === '2025' ? 'bg-accent-gold' : 'bg-primary-600'
                      } flex-shrink-0`}>
                        <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <div className="text-left min-w-0 flex-1">
                        <h3 className="font-playfair text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2 flex-wrap">
                          {year}
                          {year === '2025' && (
                            <span className="text-xs sm:text-sm bg-accent-gold text-dark-900 px-2 py-1 rounded-full font-medium whitespace-nowrap">
                              Current
                            </span>
                          )}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400">
                          {yearData.length} {yearData.length === 1 ? 'item' : 'items'}
                        </p>
                      </div>
                    </div>
                    <div className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 flex-shrink-0 ${
                      expandedYears.has(year) ? 'rotate-45' : ''
                    }`}>
                      <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                  </button>

                  {/* Year Content */}
                  <div className={`transition-all duration-300 overflow-hidden ${
                    expandedYears.has(year) ? 'max-h-[5000px] opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-dark-600">
                      {yearData.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                          {yearData.map((item, itemIndex) => (
                            <div
                              key={item.id}
                              className="group bg-gradient-to-br from-white to-gray-50 dark:from-dark-700 dark:to-dark-600 rounded-xl border border-gray-200 dark:border-dark-600 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                              style={{ animationDelay: `${itemIndex * 100}ms` }}
                            >
                              <div className="relative h-40 sm:h-48 overflow-hidden flex-shrink-0">
                                <img
                                  src={item.image}
                                  alt={item.title}
                                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                                <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
                                  <div className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium text-white ${getTypeColor(item.type)}`}>
                                    {getCategoryIcon(item.category)}
                                    <span className="ml-1 capitalize">{item.category}</span>
                                  </div>
                                </div>
                                <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4">
                                  <div className="flex items-center gap-2 text-xs sm:text-sm text-white/90 mb-2">
                                    <Clock className="w-4 h-4" />
                                    <time>{new Date(item.date).toLocaleDateString('en-US', { 
                                      year: 'numeric', 
                                      month: 'short', 
                                      day: 'numeric' 
                                    })}</time>
                                  </div>
                                </div>
                              </div>
                              <div className="p-4 sm:p-6 flex-1 flex flex-col">
                                <h4 className="font-playfair text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300 line-clamp-2">
                                  {item.title}
                                </h4>
                                <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mb-4 line-clamp-3 flex-1">
                                  {item.excerpt}
                                </p>
                                <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-auto">
                                  {item.tags.slice(0, 2).map((tag, tagIndex) => (
                                    <span
                                      key={tagIndex}
                                      className="px-2 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300 text-xs rounded-full whitespace-nowrap"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 sm:py-12">
                          <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-gray-100 dark:bg-dark-600 rounded-full flex items-center justify-center">
                            <Search className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
                          </div>
                          <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-white mb-2">
                            No items found for {year}
                          </h3>
                          <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 px-4">
                            Try adjusting your search or filter criteria
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Summary Stats */}
        <div className={`mt-8 sm:mt-12 lg:mt-16 transition-all duration-700 delay-1000 ${
          isVisible ? 'animate-fade-in' : 'opacity-0'
        }`}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-4 sm:p-6 text-white">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <Newspaper className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="font-semibold text-sm sm:text-base">Total News</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold">
                {newsEventsData.filter(item => item.category === 'news').length}
              </div>
            </div>
            <div className="bg-gradient-to-r from-accent-teal to-accent-teal/90 rounded-xl p-4 sm:p-6 text-white">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="font-semibold text-sm sm:text-base">Total Events</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold">
                {newsEventsData.filter(item => item.category === 'event').length}
              </div>
            </div>
            <div className="bg-gradient-to-r from-accent-gold to-accent-gold/90 rounded-xl p-4 sm:p-6 text-white">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <Award className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="font-semibold text-sm sm:text-base">Achievements</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold">
                {newsEventsData.filter(item => item.type === 'achievement').length}
              </div>
            </div>
            <div className="bg-gradient-to-r from-accent-purple to-accent-purple/90 rounded-xl p-4 sm:p-6 text-white">
              <div className="flex items-center gap-2 sm:gap-3 mb-2">
                <Users className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="font-semibold text-sm sm:text-base">Research</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold">
                {newsEventsData.filter(item => item.type === 'research').length}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};