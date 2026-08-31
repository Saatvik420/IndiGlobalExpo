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
    title: 'India-ASEAN Global Confluence 2027',
    subtitle: 'Bangkok, Thailand • Jan 21-22, 2027',
    category: 'Official Banner',
    description: 'Strengthening India–ASEAN Partnership in Trade, Investment, Innovation & Growth',
    image: bannerImg,
    badge: 'Event Overview',
  },
  {
    id: 'glance',
    title: 'Confluence at a Glance',
    subtitle: 'Scale, Reach & Projected Impact',
    category: 'Key Metrics',
    description: '50+ Exhibitors, 500+ B2B Visitors, 25+ Knowledge Sessions, 200+ Global Leaders & 100x PR Value',
    image: glanceImg,
    badge: 'Metrics & Scale',
  },
  {
    id: 'priorities',
    title: 'Strategic Priorities',
    subtitle: 'Bilateral & Regional Economic Growth',
    category: 'Strategic Focus',
    description: 'Key deliberations on Cross-Border Partnerships, Green Energy, Supply Chains & MSME Ecosystems',
    image: prioritiesImg,
    badge: 'Strategic Vision',
  },
  {
    id: 'sectors',
    title: 'Key Industry Sectors',
    subtitle: 'Distinguished Participation & Exhibits',
    category: 'Industry Scope',
    description: 'AI & Tech, Smart Cities, Renewable Energy, Healthcare, Manufacturing & Logistics',
    image: sectorsImg,
    badge: 'Sectors & Domains',
  },
  {
    id: 'benefits',
    title: 'Benefits of Participation',
    subtitle: 'Unrivalled Global Business Advantage',
    category: 'Participation Value',
    description: 'Keynote Addresses, Dedicated Booths, Global Media Outreach & Strategic Alliances',
    image: benefitsImg,
    badge: 'Exhibitor Benefits',
  },
];

const EventShowcaseSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [modalImage, setModalImage] = useState(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [touchStart, setTouchStart] = useState(null);
  const autoPlayRef = useRef(null);
  const containerRef = useRef(null);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % slidesData.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + slidesData.length) % slidesData.length);
  }, []);

  // Autoplay handler
  useEffect(() => {
    if (isPlaying && !isHovered && !modalImage) {
      autoPlayRef.current = setInterval(() => {
        nextSlide();
      }, 5500);
    }
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

  // Mouse tilt parallax on the active card
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Touch Swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 50) nextSlide();
    if (diff < -50) prevSlide();
    setTouchStart(null);
  };

  return (
    <section className="relative z-20 py-20 md:py-28 bg-gradient-to-b from-[#fafafa] via-white to-[#f5f5f5] overflow-hidden border-b border-gray-200/80">
      {/* Subtle Luxury Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-brand-accent/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/5 rounded-full blur-2xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/[0.02] rounded-full blur-2xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16 reveal-up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-[11px] font-bold uppercase tracking-widest mb-4 shadow-xs">
            <i className="ph-fill ph-sparkle text-xs animate-spin-slow"></i>
            <span>Confluence 2027 Highlights</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-brand-dark font-bold tracking-tight leading-tight mb-4">
            India–ASEAN Global <span className="italic font-light text-brand-accent">Confluence 2027</span>
          </h2>
          <p className="text-gray-500 font-light text-sm sm:text-base leading-relaxed">
            Explore the official event presentation, scale metrics, strategic focus areas, and valuable participant opportunities.
          </p>
        </div>

        {/* Category Pills Navigation */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-10 md:mb-14 reveal-up delay-100">
          {slidesData.map((slide, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={slide.id}
                onClick={() => setActiveIndex(idx)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-all duration-300 interactive flex items-center gap-2 ${
                  isActive
                    ? 'bg-brand-dark text-white shadow-lg shadow-brand-dark/15 scale-105 border border-brand-dark'
                    : 'bg-white/80 text-gray-600 hover:text-brand-dark hover:bg-white border border-gray-200/90 hover:border-brand-accent/50'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-brand-accent' : 'bg-gray-300'}`}></span>
                {slide.category}
              </button>
            );
          })}
        </div>

        {/* 3D Showcase Stage */}
        <div
          ref={containerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => {
            setIsHovered(false);
            handleMouseLeave();
          }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative min-h-[460px] sm:min-h-[540px] md:min-h-[620px] flex items-center justify-center my-4 reveal-up delay-200"
          style={{ perspective: '1400px' }}
        >
          {slidesData.map((slide, idx) => {
            const total = slidesData.length;
            let offset = (idx - activeIndex + total) % total;
            if (offset > total / 2) offset -= total;

            const isCurrent = offset === 0;
            const isPrev = offset === -1;
            const isNext = offset === 1;

            // 3D Matrix Transformations
            let transformStyle = '';
            let opacity = 0;
            let zIndex = 0;
            let pointerEvents = 'none';

            if (isCurrent) {
              transformStyle = `translateX(0%) translateZ(80px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(1)`;
              opacity = 1;
              zIndex = 30;
              pointerEvents = 'auto';
            } else if (isPrev) {
              transformStyle = 'translateX(-58%) translateZ(-90px) rotateY(26deg) scale(0.82)';
              opacity = 0.6;
              zIndex = 20;
              pointerEvents = 'auto';
            } else if (isNext) {
              transformStyle = 'translateX(58%) translateZ(-90px) rotateY(-26deg) scale(0.82)';
              opacity = 0.6;
              zIndex = 20;
              pointerEvents = 'auto';
            } else if (offset < 0) {
              transformStyle = 'translateX(-95%) translateZ(-200px) rotateY(40deg) scale(0.65)';
              opacity = 0;
              zIndex = 10;
            } else {
              transformStyle = 'translateX(95%) translateZ(-200px) rotateY(-40deg) scale(0.65)';
              opacity = 0;
              zIndex = 10;
            }

            return (
              <div
                key={slide.id}
                onClick={() => {
                  if (!isCurrent) setActiveIndex(idx);
                }}
                onMouseMove={isCurrent ? handleMouseMove : undefined}
                className="absolute top-1/2 left-1/2 w-[90%] sm:w-[75%] md:w-[620px] lg:w-[680px] -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] origin-center select-none"
                style={{
                  transform: `translate(-50%, -50%) ${transformStyle}`,
                  opacity,
                  zIndex,
                  pointerEvents,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Main 3D Card Container */}
                <div
                  className={`group relative rounded-2xl md:rounded-3xl bg-white p-3 sm:p-5 md:p-6 transition-all duration-500 ${
                    isCurrent
                      ? 'shadow-[0_25px_60px_-15px_rgba(0,0,0,0.18),0_10px_20px_-5px_rgba(207,166,112,0.15)] border-2 border-brand-accent/40 ring-4 ring-brand-accent/5'
                      : 'shadow-lg border border-gray-200/90 hover:opacity-90 cursor-pointer'
                  }`}
                >
                  {/* Top Bar inside Card */}
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="flex h-2 w-2 relative">
                        {isCurrent && (
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
                        )}
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
                      </span>
                      <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-brand-dark">
                        {slide.badge}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-gray-400 font-mono font-medium">
                        0{idx + 1} / 0{total}
                      </span>
                      {isCurrent && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setModalImage(slide);
                          }}
                          className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-brand-dark transition-colors interactive"
                          title="Click to expand fullscreen"
                        >
                          <i className="ph ph-arrows-out-simple text-sm sm:text-base"></i>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Image Display Area */}
                  <div
                    onClick={() => isCurrent && setModalImage(slide)}
                    className={`relative w-full h-[320px] sm:h-[400px] md:h-[450px] bg-gradient-to-b from-gray-50/50 to-gray-100/50 rounded-xl overflow-hidden flex items-center justify-center p-2 sm:p-4 border border-gray-100/80 ${
                      isCurrent ? 'cursor-zoom-in group/img' : ''
                    }`}
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="max-h-full max-w-full object-contain rounded-lg drop-shadow-md transition-transform duration-500 group-hover/img:scale-[1.02]"
                      loading="lazy"
                    />

                    {/* Hover Overlay Hint for Active Card */}
                    {isCurrent && (
                      <div className="absolute inset-0 bg-brand-dark/20 backdrop-blur-[2px] opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white text-xs font-semibold uppercase tracking-wider rounded-xl">
                        <i className="ph-fill ph-magnifying-glass-plus text-lg text-brand-accent"></i>
                        <span>Click to Enlarge</span>
                      </div>
                    )}
                  </div>

                  {/* Bottom Information */}
                  <div className="pt-3 sm:pt-4 text-center">
                    <h3 className="font-serif text-lg sm:text-xl md:text-2xl text-brand-dark font-bold mb-1">
                      {slide.title}
                    </h3>
                    <p className="text-gray-500 text-xs sm:text-sm font-light line-clamp-1">
                      {slide.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Bottom Controls & Progress Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-6 max-w-4xl mx-auto pt-6 border-t border-gray-200/70 reveal-up delay-300">
          {/* Navigation Buttons */}
          <div className="flex items-center gap-3 order-2 sm:order-1">
            <button
              onClick={prevSlide}
              aria-label="Previous Slide"
              className="w-11 h-11 rounded-full bg-white border border-gray-200/90 text-brand-dark hover:border-brand-accent hover:bg-brand-accent hover:text-white transition-all duration-300 shadow-sm flex items-center justify-center interactive group hover:-translate-x-0.5"
            >
              <i className="ph ph-caret-left text-lg font-bold group-hover:scale-110 transition-transform"></i>
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? 'Pause Autoplay' : 'Resume Autoplay'}
              className="px-3.5 h-11 rounded-full bg-white border border-gray-200/90 text-gray-600 hover:text-brand-dark hover:border-brand-dark transition-all duration-300 shadow-sm flex items-center gap-1.5 text-xs font-semibold interactive"
            >
              <i className={`ph-fill ${isPlaying ? 'ph-pause' : 'ph-play'} text-brand-accent text-xs`}></i>
              <span className="text-[11px] uppercase tracking-wider">{isPlaying ? 'Pause' : 'Play'}</span>
            </button>

            <button
              onClick={nextSlide}
              aria-label="Next Slide"
              className="w-11 h-11 rounded-full bg-white border border-gray-200/90 text-brand-dark hover:border-brand-accent hover:bg-brand-accent hover:text-white transition-all duration-300 shadow-sm flex items-center justify-center interactive group hover:translate-x-0.5"
            >
              <i className="ph ph-caret-right text-lg font-bold group-hover:scale-110 transition-transform"></i>
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2 order-1 sm:order-2">
            {slidesData.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2.5 rounded-full transition-all duration-500 interactive ${
                  idx === activeIndex
                    ? 'w-8 bg-brand-accent shadow-sm'
                    : 'w-2.5 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>

          {/* Active Title Indicator */}
          <div className="text-right hidden sm:block order-3">
            <span className="text-[10px] uppercase tracking-widest text-brand-accent font-bold block">
              Slide 0{activeIndex + 1} of 0{slidesData.length}
            </span>
            <span className="text-xs text-brand-dark font-medium">
              {slidesData[activeIndex].category}
            </span>
          </div>
        </div>
      </div>

      {/* High-Resolution Zoom Lightbox Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={() => setModalImage(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden shadow-2xl p-4 sm:p-6 flex flex-col items-center border border-white/20 animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="w-full flex items-center justify-between pb-4 border-b border-gray-100 mb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-accent block mb-0.5">
                  {modalImage.category}
                </span>
                <h4 className="font-serif text-xl sm:text-2xl text-brand-dark font-bold">
                  {modalImage.title}
                </h4>
              </div>
              <button
                onClick={() => setModalImage(null)}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-brand-dark hover:text-white text-gray-600 transition-colors flex items-center justify-center interactive shadow-sm"
                aria-label="Close modal"
              >
                <i className="ph ph-x text-lg"></i>
              </button>
            </div>

            {/* Modal Content / High-Res Image */}
            <div className="relative w-full flex-1 min-h-[300px] max-h-[68vh] overflow-auto flex items-center justify-center p-2 bg-gray-50/70 rounded-xl">
              <img
                src={modalImage.image}
                alt={modalImage.title}
                className="max-h-full max-w-full object-contain rounded-lg shadow-md"
              />
            </div>

            {/* Modal Footer */}
            <div className="w-full pt-4 mt-2 text-center text-xs text-gray-500 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-2">
              <p className="font-light">{modalImage.description}</p>
              <span className="text-[11px] text-gray-400">Press ESC or click anywhere outside to close</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EventShowcaseSlider;
