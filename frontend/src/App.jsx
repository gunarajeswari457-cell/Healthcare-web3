import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-darkBg text-white p-8">
      <header className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brandPrimary to-brandSecondary">
          Neuro Health Monitoring
        </h1>
        <div className="flex gap-4">
          <button className="px-4 py-2 border border-brandSecondary rounded-lg text-brandSecondary hover:bg-brandSecondary hover:text-white transition">
            Login
          </button>
          <button className="px-4 py-2 bg-brandPrimary rounded-lg text-white font-semibold hover:bg-purple-600 transition shadow-[0_0_15px_rgba(109,40,217,0.6)]">
            Get Started
          </button>
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-2 bg-darkCard p-6 rounded-2xl shadow-xl border border-gray-800">
          <h2 className="text-xl font-semibold mb-4 text-gray-200">Patient Analytics Dashboard</h2>
          <div className="h-64 flex items-center justify-center bg-gray-800/50 rounded-xl border border-dashed border-gray-600">
            <p className="text-gray-400">Chart rendering area...</p>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="bg-gradient-to-br from-brandPrimary/20 to-brandSecondary/20 p-6 rounded-2xl border border-gray-700/50 backdrop-blur-sm">
             <h3 className="text-lg font-medium text-brandSecondary mb-2">Health Status</h3>
             <p className="text-3xl font-bold text-white mb-1">Excellent</p>
             <p className="text-sm text-gray-400">AI Risk Score: Low (12%)</p>
          </div>

          <div className="bg-darkCard p-6 rounded-2xl shadow-xl border border-gray-800">
             <h3 className="text-lg font-medium text-gray-300 mb-4">Diagnostics Tests</h3>
             <ul className="space-y-3">
               <li className="p-3 bg-gray-800 rounded-lg flex justify-between items-center hover:bg-gray-700 cursor-pointer transition">
                  <span>Reaction Time</span>
                  <span className="text-brandSecondary">Take Test →</span>
               </li>
               <li className="p-3 bg-gray-800 rounded-lg flex justify-between items-center hover:bg-gray-700 cursor-pointer transition">
                  <span>Finger Stability</span>
                  <span className="text-brandSecondary">Take Test →</span>
               </li>
             </ul>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
