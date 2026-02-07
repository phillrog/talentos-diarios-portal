import { forwardRef } from "react";

interface PesquisaProps {
  busca: string;
  setBusca: (valor: string) => void;
}

export const PesquisaCandidato = forwardRef<HTMLInputElement, PesquisaProps>(
  ({ busca, setBusca }, ref) => {
    return (
      <div className="max-w-12xl mb-8 text-center md:text-left mx-auto md:mx-0 mt-16">
        <div className="relative flex items-center group max-w-7xl">

          {/* Brilho de foco ajustado para um azul bem sutil (estilo InHire) */}
          <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-[2rem] opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none"></div>
          
          <input
            ref={ref}
            type="text"
            placeholder="Procure profissionais por palavras chaves. Ex: Fullstack .Net Developer C#, Cloud..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            /* CORES ALTERADAS:
               - De bg-slate-900/90 para bg-white
               - De border-slate-800 para border-slate-200
               - De text-white para text-slate-900
            */
            className="relative w-full px-10 py-8 bg-white border-2 border-slate-200 rounded-[2rem] text-2xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 transition-all shadow-lg shadow-slate-200/50"
          />
        </div>
      </div>
    );
  }
);

PesquisaCandidato.displayName = "PesquisaCandidato";