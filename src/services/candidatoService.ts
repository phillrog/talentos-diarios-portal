import type { Candidato } from "../types/candidato";
import mockDados from "../mock.json";

const JSON_URL = "https://raw.githubusercontent.com/phillrog/talentos-diarios/refs/heads/main/src/static/candidatos.json";
const PDF_URL = "https://github.com/phillrog/talentos-diarios/raw/main/src/static/talentos_diarios.pdf";

const isMockEnabled = import.meta.env.VITE_USE_MOCK_CANDIDATOS === "true";

const embaralharLista = (lista: Candidato[]): Candidato[] => {
  const novaLista = [...lista];
  for (let i = novaLista.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [novaLista[i], novaLista[j]] = [novaLista[j], novaLista[i]];
  }
  return novaLista;
};

const formatarUrl = (url: string): string => {
  if (!url) return "";
  const link = url.trim();
  // Verifica se já começa com http:// ou https://
  if (/^https?:\/\//i.test(link)) {
    return link;
  }
  return `https://${link}`;
};

export const candidatoService = {
  async buscarTodos(): Promise<Candidato[]> {
    let candidatos: Candidato[] = [];

    if (isMockEnabled) {
      candidatos = (mockDados as unknown) as Candidato[];
      console.log("Usando dados mock:", candidatos.length, "candidatos");
      
      // Simulação de delay para o mock
      await new Promise(resolve => setTimeout(resolve, 500));
    } else {
      const resposta = await fetch(JSON_URL);
      if (!resposta.ok) throw new Error("Erro ao carregar candidatos");
      const dados = await resposta.json();
      candidatos = dados.filter((c: Candidato) => c.ativo);
    }

    const candidatosFormatados = candidatos.map(c => ({
      ...c,
      perfil_url: formatarUrl(c.perfil_url)
    }));
    
    return embaralharLista(candidatosFormatados);
  },

  baixarPdf(): void {
    window.open(PDF_URL, '_blank');
  }
  
};