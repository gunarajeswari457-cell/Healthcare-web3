import React, { useState } from 'react';

// Inline SVGs for quick, zero-install modern icons
const BrainIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-400">
    <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
    <path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z" />
    <path d="M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4" />
    <path d="M17.599 6.5a3 3 0 0 0 .399-1.375" />
    <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
    <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
    <path d="M19.938 10.5a4 4 0 0 1 .585.396" />
    <path d="M6 18a4 4 0 0 1-1.967-.516" />
    <path d="M19.967 17.484A4 4 0 0 1 18 18" />
  </svg>
);

const UserIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const ActivityIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-400">
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-emerald-400">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

export default function App() {
  const [activeTab, setActiveTab] = useState('Dashboard');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 flex font-sans selection:bg-cyan-500/30">
      
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-slate-800 bg-slate-900/50 flex flex-col hidden md:flex">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="p-2 bg-slate-800 rounded-lg shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <BrainIcon />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            NeuroHealth
          </h1>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 relative mt-4">
          {['Dashboard', 'Patient Records', 'Diagnostics', 'Reports', 'Settings'].map((item) => (
            <button 
              key={item}
              onClick={() => setActiveTab(item)}
              className={`w-full text-left px-4 py-3 rounded-xl transition-all duration-300 flex items-center gap-3 relative group
                ${activeTab === item ? 'bg-slate-800/80 text-white shadow-lg' : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}`}
            >
              {activeTab === item && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-cyan-400 rounded-r-md shadow-[0_0_10px_rgba(6,182,212,0.8)]"></span>
              )}
              {item}
            </button>
          ))}
        </nav>
        
        <div className="p-6 border-t border-slate-800">
          <div className="flex items-center gap-3 p-3 bg-slate-800/60 border border-slate-700/50 hover:border-slate-600 rounded-xl cursor-pointer hover:bg-slate-700 transition">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center p-[2px]">
              <div className="w-full h-full bg-slate-900 rounded-full flex items-center justify-center">
                <UserIcon />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-white">Dr. Sarah Connor</p>
              <p className="text-xs text-cyan-400">Neurologist</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
        
        {/* Top Header */}
        <header className="h-20 border-b border-slate-800/60 bg-slate-950/40 backdrop-blur-xl flex items-center justify-between px-8 z-10 sticky top-0">
          <h2 className="text-2xl font-semibold text-white tracking-wide">{activeTab}</h2>
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <input 
                type="text" 
                placeholder="Search patients, tests..." 
                className="relative w-64 bg-slate-900 border border-slate-700 text-sm rounded-full py-2.5 px-4 pl-11 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all placeholder:text-slate-500"
              />
              <svg className="w-4 h-4 text-slate-500 absolute left-4 top-1/2 -translate-y-1/2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
            <button className="p-2.5 border border-slate-700 bg-slate-900 rounded-full hover:bg-slate-800 hover:border-slate-500 text-slate-300 transition relative">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
              <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-slate-900 animate-pulse"></span>
            </button>
          </div>
        </header>

        {/* Scrollable Dashboard */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          
          {/* Welcome Banner */}
          <div className="w-full bg-slate-900 border border-slate-700/50 shadow-2xl rounded-3xl p-8 mb-8 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-full h-full bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition duration-700"></div>
            <div className="absolute -top-32 -right-32 w-80 h-80 bg-purple-600/20 rounded-full blur-[100px] animate-pulse"></div>
            <div className="absolute top-12 right-64 w-64 h-64 bg-cyan-600/10 rounded-full blur-[80px]"></div>
            
            <div className="relative z-10 max-w-2xl">
              <span className="inline-block px-3 py-1 rounded-full bg-cyan-900/40 text-cyan-400 font-medium tracking-wider text-xs uppercase mb-4 border border-cyan-500/20">Daily Overview</span>
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Good morning, Dr. Connor.</h3>
              <p className="text-slate-400 leading-relaxed text-lg">
                You have <span className="text-white font-semibold">3 patients</span> requiring attention today. The latest Hand-Eye Coordination metrics from the mobile module have been synced. Risk models predict stable conditions across the board.
              </p>
              
              <div className="mt-8 flex gap-4">
                <button className="px-6 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-medium rounded-xl shadow-[0_4px_14px_rgba(6,182,212,0.4)] transition hover:-translate-y-0.5">
                  View Daily Briefing
                </button>
                <button className="px-6 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-500 text-white font-medium rounded-xl transition">
                  Quick Search
                </button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              { title: 'Avg. Reaction Time', value: '234ms', icon: <ActivityIcon />, trend: '↓ 12ms (Improved)', tColor: 'text-emerald-400' },
              { title: 'Active Patients', value: '1,459', icon: <UserIcon />, trend: '↑ 42 this week', tColor: 'text-cyan-400' },
              { title: 'Risk Alerts', value: '3', icon: <ShieldIcon />, trend: '! Needs review', tColor: 'text-rose-400' },
            ].map((stat, i) => (
              <div key={i} className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 hover:bg-slate-800 hover:border-slate-700 transition duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-slate-950 rounded-xl inline-block border border-slate-800 shadow-inner">{stat.icon}</div>
                </div>
                <p className="text-slate-400 text-sm mb-2 font-medium">{stat.title}</p>
                <div className="flex items-end gap-3">
                  <h4 className="text-3xl font-bold text-white tracking-tight">{stat.value}</h4>
                  <span className={`text-sm tracking-wide font-medium ${stat.tColor} mb-1 bg-slate-900/80 px-2 py-0.5 rounded-md`}>{stat.trend}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Dashboard Main Dual Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Chart Area */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="text-xl font-semibold text-white">Cognitive Progress Tracker</h3>
                  <p className="text-sm text-slate-400 mt-1">Aggregate dataset across all diagnostic modules</p>
                </div>
                <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
                  <button className="px-4 py-1.5 bg-slate-800 text-sm font-medium text-white rounded-md shadow-sm">Daily</button>
                  <button className="px-4 py-1.5 text-slate-400 hover:text-white text-sm font-medium rounded-md transition">Weekly</button>
                </div>
              </div>
              
              {/* Mock Graph Layout */}
              <div className="flex-1 mt-4 relative w-full border-b border-l border-slate-700 flex items-end justify-between px-4 pb-0 pt-10 min-h-[250px]">
                {/* Horizontal Grid lines */}
                <div className="absolute top-0 w-full border-b border-slate-800 border-dashed h-1/4"></div>
                <div className="absolute top-1/4 w-full border-b border-slate-800 border-dashed h-1/4"></div>
                <div className="absolute top-2/4 w-full border-b border-slate-800 border-dashed h-1/4"></div>
                <div className="absolute top-3/4 w-full border-b border-slate-800 border-dashed h-1/4"></div>
                
                {/* Graph bars using gradients */}
                {[40, 55, 30, 75, 45, 90, 60].map((h, i) => (
                  <div key={i} className="w-[8%] relative z-10 flex flex-col justify-end items-center group cursor-pointer h-full">
                    <div 
                      className="w-full bg-gradient-to-t from-cyan-600/80 to-cyan-400 rounded-t-md opacity-70 group-hover:opacity-100 transition-all duration-300 relative group-hover:w-[120%] group-hover:shadow-[0_0_20px_rgba(6,182,212,0.8)]" 
                      style={{ height: `${h}%` }}
                    >
                       <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-xs py-1.5 px-2.5 rounded-lg opacity-0 group-hover:opacity-100 text-white font-medium border border-slate-700 shadow-xl pointer-events-none transition-all duration-200 block whitespace-nowrap">
                         Score: {h}
                       </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between px-4 pt-4 text-xs text-slate-500 font-medium">
                 <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
              </div>
            </div>

            {/* Quick Diagnostics Panel */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-2xl flex flex-col relative overflow-hidden">
             <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-cyan-900/20 rounded-full blur-[80px]"></div>
             
              <h3 className="text-xl font-semibold text-white mb-2 relative z-10">Live Diagnostics</h3>
              <p className="text-sm text-slate-400 mb-8 relative z-10 p-r-4">Trigger interactive mobile test modules directly for your active patient.</p>

              <div className="space-y-4 flex-1 relative z-10 mt-auto">
                {/* Reaction Test Module Trigger */}
                <div className="group relative bg-slate-950/50 border border-slate-800 hover:border-purple-500/50 rounded-2xl p-5 cursor-pointer transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400 border border-purple-500/30 group-hover:scale-110 transition">
                        ⚡
                      </div>
                      <h4 className="font-semibold text-white text-base">Reaction Time</h4>
                    </div>
                    <button className="text-purple-400 text-sm font-medium group-hover:translate-x-2 transition bg-purple-500/10 px-3 py-1 rounded-full">Run →</button>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">Measures millisecond response times to visual stimuli.</p>
                </div>

                {/* Finger Stability Module Trigger */}
                <div className="group relative bg-slate-950/50 border border-slate-800 hover:border-emerald-500/50 rounded-2xl p-5 cursor-pointer transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 border border-emerald-500/30 group-hover:scale-110 transition">
                        🎯
                      </div>
                      <h4 className="font-semibold text-white text-base">Finger Stability</h4>
                    </div>
                    <button className="text-emerald-400 text-sm font-medium group-hover:translate-x-2 transition bg-emerald-500/10 px-3 py-1 rounded-full">Run →</button>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">Evaluates micro-tremors and fine motor control tracking.</p>
                </div>
              </div>

            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
