import { useEffect, useState, useMemo, useRef } from "react";
import { candidatoService } from "./services/candidatoService";
import type { Candidato } from "./types/candidato";
import OneSignal from "react-onesignal";

// Componentes
import LightRays from "./components/reactbits/lightray";
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
    }).then(() => {
      OneSignal.Debug.setLogLevel("trace");
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
      className="h-screen w-full overflow-y-auto overflow-x-hidden snap-y snap-mandatory bg-[#020617] text-slate-100 scroll-smooth"
    >
      <div className="fixed inset-0 z-0 pointer-events-none">
        <LightRays raysColor="#3b82f6" className="opacity-70" pulsating />
      </div>

      <Cabecalho scrolled={scrolled} />

      <section className="relative z-10 h-screen w-full flex flex-col justify-center items-center snap-start snap-always">
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
          <span className="text-slate-500 text-[12px] font-black uppercase tracking-[0.4em] mb-2">
            Role para baixo
          </span>
          <div className="w-px h-10 bg-blue-500/50"></div>
        </div>
      </section>

      <section className="relative z-20 h-screen w-full flex flex-col justify-center snap-start snap-always px-6">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-6xl md:text-[100px] font-black tracking-tighter text-white leading-[0.9] mb-8">
            Contrate agora.
          </h2>
          <p className="text-xl md:text-3xl lg:text-4xl font-medium text-slate-400 max-w-full md:max-w-none whitespace-normal md:whitespace-nowrap leading-tight">
            Início imediato. Acesso direto aos talentos{" "}
            <span className="text-emerald-500 font-black italic underline decoration-blue-500/30 underline-offset-8 inline-block md:inline">
              #OpenToWork
            </span>.
          </p>
        </div>        
        <div className="w-full absolute bottom-10 flex flex-col items-center animate-bounce">
          <span className="text-slate-500 text-[12px] font-black uppercase tracking-[0.4em] mb-2">
            Role para buscar
          </span>
          <div className="w-px h-10 bg-blue-500/50"></div>
        </div>
      </section>

      <section className="relative z-30 min-h-screen w-full snap-start px-6 pt-24">
        <div className="max-w-7xl mx-auto">
          <div className="sticky top-20 z-50 bg-[#020617]/80 backdrop-blur-xl py-8 mb-10 border-b border-white/10">

            <PesquisaCandidato ref={inputRef} busca={busca} setBusca={setBusca} />
            
            <div className="mt-4 flex justify-between items-center px-2">
              <span className="text-[12px] font-black uppercase tracking-widest text-blue-500">
                Lista de candidatos disponíveis
              </span>
              <span className="text-[12px] font-black uppercase tracking-widest text-slate-500">
                {candidatosFiltrados.length} Resultado(s)
              </span>
            </div>
          </div>

          <div className="pb-32">
            <Lista candidatos={candidatosFiltrados} carregando={carregando} />
          </div>

          <footer className="py-20 text-center border-t border-white/5 opacity-30">
            <p className="text-[10px] font-black uppercase tracking-[0.5em]">
              Talentos Diários • 2026
            </p>
            <p className="text-[10px] font-black uppercase tracking-[0.5em]">
            <b>💡 Disclaimer:</b> Este projeto é uma iniciativa de estudo e portfólio. 
                    O cadastro e a exibição na vitrine visam complementar sua visibilidade, 
                    não garantindo contratações ou propostas.
            </p>
          </footer>
        </div>
      </section>
    </div>
  );
}

export default App;