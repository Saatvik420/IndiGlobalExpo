import { Ticket } from '@phosphor-icons/react';
import { useNavigate } from 'react-router-dom';

const TicketWidget = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/tickets')}
      className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-[55] interactive group block cursor-pointer"
    >
      <div className="relative w-28 h-28 md:w-32 md:h-32 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xl hover:scale-105 transition-transform duration-300">
        {/* Rotating Text */}
        <svg viewBox="0 0 100 100" className="absolute animate-spin-slow group-hover:text-brand-accent transition-colors text-brand-dark mix-blend-difference">
          <path id="circlePath" d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" fill="transparent" />
          <text className="text-[12px] font-bold uppercase tracking-widest fill-current">
            <textPath href="#circlePath" startOffset="0%">SECURE YOUR PASS • GET TICKETS • </textPath>
          </text>
        </svg>
        {/* Center Icon/Button */}
        <div className="w-14 h-14 md:w-16 md:h-16 bg-brand-dark text-white rounded-full flex items-center justify-center group-hover:bg-brand-accent transition-colors shadow-inner">
          <Ticket size={24} className="md:text-3xl" />
        </div>
      </div>
    </button>
  );
};

export default TicketWidget;
