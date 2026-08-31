import { useState, useEffect, useRef, useCallback } from 'react';

// Slide Images from assets/slides
import bannerImg from '../../assets/slides/banner.png';
import glanceImg from '../../assets/slides/Screenshot 2026-08-30 124544.png';
import prioritiesImg from '../../assets/slides/Screenshot 2026-08-30 124943.png';
import sectorsImg from '../../assets/slides/Screenshot 2026-08-30 124921.png';
import benefitsImg from '../../assets/slides/Screenshot 2026-08-30 124629.png';

const slidesData = [
  {
    id: 'banner',
    title: 'India–ASEAN Global Confluence 2027',
    category: 'Official Banner',
    badge: 'Event Overview',
    caption: 'Strengthening India–ASEAN Partnership: Trade, Investment, Innovation & Sustainable Growth • Jan 21-22, 2027 | Bangkok, Thailand',
    image: bannerImg,
  },
  {
    id: 'glance',
    title: 'Confluence at a Glance',
    category: 'Key Metrics',
    badge: 'Scale & Numbers',
    caption: '50+ Exhibitors • 500+ B2B Trade Visitors • 25+ Knowledge Sessions • 200+ Global Leaders • 100x PR Value',
    image: glanceImg,
  },
  {
    id: 'priorities',
    title: 'Strategic Priorities',
    category: 'Strategic Vision',
    badge: 'Core Objectives',
    caption: 'Bilateral Trade, Cross-Border Investments, Supply-Chain Resilience, Digital Economy & Green Growth Initiatives',
    image: prioritiesImg,
  },
  {
    id: 'sectors',
    title: 'Key Industry Sectors',
    category: 'Industry Focus',
    badge: 'Participating Sectors',
    caption: 'AI & Technology, Smart Infrastructure, Renewable Energy, Healthcare & Life Sciences, Manufacturing & Logistics',
    image: sectorsImg,
  },
  {
    id: 'benefits',
    title: 'Benefits of Participation',
    category: 'Participant Value',
    badge: 'Exhibitor Benefits',
    caption: 'Keynote Addresses, Dedicated Booths, Direct Access to Decision-Makers, Global Brand Visibility & Strategic Alliances',
    image: benefitsImg,
  },
];

const EventShowcaseSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [modalImage, setModalImage] = useState(null);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [progress, setProgress] = useState(0);

  const autoPlayRef = useRef(null);
  const slideDuration = 5500; // 5.5s per slide

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % slidesData.length);
    setProgress(0);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + slidesData.length) % slidesData.length);
    setProgress(0);
  }, []);

  const goToSlide = (idx) => {
    setActiveIndex(idx);
    setProgress(0);
  };

  // Autoplay & Progress timer
  useEffect(() => {
    if (!isPlaying || isHovered || modalImage) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      return;
    }

    const step = 50;
    autoPlayRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + (step / slideDuration) * 100;
      });
    }, step);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPlaying, isHovered, modalImage, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (modalImage) {
        if (e.key === 'Escape') setModalImage(null);
        return;
      }
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide, modalImage]);

  // Touch Swipe for mobile
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
    setTouchEnd(null);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const diff = touchStart - touchEnd;
    if (diff > 40) nextSlide();
    if (diff < -40) prevSlide();
    setTouchStart(null);
    setTouchEnd(null);
  };

  const currentSlide = slidesData[activeIndex];

  return (
    <section className="relative z-20 py-20 md:py-28 bg-gradient-to-b from-[#fcfcfc] via-white to-[#f7f7f7] border-y border-gray-200/70 overflow-hidden">
      {/* Subtle Background Glow Mesh */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-accent/5 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Heading Details */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12 reveal-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/25 text-brand-accent text-[11px] font-bold uppercase tracking-widest mb-4 shadow-xs">
            <i className="ph-fill ph-presentation text-xs"></i>
            <span>Official Event Presentation</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-brand-dark font-bold leading-tight mb-4">
            India–ASEAN Global <span className="italic font-light text-brand-accent">Confluence 2027</span>
          </h2>

          <p className="text-gray-500 font-light text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
            Official conference deck, event highlights, sector verticals, and strategic bilateral opportunities.
          </p>
        </div>

        {/* Centered Category Tabs right below Heading */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-8 md:mb-10 reveal-up delay-100">
          {slidesData.map((slide, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={slide.id}
                onClick={() => goToSlide(idx)}
                className={`px-4 sm:px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 interactive flex items-center gap-2 ${
                  isActive
                    ? 'bg-brand-dark text-white shadow-md scale-105 border border-brand-dark'
                    : 'bg-white text-gray-600 hover:text-brand-dark hover:bg-gray-50 border border-gray-200 hover:border-brand-accent/40'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-brand-accent' : 'bg-gray-300'}`}></span>
                <span>{slide.category}</span>
              </button>
            );
          })}
        </div>

        {/* Centered Banner Showcase Stage */}
        <div
          className="relative max-w-4xl mx-auto reveal-up delay-200"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main Centered Card Frame */}
          <div className="relative rounded-2xl md:rounded-3xl bg-white p-3 sm:p-5 md:p-6 border border-gray-200/90 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1),0_10px_25px_rgba(207,166,112,0.08)] group">
            
            {/* Top Bar inside Banner Card */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3 px-2">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
                <span className="text-[11px] font-bold uppercase tracking-widest text-brand-dark">
                  {currentSlide.badge}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-bold text-gray-400">
                  0{activeIndex + 1} / 0{slidesData.length}
                </span>
                <button
                  onClick={() => setModalImage(currentSlide)}
                  className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-brand-dark transition-colors interactive flex items-center gap-1 text-xs font-medium"
                  title="Enlarge slide"
                >
                  <i className="ph ph-arrows-out-simple text-sm"></i>
                  <span className="hidden sm:inline text-[11px] uppercase tracking-wider font-semibold">Zoom</span>
                </button>
              </div>
            </div>

            {/* Centered Banner Image Container with Smooth Slide Animation */}
            <div
              onClick={() => setModalImage(currentSlide)}
              className="relative w-full h-[320px] sm:h-[420px] md:h-[500px] lg:h-[540px] bg-gradient-to-b from-gray-50 via-white to-gray-50 rounded-xl overflow-hidden flex items-center justify-center p-2 sm:p-4 border border-gray-100 cursor-zoom-in group/img"
            >
              <img
                key={currentSlide.id}
                src={currentSlide.image}
                alt={currentSlide.title}
                className="max-h-full max-w-full object-contain mx-auto rounded-lg drop-shadow-md transition-all duration-500 group-hover/img:scale-[1.01] animate-fade-in"
                loading="lazy"
              />

              {/* Hover Zoom Hint */}
              <div className="absolute inset-0 bg-brand-dark/20 backdrop-blur-[2px] opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 rounded-xl flex items-center justify-center gap-2 text-white text-xs font-bold uppercase tracking-wider pointer-events-none">
                <i className="ph-fill ph-magnifying-glass-plus text-xl text-brand-accent"></i>
                <span>Click to View Fullscreen</span>
              </div>
            </div>

            {/* Centered Caption & Title Below Image */}
            <div className="pt-4 sm:pt-5 text-center px-2">
              <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-brand-dark mb-1.5">
                {currentSlide.title}
              </h3>
              <p className="text-gray-500 text-xs sm:text-sm font-light max-w-2xl mx-auto leading-relaxed">
                {currentSlide.caption}
              </p>
            </div>

            {/* Left & Right Floating Navigation Arrows on the card */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              aria-label="Previous slide"
              className="absolute left-2 sm:-left-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-gray-200 text-brand-dark shadow-lg hover:bg-brand-accent hover:border-brand-accent hover:text-white transition-all duration-300 flex items-center justify-center interactive z-20 group hover:-translate-x-1"
            >
              <i className="ph ph-caret-left text-lg font-bold group-hover:scale-110 transition-transform"></i>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              aria-label="Next slide"
              className="absolute right-2 sm:-right-6 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border border-gray-200 text-brand-dark shadow-lg hover:bg-brand-accent hover:border-brand-accent hover:text-white transition-all duration-300 flex items-center justify-center interactive z-20 group hover:translate-x-1"
            >
              <i className="ph ph-caret-right text-lg font-bold group-hover:scale-110 transition-transform"></i>
            </button>

          </div>

          {/* Centered Controls, Dots & Autoplay Bar Below */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
            
            {/* Play/Pause Button */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
              className="px-3.5 py-1.5 rounded-full bg-white border border-gray-200 text-gray-600 hover:text-brand-dark hover:border-brand-dark transition-all duration-300 shadow-xs flex items-center gap-1.5 text-xs font-semibold interactive"
            >
              <i className={`ph-fill ${isPlaying ? 'ph-pause' : 'ph-play'} text-brand-accent text-xs`}></i>
              <span className="uppercase tracking-wider text-[10px]">{isPlaying ? 'Pause' : 'Play'}</span>
            </button>

            {/* Centered Indicator Dots */}
            <div className="flex items-center gap-2">
              {slidesData.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-400 interactive ${
                    idx === activeIndex
                      ? 'w-8 bg-brand-accent shadow-xs'
                      : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            {/* Slide Category Label */}
            <div className="text-right hidden sm:block">
              <span className="text-[10px] uppercase tracking-widest text-brand-accent font-bold">
                Slide 0{activeIndex + 1} of 0{slidesData.length}
              </span>
            </div>

          </div>

          {/* Centered Subtle Autoplay Progress Bar */}
          <div className="mt-4 max-w-md mx-auto bg-gray-100 h-1 rounded-full overflow-hidden">
            <div 
              className="bg-brand-accent h-full transition-all duration-75 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

        </div>

      </div>

      {/* Fullscreen High-Resolution Lightbox Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={() => setModalImage(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[92vh] bg-white rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6 md:p-8 flex flex-col items-center border border-white/20 animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Top Header */}
            <div className="w-full flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-widest text-brand-accent block mb-0.5">
                  {modalImage.category}
                </span>
                <h4 className="font-serif text-xl sm:text-2xl text-brand-dark font-bold">
                  {modalImage.title}
                </h4>
              </div>
              <button
                onClick={() => setModalImage(null)}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-brand-dark hover:text-white text-gray-700 transition-colors flex items-center justify-center interactive shadow-xs"
                aria-label="Close dialog"
              >
                <i className="ph ph-x text-lg"></i>
              </button>
            </div>

            {/* High Resolution Image Viewport */}
            <div className="relative w-full flex-1 min-h-[300px] max-h-[68vh] overflow-auto flex items-center justify-center p-2 bg-gray-50/80 rounded-2xl">
              <img
                src={modalImage.image}
                alt={modalImage.title}
                className="max-h-full max-w-full object-contain rounded-xl shadow-lg"
              />
            </div>

            {/* Modal Bottom Details */}
            <div className="w-full pt-4 mt-2 text-center text-xs text-gray-500 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-2">
              <p className="font-light">{modalImage.caption}</p>
              <span className="text-[11px] text-gray-400">Click anywhere outside or press ESC to dismiss</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EventShowcaseSlider;
