interface PesquisaProps {
    busca: string;
    setBusca: (valor: string) => void;
  }
  
  export const PesquisaCandidato = ({ busca, setBusca }: PesquisaProps) => {
    return (
      <div className="max-w-12xl mb-24 text-center md:text-left mx-auto md:mx-0">
        <h2 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter text-white">
        Contrate agora <span className="text-slate-700 underline text-right"></span>
        </h2>
        <h2 className="text-6xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
          <span className="text-slate-700 underline"> Início imediato.</span>
        </h2>
        <p className="text-xl md:text-2xl text-slate-400 leading-relaxed mb-12 max-w-3xl">
          Acesso direto aos talentos #OpenToWork.
        </p>
  
        <div className="relative flex items-center group max-w-6xl">
          <div className="absolute inset-0 bg-blue-600/20 blur-3xl rounded-[2rem] opacity-0 group-focus-within:opacity-100 transition-opacity"></div>
          <input 
            type="text"
            placeholder="Ex: Fullstack .Net Developer C#, Cloud..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="relative w-full px-10 py-8 bg-slate-900/90 border-2 border-slate-800 rounded-[2rem] text-2xl text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500 transition-all shadow-2xl"
          />
        </div>
      </div>
    );
  };