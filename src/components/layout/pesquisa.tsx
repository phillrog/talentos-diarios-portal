import { forwardRef } from "react";
import { Search } from "lucide-react";

interface PesquisaProps {
  busca: string;
  setBusca: (valor: string) => void;
}

export const PesquisaCandidato = forwardRef<HTMLInputElement, PesquisaProps>(
  ({ busca, setBusca }, ref) => {
    return (
      <div className="w-full mb-4 md:mb-8 text-center md:text-left mx-auto mt-6 md:mt-16">
        <div className="relative flex items-center group w-full max-w-7xl mx-auto">
          
          <div className="absolute inset-0 bg-blue-500/5 blur-2xl rounded-[1.5rem] md:rounded-[2rem] opacity-0 group-focus-within:opacity-100 transition-opacity pointer-events-none"></div>
          
          <div className="absolute left-5 md:left-8 text-slate-400 group-focus-within:text-blue-500 transition-colors">
            <Search size={window.innerWidth < 768 ? 20 : 28} strokeWidth={2.5} />
          </div>

          <input
            ref={ref}
            type="text"
            placeholder={window.innerWidth < 768 ? "Buscar cargos ou nomes..." : "Procure profissionais por palavras chaves. Ex: Fullstack .Net, Cloud..."}
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="
              relative 
              w-full 
              pl-14 md:pl-20 pr-6 md:px-10 
              py-5 md:py-8 
              bg-white 
              border-2 border-slate-200 
              rounded-[1.5rem] md:rounded-[2rem] 
              text-lg md:text-2xl 
              text-slate-900 
              placeholder:text-slate-400 
              focus:outline-none focus:border-blue-500 
              focus:ring-8 focus:ring-blue-500/5 
              transition-all 
              shadow-md md:shadow-lg shadow-slate-200/50
            "
          />
        </div>
      </div>
    );
  }
);

PesquisaCandidato.displayName = "PesquisaCandidato";