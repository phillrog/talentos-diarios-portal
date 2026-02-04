import React, { forwardRef } from "react";

interface PesquisaProps {
  busca: string;
  setBusca: (valor: string) => void;
}

export const PesquisaCandidato = forwardRef<HTMLInputElement, PesquisaProps>(
  ({ busca, setBusca }, ref) => {
    return (
      <div className="max-w-12xl mb-8 text-center md:text-left mx-auto md:mx-0 mt-16">
        <div className="relative flex items-center group max-w-7xl">

          <div className="absolute inset-0 bg-blue-600/20 blur-3xl rounded-[2rem] opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none"></div>
          
          <input
            ref={ref}
            type="text"
            placeholder="Procure profissionais por palavras chaves. Ex: Fullstack .Net Developer C#, Cloud..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="relative w-full px-10 py-8 bg-slate-900/90 border-2 border-slate-800 rounded-[2rem] text-2xl text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all shadow-2xl"
          />
        </div>
      </div>
    );
  }
);

PesquisaCandidato.displayName = "PesquisaCandidato";