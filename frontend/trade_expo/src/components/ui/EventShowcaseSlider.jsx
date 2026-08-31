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
    tagline: 'A Premier International Trade & Investment Gateway',
    category: 'Official Banner',
    badge: 'Event Overview',
    highlights: [
      'Host City: Bangkok, Thailand',
      'Event Dates: January 21st & 22nd, 2027',
      'Focus: Trade, Investment, Innovation & Sustainable Growth',
    ],
    description:
      'Strengthening bilateral trade partnerships between Indian and ASEAN industries, creating global corridors for cross-border expansion.',
    image: bannerImg,
  },
  {
    id: 'glance',
    title: 'Confluence at a Glance',
    tagline: 'Scale, Participation & Projected Global Impact',
    category: 'Key Metrics',
    badge: 'Scale & Numbers',
    highlights: [
      '50+ Leading Global Exhibitors',
      '500+ Qualified B2B Trade Visitors',
      '25+ In-Depth Knowledge & Panel Sessions',
      '200+ International Leaders & 100x PR Value',
    ],
    description:
      'A high-density international congregation delivering unprecedented business exposure, direct B2B matchmaking, and multi-sector MOU signings.',
    image: glanceImg,
  },
  {
    id: 'priorities',
    title: 'Strategic Priorities',
    tagline: 'Actionable Pillars for Regional Economic Growth',
    category: 'Strategic Vision',
    badge: 'Core Objectives',
    highlights: [
      'Bilateral & Regional Trade & Investment',
      'Manufacturing, Supply-Chain & Infrastructure Cooperation',
      'Tech, Digital Economy & Innovation Alliances',
      'Green Initiatives & Startup Ecosystem Integration',
    ],
    description:
      'Facilitating high-level institutional cooperation, policymaker dialogues, and cross-border ventures across essential economic drivers.',
    image: prioritiesImg,
  },
  {
    id: 'sectors',
    title: 'Key Industry Sectors',
    tagline: 'A Wide Spectrum of Global Industry Domains',
    category: 'Industry Focus',
    badge: 'Participating Sectors',
    highlights: [
      'AI, Technology & Smart Cities',
      'Healthcare, Pharma & Life Sciences',
      'Renewable Energy, Climate Action & ESG',
      'Logistics, Manufacturing, Retail & Hospitality',
    ],
    description:
      'Curated delegations and multi-sector pavilions connecting established multinational enterprises, SMEs, and high-growth disruptors.',
    image: sectorsImg,
  },
  {
    id: 'benefits',
    title: 'Benefits of Participation',
    tagline: 'Maximum ROI, Authority & Worldwide Outreach',
    category: 'Participant Value',
    badge: 'Exhibitor Advantage',
    highlights: [
      'Deliver Keynotes & High-Profile Panel Addresses',
      'Dedicated Exhibition Booths & Product Demos',
      'Direct Access to Investors, Decision-Makers & Policymakers',
      'Extensive Global Brand Visibility & Media PR Outreach',
    ],
    description:
      'Accelerate your international presence, establish credibility as an industry leader, and sign valuable commercial contracts.',
    image: benefitsImg,
  },
];

const EventShowcaseSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [modalImage, setModalImage] = useState(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [touchStart, setTouchStart] = useState(null);
  const [progress, setProgress] = useState(0);
  
  const autoPlayTimerRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const slideDuration = 6000; // 6 seconds per slide

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % slidesData.length);
    setProgress(0);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + slidesData.length) % slidesData.length);
    setProgress(0);
  }, []);

  const goToSlide = (index) => {
    setActiveIndex(index);
    setProgress(0);
  };

  // Smooth Progress Bar & Autoplay
  useEffect(() => {
    if (!isPlaying || isHovered || modalImage) {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
      return;
    }

    const stepMs = 50;
    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + (stepMs / slideDuration) * 100;
      });
    }, stepMs);

    return () => {
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
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

  // 3D Parallax Tilt Effect on Mouse Move
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  // Mobile Touch Gestures
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;
    if (diff > 45) nextSlide();
    if (diff < -45) prevSlide();
    setTouchStart(null);
  };

  const currentSlide = slidesData[activeIndex];

  return (
    <section className="relative z-20 py-24 sm:py-28 md:py-36 bg-gradient-to-b from-[#fbfbfb] via-white to-[#f7f7f7] border-y border-gray-200/70 overflow-hidden">
      {/* Ambient Lighting Orbs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-brand-accent/5 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brand-accent/4 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Generous Spacing */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20 reveal-up">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-accent/10 border border-brand-accent/25 text-brand-accent text-[11px] font-bold uppercase tracking-widest mb-5 shadow-xs">
            <i className="ph-fill ph-presentation-chart text-xs"></i>
            <span>Official Event Presentation</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-brand-dark font-bold leading-tight mb-5">
            India–ASEAN Global <span className="italic font-light text-brand-accent">Confluence 2027</span>
          </h2>

          <p className="text-gray-500 font-light text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Discover the strategic vision, key metrics, participating industry sectors, and high-impact partnership opportunities.
          </p>
        </div>

        {/* Category Tabs (Spacious & Clean) */}
        <div className="flex items-center justify-center gap-2.5 sm:gap-3.5 flex-wrap mb-12 md:mb-16 reveal-up delay-100">
          {slidesData.map((slide, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={slide.id}
                onClick={() => goToSlide(idx)}
                className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-[13px] font-semibold uppercase tracking-wider transition-all duration-300 interactive flex items-center gap-2.5 ${
                  isActive
                    ? 'bg-brand-dark text-white shadow-xl shadow-brand-dark/15 scale-105 border border-brand-dark ring-2 ring-brand-accent/30'
                    : 'bg-white text-gray-600 hover:text-brand-dark hover:bg-gray-50 border border-gray-200 shadow-xs hover:border-brand-accent/40'
                }`}
              >
                <span className={`w-2 h-2 rounded-full transition-colors ${isActive ? 'bg-brand-accent' : 'bg-gray-300'}`}></span>
                <span>{slide.category}</span>
              </button>
            );
          })}
        </div>

        {/* Main Spacious Showcase Stage (Split Screen: Info on Left, 3D Canvas on Right) */}
        <div 
          className="bg-white rounded-3xl p-6 sm:p-8 md:p-12 lg:p-14 border border-gray-200/90 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.07),0_8px_20px_rgba(207,166,112,0.06)] reveal-up delay-200"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Column: Rich Context, Highlights & Navigation */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6 md:space-y-8">
              
              {/* Header meta badge */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-mono font-bold text-brand-accent bg-brand-accent/10 px-3 py-1 rounded-full border border-brand-accent/20">
                    SLIDE 0{activeIndex + 1} / 0{slidesData.length}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
                    {currentSlide.badge}
                  </span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-brand-dark leading-tight mb-2">
                  {currentSlide.title}
                </h3>

                <p className="text-brand-accent text-sm sm:text-base font-medium italic">
                  {currentSlide.tagline}
                </p>
              </div>

              {/* Description */}
              <p className="text-gray-500 font-light text-sm sm:text-base leading-relaxed">
                {currentSlide.description}
              </p>

              {/* Key Bullet Highlights */}
              <div className="bg-gray-50/80 rounded-2xl p-5 sm:p-6 border border-gray-100 space-y-3">
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-brand-dark flex items-center gap-2">
                  <i className="ph-fill ph-check-circle text-brand-accent text-base"></i>
                  Key Highlights
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-gray-600 font-light">
                  {currentSlide.highlights.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 leading-snug">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-accent mt-1.5 flex-shrink-0"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Controls Bar: Prev/Next, Play/Pause & Zoom */}
              <div className="pt-2 flex flex-wrap items-center justify-between gap-4 border-t border-gray-100">
                <div className="flex items-center gap-2.5">
                  <button
                    onClick={prevSlide}
                    aria-label="Previous slide"
                    className="w-11 h-11 rounded-full bg-white border border-gray-200 text-brand-dark hover:bg-brand-accent hover:border-brand-accent hover:text-white transition-all duration-300 shadow-xs flex items-center justify-center interactive group hover:-translate-x-0.5"
                  >
                    <i className="ph ph-caret-left text-lg font-bold group-hover:scale-110 transition-transform"></i>
                  </button>

                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
                    className="px-3.5 h-11 rounded-full bg-white border border-gray-200 text-gray-700 hover:text-brand-dark hover:border-brand-dark transition-all duration-300 shadow-xs flex items-center gap-2 text-xs font-semibold interactive"
                  >
                    <i className={`ph-fill ${isPlaying ? 'ph-pause' : 'ph-play'} text-brand-accent text-xs`}></i>
                    <span className="uppercase tracking-wider text-[11px]">{isPlaying ? 'Pause' : 'Play'}</span>
                  </button>

                  <button
                    onClick={nextSlide}
                    aria-label="Next slide"
                    className="w-11 h-11 rounded-full bg-white border border-gray-200 text-brand-dark hover:bg-brand-accent hover:border-brand-accent hover:text-white transition-all duration-300 shadow-xs flex items-center justify-center interactive group hover:translate-x-0.5"
                  >
                    <i className="ph ph-caret-right text-lg font-bold group-hover:scale-110 transition-transform"></i>
                  </button>
                </div>

                <button
                  onClick={() => setModalImage(currentSlide)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-brand-dark bg-gray-100 hover:bg-brand-accent hover:text-white transition-all duration-300 shadow-xs interactive"
                >
                  <i className="ph ph-arrows-out-simple text-sm"></i>
                  <span>Enlarge Slide</span>
                </button>
              </div>

              {/* Progress Line */}
              <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div 
                  className="bg-brand-accent h-full transition-all duration-75 rounded-full"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>

            </div>

            {/* Right Column: 3D Interactive Slide Canvas */}
            <div className="lg:col-span-7 flex items-center justify-center">
              <div
                onMouseMove={handleMouseMove}
                onClick={() => setModalImage(currentSlide)}
                className="relative w-full max-w-[560px] lg:max-w-[620px] aspect-[4/3] sm:aspect-[16/11] md:aspect-[16/11] bg-gradient-to-b from-gray-50 via-white to-gray-100/60 rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 border border-gray-200/90 shadow-xl group cursor-zoom-in transition-transform duration-300 ease-out select-none flex items-center justify-center"
                style={{
                  perspective: '1200px',
                  transform: `perspective(1200px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
                }}
              >
                {/* 3D Floating Glow Border Accent */}
                <div className="absolute inset-0 rounded-2xl md:rounded-3xl border-2 border-brand-accent/20 group-hover:border-brand-accent/60 transition-colors pointer-events-none"></div>

                {/* Top Overlay Badge */}
                <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-brand-dark/80 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest shadow-md flex items-center gap-1.5">
                  <i className="ph-fill ph-magnifying-glass-plus text-brand-accent text-xs"></i>
                  <span>Click to Zoom</span>
                </div>

                {/* Slide Image */}
                <img
                  key={currentSlide.id}
                  src={currentSlide.image}
                  alt={currentSlide.title}
                  className="max-h-full max-w-full object-contain rounded-xl drop-shadow-[0_15px_30px_rgba(0,0,0,0.12)] transition-all duration-700 ease-out group-hover:scale-[1.02] animate-fade-in"
                  loading="lazy"
                />

                {/* Hover Reveal Overlay */}
                <div className="absolute inset-0 bg-brand-dark/20 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl md:rounded-3xl flex items-center justify-center gap-2 text-white text-xs font-bold uppercase tracking-wider">
                  <i className="ph-fill ph-arrows-out-simple text-xl text-brand-accent"></i>
                  <span>View High Resolution Slide</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Thumbnail Filmstrip (Clean, Spacious, Clickable Cards Below) */}
        <div className="mt-12 md:mt-16 reveal-up delay-300">
          <div className="text-center mb-6">
            <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
              Interactive Slide Deck
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
            {slidesData.map((slide, idx) => {
              const isActive = idx === activeIndex;
              return (
                <div
                  key={slide.id}
                  onClick={() => goToSlide(idx)}
                  className={`group relative rounded-2xl p-3 bg-white border transition-all duration-400 interactive cursor-pointer flex flex-col justify-between ${
                    isActive
                      ? 'border-brand-accent shadow-lg ring-2 ring-brand-accent/20 scale-[1.03] -translate-y-1'
                      : 'border-gray-200/80 hover:border-brand-accent/50 hover:shadow-md hover:-translate-y-0.5'
                  }`}
                >
                  {/* Thumbnail Image */}
                  <div className="w-full h-28 sm:h-32 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center p-2 mb-2.5 border border-gray-100">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  {/* Thumbnail Info */}
                  <div className="text-center">
                    <span className="text-[9px] font-mono font-bold uppercase text-brand-accent block mb-0.5">
                      0{idx + 1} • {slide.category}
                    </span>
                    <h5 className="font-serif text-xs font-bold text-brand-dark line-clamp-1">
                      {slide.title}
                    </h5>
                  </div>
                </div>
              );
            })}
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
              <p className="font-light">{modalImage.description}</p>
              <span className="text-[11px] text-gray-400">Click anywhere outside or press ESC to dismiss</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default EventShowcaseSlider;
