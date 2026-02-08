import type { Candidato } from "../../types/candidato";
import linkedinIcon from "../../assets/images/linkedin.svg";

interface ListaProps {
  candidatos: Candidato[];
  carregando: boolean;
}

export const Lista = ({ candidatos, carregando }: ListaProps) => {
  if (carregando) {
    return (
      <div className="flex justify-center py-20 md:py-40">
        <div className="w-10 h-10 md:w-12 md:h-12 border-t-4 border-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!candidatos || candidatos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 md:py-20 px-6 text-center bg-white border border-dashed border-slate-300 rounded-[2rem] md:rounded-[3rem]">
        <div className="text-5xl md:text-6xl mb-6">🔍</div>
        <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-2">
          Nenhum talento encontrado
        </h3>
        <p className="text-sm md:text-base text-slate-500 max-w-md italic">
          No momento não temos candidatos ativos com este critério. 
          Tente limpar os filtros ou volte mais tarde!
        </p>
      </div>
    );
  }

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
      {candidatos.map((c, i) => (
        <div 
          key={i} 
          className="group relative bg-white border border-slate-200 rounded-[2rem] md:rounded-[3rem] px-6 py-6 md:px-10 md:py-8 hover:border-blue-400 transition-all md:hover:-translate-y-2 shadow-sm hover:shadow-xl"
        >
          <div className="flex flex-col h-full">

            <div className="flex items-center gap-4 md:gap-6 mb-6 md:mb-10">
              <img 
                src={c.foto} 
                className="w-16 h-16 md:w-24 md:h-24 rounded-2xl md:rounded-[2rem] object-cover grayscale group-hover:grayscale-0 transition-all border border-slate-100 shadow-sm" 
                alt={c.nome} 
              />
              <div className="min-w-0">
                <h3 className="text-lg md:text-2xl font-black text-slate-900 truncate">{c.nome}</h3>
                <div className="flex items-center gap-2 mt-2">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-emerald-500 text-[9px] md:text-[10px] font-black uppercase tracking-widest">
                      Início imediato
                    </span>
                </div>
              </div>
            </div>

            <p className="text-blue-600 text-base md:text-xl font-medium mb-8 md:mb-12 flex-grow line-clamp-3 italic uppercase leading-tight">
              "{c.cargo}"
            </p>

            <a 
                href={c.perfil_url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group/btn w-full flex items-center justify-center gap-2 py-4 md:py-5 bg-slate-900 rounded-2xl md:rounded-[1.5rem] transition-all duration-300 hover:bg-[#0077b5] shadow-md hover:shadow-lg active:scale-[0.98]"
              >
                <span className="text-white font-black uppercase text-[10px] md:text-xs tracking-widest">
                  Ver perfil
                </span>
                
                <div className="flex items-center transition-transform duration-300">
                  <img 
                    src={linkedinIcon} 
                    alt="LinkedIn" 
                    className="w-14 h-7 md:w-14 md:h-7 object-contain brightness-0 invert" 
                  />
                </div>
              </a>
          </div>
        </div>
      ))}
    </div>
  );
};