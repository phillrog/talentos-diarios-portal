import type { Candidato } from "../../types/candidato";


interface ListaProps {
  candidatos: Candidato[];
  carregando: boolean;
}

export const Lista = ({ candidatos, carregando }: ListaProps) => {
  if (carregando) {
    return (
      <div className="flex justify-center py-40">
        <div className="w-12 h-12 border-t-4 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
      {candidatos.map((c, i) => (
        <div key={i} className="group relative bg-slate-900/40 backdrop-blur-md border border-slate-800 rounded-[3rem] p-10 hover:bg-slate-900 hover:border-blue-500/50 transition-all hover:-translate-y-2">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-6 mb-10">
              <img src={c.foto} className="w-24 h-24 rounded-[2rem] object-cover grayscale group-hover:grayscale-0 transition-all border border-white/5" alt={c.nome} />
              <div>
                <h3 className="text-2xl font-black text-white">{c.nome}</h3>
                <span className="text-emerald-400 text-[10px] font-black uppercase tracking-widest">● Open to Work</span>
              </div>
            </div>
            <p className="text-slate-400 text-xl font-medium mb-12 flex-grow line-clamp-3 italic">"{c.cargo}"</p>
            <a href={c.perfil_url} target="_blank" rel="noopener noreferrer" className="w-full text-center py-6 bg-white text-black font-black uppercase text-xs rounded-[1.5rem] hover:bg-blue-600 hover:text-white transition-all">Ver Perfil</a>
          </div>
        </div>
      ))}
    </div>
  );
};