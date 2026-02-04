import React, { useEffect, useState, useMemo } from 'react';
import { candidatoService } from './services/candidatoService';
import type { Candidato } from './types/candidato';
import LightRays from './components/reactbits/lightray';
import { Cabecalho } from './components/layout/cabecalho';
import { Lista } from './components/layout/lista';
import { PesquisaCandidato } from './components/layout/pesquisa';


function App() {
  const [candidatos, setCandidatos] = useState<Candidato[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [busca, setBusca] = useState("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    candidatoService.buscarTodos()
      .then(setCandidatos)
      .finally(() => setCarregando(false));
  }, []);

  const candidatosFiltrados = useMemo(() => {
    const termo = busca.toLowerCase();
    return candidatos.filter(c => 
      c.nome.toLowerCase().includes(termo) || 
      c.cargo.toLowerCase().includes(termo)
    );
  }, [busca, candidatos]);

  return (
    <div className="relative min-h-screen bg-[#020617] text-slate-100 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <LightRays
          raysOrigin="top-center"
          raysColor="#3b82f6"
          className="opacity-90"
          pulsating={true}
          saturation={2}
        />
      </div>

      <div className="relative z-10">
        <Cabecalho scrolled={scrolled} />
        
        <main className="max-w-7xl mx-auto px-6 pt-48 pb-24">
          <PesquisaCandidato busca={busca} setBusca={setBusca} />
          <Lista candidatos={candidatosFiltrados} carregando={carregando} />
        </main>
      </div>
    </div>
  );
}

export default App;