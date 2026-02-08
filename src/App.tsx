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
      
      // Foco no input apenas em telas maiores para evitar que o teclado mobile suba sozinho
      if (sectionIndex === 2 && window.innerWidth > 768) {
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
      className="h-screen w-full overflow-y-auto overflow-x-hidden md:snap-y md:snap-mandatory bg-slate-50 text-slate-900 scroll-smooth"
    >      
      <Cabecalho scrolled={scrolled} />

      <section className="relative z-10 h-screen w-full flex flex-col justify-center items-center snap-start snap-always bg-white px-4">
        <div style={{ touchAction: 'pan-y' }} className="w-full">
          {!carregando && (
            <CarrosselCandidatos
              candidatos={candidatos}
              titulo="Profissionais prontos para começar hoje"
              velocidade={window.innerWidth < 768 ? 20 : 30} // Velocidade reduzida no mobile
            />
          )}
        </div>
        <div className="absolute bottom-6 md:bottom-10 flex flex-col items-center animate-bounce">
          <span className="text-slate-400 text-[10px] md:text-[12px] font-black uppercase tracking-[0.4em] mb-2">
            Role para baixo
          </span>
          <div className="w-px h-8 md:h-10 bg-blue-600/30"></div>
        </div>
      </section>

      <section className="relative z-20 h-screen w-full flex flex-col justify-center snap-start snap-always px-6 md:px-12 bg-slate-50">
  <div className="max-w-5xl mx-auto w-full">
    <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1] mb-6">
      Sua próxima contratação <br className="hidden md:block" />
      <span className="text-blue-600">começa aqui.</span>
    </h2>
    <p className="text-base sm:text-lg md:text-2xl font-normal text-slate-600 max-w-2xl leading-relaxed">
      Conecte-se diretamente com talentos de alto nível prontos para impacto imediato. 
      Sem burocracia, foco em quem é{" "}
      <span className="text-green-600 font-semibold italic underline decoration-blue-200 underline-offset-4">
        #OpenToWork
      </span>.
    </p>
  </div>        

  <div className="absolute bottom-6 md:bottom-10 left-0 w-full flex flex-col items-center justify-center pointer-events-none">
    <div className="flex flex-col items-center animate-bounce">
      <span className="text-slate-400 text-[10px] md:text-[12px] font-black uppercase tracking-[0.4em] mb-2 mr-[-0.4em]">
        Role para buscar
      </span>
      <div className="w-px h-8 md:h-10 bg-blue-500/50"></div>
    </div>
  </div>
</section>

      <section className="relative z-30 min-h-screen w-full snap-start px-4 md:px-6 pt-20 md:pt-24 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="sticky top-[60px] md:top-[72px] z-50 bg-white/95 backdrop-blur-md py-4 md:py-6 mb-8 border-b border-slate-100">
            <PesquisaCandidato ref={inputRef} busca={busca} setBusca={setBusca} />
            
            <div className="mt-4 md:mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 px-1">
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                Talentos Disponíveis
              </span>
              <span className="text-[10px] md:text-xs font-medium text-slate-400">
                <strong className="text-slate-900">{candidatosFiltrados.length}</strong> profissionais encontrados
              </span>
            </div>
          </div>

          <div className="pb-20 md:pb-32">
            <Lista candidatos={candidatosFiltrados} carregando={carregando} />
          </div>

          <footer className="py-12 md:py-16 text-center border-t border-slate-100">
            <p className="text-[10px] md:text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">
              Talentos Diários • 2026
            </p>
            <div className="max-w-2xl mx-auto px-4">
              <p className="text-[9px] md:text-[10px] leading-relaxed text-slate-400 uppercase tracking-tighter">
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