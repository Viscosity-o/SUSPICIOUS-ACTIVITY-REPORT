import { Search } from 'lucide-react';

interface BarclaysNavbarProps {
  onNavigate: (view: 'generate' | 'history' | 'clients') => void;
  activeView: 'generate' | 'history' | 'clients';
}

export function BarclaysNavbar({ onNavigate, activeView }: BarclaysNavbarProps) {
  return (
    <div className="bg-white">
      {/* Top Utility Bar */}
      <div className="bg-[#F0F4F7] h-9">
        <div className="max-w-[1200px] mx-auto px-12 h-full flex items-center">
          <span className="text-[12px] text-[#666666]">
            Compliance Tools / SAR Narrative Generator
          </span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="border-b border-[#DDDDDD]">
        <div className="max-w-[1200px] mx-auto px-12 h-[68px] flex items-center justify-between">
          {/* Logo and Wordmark */}
          <div className="flex items-center gap-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-[#00AEEF]">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor"/>
              <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span 
              className="text-[22px] text-[#003366]" 
              style={{ fontWeight: 700, letterSpacing: '0.1em' }}
            >
              BARCLAYS
            </span>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            <button 
              className="bg-[#00AEEF] text-white h-10 px-5 text-[15px] font-semibold hover:opacity-90 transition-opacity"
              style={{ borderRadius: '24px', letterSpacing: '0.02em' }}
            >
              Contact Us
            </button>
            <button 
              className="bg-[#00AEEF] text-white h-10 px-5 text-[15px] font-semibold hover:opacity-90 transition-opacity"
              style={{ borderRadius: '24px', letterSpacing: '0.02em' }}
            >
              Help
            </button>
            <Search className="w-5 h-5 text-[#003366]" />
          </div>
        </div>

        {/* Horizontal Navigation Links */}
        <div className="border-t border-[#DDDDDD]">
          <div className="max-w-[1200px] mx-auto px-12 h-12 flex items-center gap-8">
            <button
              onClick={() => onNavigate('generate')}
              className={`text-[15px] transition-colors ${
                activeView === 'generate'
                  ? 'text-[#00AEEF] underline'
                  : 'text-[#003366] hover:text-[#00AEEF]'
              }`}
              style={{ fontWeight: 400 }}
            >
              Generate SAR
            </button>
            <button
              onClick={() => onNavigate('history')}
              className={`text-[15px] transition-colors ${
                activeView === 'history'
                  ? 'text-[#00AEEF] underline'
                  : 'text-[#003366] hover:text-[#00AEEF]'
              }`}
              style={{ fontWeight: 400 }}
            >
              SAR History
            </button>
            <button
              onClick={() => onNavigate('clients')}
              className={`text-[15px] transition-colors ${
                activeView === 'clients'
                  ? 'text-[#00AEEF] underline'
                  : 'text-[#003366] hover:text-[#00AEEF]'
              }`}
              style={{ fontWeight: 400 }}
            >
              Client Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
