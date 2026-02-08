import type { Candidato } from "../../types/candidato";
import linkedinIcon from "../../assets/images/linkedin.svg";

interface ListaProps {
  candidatos: Candidato[];
  carregando: boolean;
}

export const Lista = ({ candidatos, carregando }: ListaProps) => {
  if (carregando) {
    return (
      <div className="flex justify-center py-40">
        <div className="w-12 h-12 border-t-4 border-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  // Tratamento para lista vazia
  if (!candidatos || candidatos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-white border border-dashed border-slate-300 rounded-[3rem]">
        <div className="text-6xl mb-6">🔍</div>
        <h3 className="text-2xl font-black text-slate-900 mb-2">
          Nenhum talento encontrado
        </h3>
        <p className="text-slate-500 max-w-md italic">
          No momento não temos candidatos ativos com este critério. 
          Tente limpar os filtros ou volte mais tarde!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {candidatos.map((c, i) => (
        <div key={i} className="group relative bg-white backdrop-blur-md border border-slate-200 rounded-[3rem] px-10 py-5 hover:bg-white hover:border-blue-400 transition-all hover:-translate-y-2 shadow-sm hover:shadow-xl">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-6 mb-10">
              <img src={c.foto} className="w-24 h-24 rounded-[2rem] object-cover grayscale group-hover:grayscale-0 transition-all border border-slate-100" alt={c.nome} />
              <div>
                <h3 className="text-2xl font-black text-slate-900">{c.nome}</h3>
                <div className="flex items-center gap-2 mt-3">
                    <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-emerald-500 text-[10px] font-black uppercase tracking-widest">
                    Início imediato
                    </span>
                </div>
              </div>
            </div>
            <p className="text-blue-600 text-xl font-medium mb-12 flex-grow line-clamp-3 italic uppercase">"{c.cargo}"</p>
            <a 
                href={c.perfil_url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group/btn w-full flex items-center justify-center gap-3 py-5 bg-slate-900  rounded-[1.5rem] transition-all duration-300 hover:bg-[#0077b5] hover:border-slate-900 shadow-md hover:shadow-lg active:scale-[0.98]"
              >
                <span className="text-white font-black uppercase text-xs tracking-widest">
                  Ver perfil
                </span>
                
                <div className="flex items-center transition-transform duration-300">
                  <img 
                    src={linkedinIcon} 
                    alt="LinkedIn" 
                    className="w-16 h-8 object-contain brightness-0 invert" 
                  />
                </div>
              </a>
          </div>
        </div>
      ))}
    </div>
  );
};