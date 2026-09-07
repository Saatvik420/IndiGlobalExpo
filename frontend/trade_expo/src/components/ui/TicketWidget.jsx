import { useNavigate } from 'react-router-dom';
import { Ticket } from '@phosphor-icons/react';

const TicketWidget = () => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => navigate('/tickets')} 
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 md:bottom-10 md:right-10 z-[55] interactive group block cursor-pointer"
    >
      <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xl hover:scale-105 transition-transform duration-300">
        {/* Rotating Text */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full animate-spin-slow group-hover:text-brand-accent transition-colors text-brand-dark mix-blend-difference">
          <path id="circlePath" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" fill="transparent" />
          <text className="text-[12px] font-bold uppercase tracking-widest fill-current">
            <textPath href="#circlePath" startOffset="0%">SECURE YOUR PASS • GET TICKETS • </textPath>
          </text>
        </svg>
        {/* Center Icon/Button */}
        <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-brand-dark text-white rounded-full flex items-center justify-center group-hover:bg-brand-accent transition-colors shadow-inner z-10">
          <Ticket size={20} className="sm:hidden" />
          <Ticket size={24} className="hidden sm:block" />
        </div>
      </div>
    </div>
  );
};

export default TicketWidget;
