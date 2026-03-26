import { FileText, History, Sparkles, Users, LogIn } from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  onNavigate?: (view: 'generate' | 'history' | 'clients') => void;
  activeView?: 'generate' | 'history' | 'clients';
}

export function Sidebar({ onNavigate, activeView = 'generate' }: SidebarProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${
        isHovered ? 'w-64' : 'w-16'
      } flex flex-col overflow-hidden`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-center border-b border-gray-200">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
          <FileText className="w-5 h-5 text-white" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        <button
          onClick={() => onNavigate?.('generate')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-all ${
            activeView === 'generate'
              ? 'bg-blue-50 text-blue-700'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-5 h-5 flex-shrink-0" />
          <span className={`whitespace-nowrap transition-opacity duration-300 text-sm font-medium ${isHovered ? 'opacity-100' : 'opacity-0'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
            Generate SAR
          </span>
        </button>

        <button
          onClick={() => onNavigate?.('history')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-all ${
            activeView === 'history'
              ? 'bg-blue-50 text-blue-700'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <History className="w-5 h-5 flex-shrink-0" />
          <span className={`whitespace-nowrap transition-opacity duration-300 text-sm font-medium ${isHovered ? 'opacity-100' : 'opacity-0'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
            SAR History
          </span>
        </button>

        <button
          onClick={() => onNavigate?.('clients')}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-md transition-all ${
            activeView === 'clients'
              ? 'bg-blue-50 text-blue-700'
              : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
          }`}
        >
          <Users className="w-5 h-5 flex-shrink-0" />
          <span className={`whitespace-nowrap transition-opacity duration-300 text-sm font-medium ${isHovered ? 'opacity-100' : 'opacity-0'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
            Client Data
          </span>
        </button>
      </nav>

      {/* Login/Register Button */}
      <div className="p-3 border-t border-gray-200">
        <button
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md bg-blue-600 hover:bg-blue-700 text-white transition-all"
        >
          <LogIn className="w-5 h-5 flex-shrink-0" />
          <span className={`whitespace-nowrap transition-opacity duration-300 text-sm font-medium ${isHovered ? 'opacity-100' : 'opacity-0'}`} style={{ fontFamily: 'Inter, sans-serif' }}>
            Login / Register
          </span>
        </button>
      </div>
    </div>
  );
}
