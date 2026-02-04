import type { Candidato } from "../../types/candidato";
import LogoLoop from "./logoloop";

interface CarrosselProps {
  candidatos: Candidato[];
  titulo?: string;
  velocidade?: number;
  direcao?: "left" | "right" | "up" | "down";
  tamanhoLogo?: number;
}

export const CarrosselCandidatos = ({
  candidatos,
  titulo,
  velocidade = 40,
  direcao = "left",
  tamanhoLogo = 128, 
}: CarrosselProps) => {
  const itensLoop = candidatos.map((c) => ({
    node: (

      <div className="flex items-center gap-5 bg-slate-900/60 border border-white/10 p-5 rounded-[2.5rem] backdrop-blur-xl w-80 h-32 hover:border-blue-500/50 transition-all duration-300 shadow-2xl">
        <img
          src={c.foto}
          className="w-20 h-20 rounded-[1.5rem] object-cover flex-shrink-0 border border-white/5 shadow-md"
          alt={c.nome}
        />

        <div className="flex flex-col min-w-0">
          <span className="text-white font-black text-lg truncate block tracking-tight">
            {c.nome}
          </span>
          <span className="text-blue-400 text-xs font-bold uppercase tracking-tight truncate block mt-1">
            {c.cargo}
          </span>
          
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
    ),
    href: c.perfil_url,
  }));

  return (
    <div className="w-full py-16">
      {titulo && (
        <p className="text-slate-500 text-[20px] font-black uppercase tracking-[0.5em] mb-12 text-center opacity-80">
          {titulo}
        </p>
      )}

      <LogoLoop
        logos={itensLoop}
        speed={velocidade}
        direction={direcao}
        gap={32}
        logoHeight={tamanhoLogo}
        pauseOnHover={true}
        fadeOut={true}
        fadeOutColor="#020617"
        scaleOnHover={true}
      />
    </div>
  );
};