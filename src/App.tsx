import { useEffect, useState, useMemo, useRef } from "react";
import { candidatoService } from "./services/candidatoService";
import type { Candidato } from "./types/candidato";
import OneSignal from "react-onesignal";

// Componentes
import { Cabecalho } from "./components/layout/cabecalho";
import { Lista } from "./components/layout/lista";
import { PesquisaCandidato } from "./components/layout/pesquisa";
import { CarrosselCandidatos } from "./components/reactbits/carrosselcandidatos";

function App() {
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState("");
  const [scrolled, setScrolled] = useState(false);
  
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const container = document.getElementById("main-container");

    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      const currentScroll = target.scrollTop;
      
      setScrolled(currentScroll > 100);

      const sectionIndex = Math.round(currentScroll / window.innerHeight);
      
      if (sectionIndex === 2) {
        setTimeout(() => {
          inputRef.current?.focus();
        }, 600);
      }
    };

    container?.addEventListener("scroll", handleScroll);
    return () => container?.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    candidatoService
      .buscarTodos()
      .then(setCandidatos)
      .finally(() => setCarregando(false));
  }, []);

  useEffect(() => {
    OneSignal.init({
      appId: import.meta.env.VITE_ONESIGNAL_APP_ID,
      allowLocalhostAsSecureOrigin: true,      
    });
  }, []);

  const candidatosFiltrados = useMemo(() => {
    const termo = busca.toLowerCase();
    return candidatos.filter(
      (c) =>
        c.nome.toLowerCase().includes(termo) ||
        c.cargo.toLowerCase().includes(termo)
    );
  }, [busca, candidatos]);

  return (
    <div
      id="main-container"
      className="h-screen w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory bg-slate-50 text-slate-900 scroll-smooth"
    >      
      
      <Cabecalho scrolled={scrolled} />

      <section className="relative z-10 h-screen w-full flex flex-col justify-center items-center snap-start snap-always bg-white">
        <div style={{ touchAction: 'pan-y' }} className="w-full">
          {!carregando && (
            <CarrosselCandidatos
              candidatos={candidatos}
              titulo="Profissionais prontos para começar hoje"
              velocidade={30}
            />
          )}
        </div>
        <div className="absolute bottom-10 flex flex-col items-center animate-bounce">
          <span className="text-slate-400 text-[12px] font-black uppercase tracking-[0.4em] mb-2">
            Role para baixo
          </span>
          <div className="w-px h-10 bg-blue-600/30"></div>
        </div>
      </section>

      <section className="relative z-20 h-screen w-full flex flex-col justify-center snap-start snap-always px-6 bg-slate-50">
        <div className="max-w-5xl mx-auto w-full">
          <h2 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-tight mb-6">
            Sua próxima contratação <br />
            <span className="text-blue-600">começa aqui.</span>
          </h2>
          <p className="text-lg md:text-2xl font-normal text-slate-600 max-w-2xl leading-relaxed">
            Conecte-se diretamente com talentos de alto nível prontos para impacto imediato. 
            Sem burocracia, foco em quem é{" "}
            <span className="text-green-600 font-semibold italic underline decoration-blue-200 underline-offset-4">
              #OpenToWork
            </span>.
          </p>
        </div>        
        <div className="w-full absolute bottom-10 flex flex-col items-center animate-bounce">
          <span className="text-slate-400 text-[12px] font-black uppercase tracking-[0.4em] mb-2">
            Role para buscar
          </span>
          <div className="w-px h-10 bg-blue-500/50"></div>
        </div>
      </section>

      <section className="relative z-30 min-h-screen w-full snap-start px-6 pt-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="sticky top-[72px] z-50 bg-white/95 backdrop-blur-md py-6 mb-8 border-b border-slate-100">
            <PesquisaCandidato ref={inputRef} busca={busca} setBusca={setBusca} />
            
            <div className="mt-6 flex justify-between items-center px-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                Talentos Disponíveis
              </span>
              <span className="text-xs font-medium text-slate-400">
                <strong className="text-slate-900">{candidatosFiltrados.length}</strong> profissionais encontrados
              </span>
            </div>
          </div>

          <div className="pb-32">
            <Lista candidatos={candidatosFiltrados} carregando={carregando} />
          </div>

          <footer className="py-16 text-center border-t border-slate-100">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">
              Talentos Diários • 2026
            </p>
            <div className="max-w-2xl mx-auto">
              <p className="text-[10px] leading-relaxed text-slate-400 uppercase tracking-tighter">
                <b>💡 Aviso:</b> Este projeto é uma vitrine de talentos para fins de estudo. 
                A plataforma facilita a conexão, mas não intermedeia contratações.
              </p>
            </div>
          </footer>
        </div>
      </section>
    </div>
  );
}

export default App;