import type { Candidato } from "../../types/candidato";
import LogoLoop from "./logoloop";
import linkedinIcon from "../../assets/images/linkedin.svg";

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
      <div className="flex items-center gap-5 bg-white border border-slate-200 p-5 rounded-[2.5rem] backdrop-blur-xl w-80 h-32 hover:border-blue-500/50 transition-all duration-300 shadow-lg shadow-slate-200/50">
        <img
          src={c.foto}
          className="w-20 h-20 rounded-[1.5rem] object-cover flex-shrink-0 border border-slate-100 shadow-sm"
          alt={c.nome}
        />

        <div className="flex flex-col min-w-0">
          <span className="text-slate-700 font-black text-lg truncate block tracking-tight">
            {c.nome}
          </span>
          <span className="text-blue-600 text-xs font-bold uppercase tracking-tight truncate block mt-1">
            {c.cargo}
          </span>
          
          <div className="flex items-center gap-2 mt-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400"></span>
            </span>
            <span className="text-green-400 text-[10px] font-black uppercase tracking-widest">
              Início imediato
            </span>
          </div>
          <div className="mt-4 flex items-center">
            <div className="group/link flex items-center gap-2 cursor-pointer">
              <span className="text-blue-600 text-[10px] font-black uppercase tracking-[0.2em] transition-colors group-hover/link:text-blue-400">
                Ver perfil
              </span>
              <div className="flex items-center transition-transform duration-300">
                <img 
                  src={linkedinIcon} 
                  alt="LinkedIn" 
                  className="w-14 h-7 object-contain opacity-90" 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
    href: c.perfil_url,
  }));

  return (
    <div className="w-full py-16">
      {titulo && (
        <p className="text-slate-400 text-[20px] font-black uppercase tracking-[0.5em] mb-12 text-center opacity-80">
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
        fadeOutColor="#ffffff"
        scaleOnHover={true}
      />
    </div>
  );
};