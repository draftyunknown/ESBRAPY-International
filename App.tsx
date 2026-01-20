
import React, { useState, useEffect } from 'react';
import { Layout } from './components/Layout';
import { AIChatBot } from './components/AIChatBot';

const App: React.FC = () => {
  const [estimateEmail, setEstimateEmail] = useState('');
  const [estimateDetails, setEstimateDetails] = useState('');
  const [isEstimating, setIsEstimating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isHighContrast, setIsHighContrast] = useState(false);
  
  // Interactive Calculator State
  const [squareFootage, setSquareFootage] = useState(1000);
  const [efficiencyRating, setEfficiencyRating] = useState(14); // SEER

  const handleEstimateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEstimating(true);
    setTimeout(() => {
      setIsEstimating(false);
      setShowSuccess(true);
      setEstimateEmail('');
      setEstimateDetails('');
      setTimeout(() => setShowSuccess(false), 5000);
    }, 1500);
  };

  const calculateCoolingLoad = () => {
    // Basic rule of thumb: 20 BTU per sq ft
    const btus = squareFootage * 20;
    const tons = (btus / 12000).toFixed(1);
    return { btus, tons };
  };

  const coolingData = calculateCoolingLoad();

  return (
    <div className={`${isHighContrast ? 'contrast-125 saturate-150' : ''} selection:bg-cyan-500 selection:text-white`}>
      <Layout>
        {/* Accessibility & Quick Portal Toolbar */}
        <div className="fixed top-24 right-6 z-[60] flex flex-col space-y-3">
          <button 
            onClick={() => setIsHighContrast(!isHighContrast)}
            className="p-3 bg-white border-2 border-slate-900 rounded shadow-2xl hover:bg-cyan-600 hover:text-white transition-all group"
            title="Toggle High Contrast"
          >
            <span className="text-xl font-black">A</span>
          </button>
          <button className="p-3 bg-slate-900 text-cyan-400 rounded shadow-2xl hover:scale-110 transition-all border-2 border-cyan-600">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
          </button>
        </div>

        {/* Hero Section with AR/3D Tease */}
        <section className="relative bg-white pt-24 pb-40 overflow-hidden blueprint-bg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="animate-in fade-in slide-in-from-left-8 duration-700">
                <div className="inline-flex items-center space-x-3 px-4 py-2 bg-slate-900 rounded shadow-2xl mb-8">
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
                  </span>
                  <span className="text-white text-[10px] font-bold uppercase tracking-[0.2em] mono">Next-Gen HVAC Logistics</span>
                </div>
                
                <h1 className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9] mb-8 uppercase">
                  Climate <br />
                  <span className="text-cyan-600">Perfected</span> <br />
                  In 3D.
                </h1>
                
                <p className="max-w-xl text-lg text-slate-600 mb-12 leading-relaxed border-l-4 border-cyan-600 pl-6">
                  Experience the future of refrigeration. ESBRAPY International combines industrial precision with 3D planning tools and AR system previews for unmatched contractor transparency.
                </p>

                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
                  <a href="#estimate" className="px-10 py-5 bg-slate-900 text-white font-bold rounded shadow-xl hover:bg-cyan-600 transition-all uppercase tracking-widest text-sm flex items-center justify-center group">
                    Instant Online Quote
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                  </a>
                  <button className="px-10 py-5 bg-white text-slate-900 border-2 border-slate-200 font-bold rounded hover:bg-slate-50 transition-all uppercase tracking-widest text-sm">
                    View AR Demo
                  </button>
                </div>
              </div>

              <div className="relative hidden lg:block animate-in fade-in zoom-in-95 duration-1000">
                <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="relative bg-slate-900 aspect-square rounded-[3rem] shadow-2xl border-8 border-white flex items-center justify-center group overflow-hidden">
                   <div className="text-center p-12">
                      <div className="text-6xl mb-6 group-hover:rotate-12 transition-transform duration-500">❄️</div>
                      <h4 className="text-white font-black uppercase tracking-tighter text-2xl mb-2 italic">3D System Preview</h4>
                      <p className="text-cyan-400 text-xs font-mono mb-6 uppercase">Initializing Interactive Model...</p>
                      <button className="px-6 py-2 border border-cyan-500 text-cyan-500 rounded font-bold text-xs uppercase hover:bg-cyan-500 hover:text-white transition-all">Launch Viewer</button>
                   </div>
                   <div className="absolute top-4 right-4 text-cyan-600/30 font-mono text-8xl font-black uppercase tracking-tighter select-none">HVAC</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Energy Efficiency Calculator */}
        <section className="py-24 bg-slate-900 text-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-slate-800 rounded-3xl p-8 md:p-16 border border-slate-700 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-4">Energy Efficiency Calculator</h2>
                  <p className="text-slate-400 mb-8 leading-relaxed">Estimate the cooling capacity required for your space and see how energy-efficient systems can reduce your carbon footprint.</p>
                  
                  <div className="space-y-8">
                    <div>
                      <label className="block text-[10px] font-black text-cyan-500 mb-4 uppercase tracking-[0.3em] mono">Square Footage ({squareFootage} sq.ft)</label>
                      <input 
                        type="range" min="100" max="5000" step="50"
                        value={squareFootage}
                        onChange={(e) => setSquareFootage(parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-8 text-center">
                      <div className="p-6 bg-slate-900 rounded-2xl border border-slate-700">
                        <div className="text-3xl font-black text-cyan-400">{coolingData.btus.toLocaleString()}</div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase mt-2 mono">Required BTUs</div>
                      </div>
                      <div className="p-6 bg-slate-900 rounded-2xl border border-slate-700">
                        <div className="text-3xl font-black text-white">{coolingData.tons}</div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase mt-2 mono">System Tons</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-cyan-600/10 p-8 rounded-3xl border border-cyan-500/30">
                  <div className="text-sm font-bold text-cyan-400 mb-4 uppercase tracking-widest italic">Efficiency Recommendation</div>
                  <h4 className="text-2xl font-black mb-4">Target SEER 18+</h4>
                  <p className="text-sm text-slate-300 mb-6">Based on your square footage, an 18 SEER system could save you up to 40% on monthly energy costs compared to standard 14 SEER units in the Nairobi climate.</p>
                  <button className="w-full py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-black rounded uppercase tracking-widest text-xs transition-all">Download Efficiency PDF</button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Modular Service Matrix */}
        <section id="services" className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-600 mb-4 mono">Our Capabilities</h2>
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase italic">Precision Contracting</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'HVAC', label: 'Commercial Cooling', icon: '❄️' },
                { title: 'VRF', label: 'Multi-Zone Systems', icon: '🌡️' },
                { title: 'COLD ROOM', label: 'Industrial Refrigeration', icon: '📦' },
                { title: 'SERVICE', label: '24/7 Support', icon: '🛠️' }
              ].map((s, idx) => (
                <div key={idx} className="group relative bg-slate-50 p-8 rounded-2xl border border-slate-100 hover:bg-slate-900 hover:text-white transition-all duration-500 cursor-pointer overflow-hidden">
                  <div className="absolute -right-4 -bottom-4 text-8xl opacity-5 group-hover:opacity-10 transition-opacity">{s.icon}</div>
                  <div className="text-3xl mb-6 group-hover:scale-110 transition-transform inline-block">{s.icon}</div>
                  <h4 className="text-xl font-black mb-2 italic uppercase">{s.title}</h4>
                  <p className="text-slate-500 group-hover:text-cyan-400 text-xs font-bold uppercase tracking-widest">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Project Portfolio Simulation */}
        <section className="py-32 bg-slate-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="flex justify-between items-end mb-16">
                <div>
                   <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase italic">Case Studies</h2>
                   <p className="text-slate-500 font-bold uppercase tracking-widest text-xs mt-2">Nairobi's Most Inclusive Projects</p>
                </div>
                <div className="flex space-x-2">
                   <button className="w-12 h-12 rounded border-2 border-slate-200 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all">←</button>
                   <button className="w-12 h-12 rounded border-2 border-slate-200 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all">→</button>
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { name: 'Silverpool Suites', tag: 'HVAC Installation' },
                  { name: 'Nairobi Med-Center', tag: 'Medical Cold Storage' },
                  { name: 'Greenway Logistics', tag: 'Warehouse Ventilation' }
                ].map((p, i) => (
                  <div key={i} className="group relative h-96 rounded-2xl overflow-hidden shadow-xl">
                    <img src={`https://picsum.photos/seed/hvac-${i}/800/1000`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700" alt={p.name} />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90 group-hover:from-cyan-900 transition-colors"></div>
                    <div className="absolute bottom-8 left-8">
                      <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1 mono">{p.tag}</div>
                      <h4 className="text-2xl font-black text-white uppercase italic">{p.name}</h4>
                    </div>
                  </div>
                ))}
             </div>
          </div>
        </section>

        {/* High Performance Quote Engine */}
        <section id="estimate" className="py-32 bg-white relative overflow-hidden blueprint-bg">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="bg-slate-900 rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] overflow-hidden border-8 border-white">
              <div className="p-12 text-center border-b border-slate-800">
                <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic mb-4">Precision Quoting</h2>
                <p className="text-cyan-400 font-mono text-xs uppercase tracking-[0.3em]">Estimated processing time: 140ms</p>
              </div>
              
              <div className="p-12">
                {showSuccess ? (
                  <div className="bg-cyan-600/10 border border-cyan-500/50 p-12 rounded-3xl text-center animate-in zoom-in-95 duration-300">
                    <div className="w-20 h-20 bg-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(8,145,178,0.5)]">
                       <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7"/></svg>
                    </div>
                    <h3 className="text-3xl font-black text-white uppercase italic mb-2 tracking-tighter">Request Transmitted</h3>
                    <p className="text-cyan-400 font-bold uppercase tracking-widest text-[10px] mono">Checking CRM Availability...</p>
                  </div>
                ) : (
                  <form onSubmit={handleEstimateSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Secure Email</label>
                        <input 
                          type="email" required value={estimateEmail}
                          onChange={(e) => setEstimateEmail(e.target.value)}
                          className="w-full px-6 py-5 bg-slate-800 border-2 border-slate-700 text-white focus:border-cyan-500 outline-none transition-all rounded-xl font-bold placeholder-slate-600"
                          placeholder="procurement@corp.int"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Service Level</label>
                        <select className="w-full px-6 py-5 bg-slate-800 border-2 border-slate-700 text-white focus:border-cyan-500 outline-none transition-all rounded-xl font-bold">
                          <option>Standard Installation</option>
                          <option>Emergency 4h Response</option>
                          <option>3D Facility Mapping</option>
                          <option>AR Maintenance Training</option>
                        </select>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Project Scope</label>
                      <textarea 
                        rows={4} required value={estimateDetails}
                        onChange={(e) => setEstimateDetails(e.target.value)}
                        placeholder="Define your mechanical or refrigeration parameters..."
                        className="w-full px-6 py-5 bg-slate-800 border-2 border-slate-700 text-white focus:border-cyan-500 outline-none transition-all rounded-xl font-bold placeholder-slate-600 resize-none"
                      />
                    </div>
                    <button type="submit" disabled={isEstimating} className="w-full py-6 bg-cyan-600 hover:bg-cyan-500 text-white font-black rounded-xl transition-all uppercase tracking-[0.4em] text-xs shadow-2xl flex items-center justify-center group">
                      {isEstimating ? (
                        <span className="flex items-center"><svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> COMPILING QUOTE...</span>
                      ) : (
                        <>GENERATE INSTANT QUOTATION <svg className="w-5 h-5 ml-4 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg></>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        <AIChatBot />
      </Layout>
    </div>
  );
};

export default App;
