
import React, { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="w-10 h-10 bg-slate-900 rounded flex items-center justify-center mr-3 shadow-lg">
                <span className="text-cyan-400 font-black text-xl">E</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black text-slate-900 tracking-tight leading-none uppercase">ESBRAPY</span>
                <span className="text-[10px] font-bold text-cyan-600 uppercase tracking-[0.2em] leading-none mt-1">International</span>
              </div>
            </div>
            
            <div className="hidden md:flex space-x-10">
              <a href="#services" className="text-slate-600 hover:text-cyan-600 font-bold text-sm uppercase tracking-wider transition-colors">Engineering</a>
              <a href="#accessibility" className="text-slate-600 hover:text-cyan-600 font-bold text-sm uppercase tracking-wider transition-colors">Facilities</a>
              <a href="#estimate" className="text-slate-600 hover:text-cyan-600 font-bold text-sm uppercase tracking-wider transition-colors">Estimates</a>
              <a href="#contact" className="px-4 py-2 bg-slate-900 text-white rounded text-sm font-bold uppercase tracking-wider hover:bg-cyan-600 transition-all">Contract Us</a>
            </div>

            <div className="md:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="bg-slate-900 text-white pt-20 pb-10 border-t-4 border-cyan-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-6">
                 <span className="text-3xl font-black text-white tracking-tighter uppercase">ESBRAPY</span>
                 <span className="ml-2 px-2 py-0.5 bg-cyan-600 text-[10px] font-bold rounded uppercase">Contractor</span>
              </div>
              <p className="text-slate-400 max-w-sm leading-relaxed mb-6">
                Leading mechanical and HVAC solutions with a core commitment to universal accessibility. Engineered for performance, designed for everyone.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center hover:bg-cyan-600 transition-colors cursor-pointer">in</div>
                <div className="w-8 h-8 rounded bg-slate-800 flex items-center justify-center hover:bg-cyan-600 transition-colors cursor-pointer">fb</div>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-cyan-500 mb-6 uppercase tracking-widest text-xs">Capabilities</h4>
              <ul className="space-y-3 text-sm text-slate-300">
                <li><a href="#" className="hover:text-white transition-colors">HVAC Installation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mechanical Engineering</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Facility Maintenance</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Inclusive Design</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-cyan-500 mb-6 uppercase tracking-widest text-xs">Operations</h4>
              <ul className="space-y-3 text-sm text-slate-300">
                <li>Bristol Court, Ngong Rd</li>
                <li>Nairobi, Kenya</li>
                <li>+254 722 278292</li>
                <li className="text-cyan-400 font-mono">Open 08:30 - 16:30</li>
              </ul>
            </div>
          </div>
          <div className="mt-20 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-slate-500 text-[10px] uppercase tracking-[0.2em] font-bold">
            <div>&copy; {new Date().getFullYear()} ESBRAPY INTERNATIONAL CO.</div>
            <div className="flex space-x-6 mt-4 md:mt-0">
               <span className="flex items-center"><span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span> System Status: Nominal</span>
               <a href="#" className="hover:text-white">Legal</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
