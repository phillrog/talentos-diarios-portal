import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
      {/* Card de Teste com Tailwind v4 */}
      <div className="max-w-md w-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl text-center">
        <div className="w-20 h-20 bg-gradient-to-tr from-blue-500 to-emerald-400 rounded-full mx-auto mb-6 shadow-[0_0_30px_rgba(59,130,246,0.5)] animate-pulse" />
        
        <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">
          Tailwind <span className="text-blue-400">Ativo!</span>
        </h1>
        
        <p className="text-slate-400 mb-6">
          
        </p>

        <button className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-500/20">
          Confirmar e Prosseguir
        </button>
      </div>
    </div>
  );
}

export default App;