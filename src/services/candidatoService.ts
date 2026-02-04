import type { Candidato } from "../types/candidato";


const JSON_URL = "https://raw.githubusercontent.com/phillrog/talentos-diarios/refs/heads/main/src/static/candidatos.json";
const PDF_URL = "https://github.com/phillrog/talentos-diarios/raw/main/src/static/talentos_diarios.pdf";

export const candidatoService = {
  async buscarTodos(): Promise<Candidato[]> {
    const resposta = await fetch(JSON_URL);
    if (!resposta.ok) throw new Error("Erro ao carregar candidatos");
    const dados = await resposta.json();
    return dados.filter((c: Candidato) => c.ativo);
  },

  baixarPdf(): void {
    window.open(PDF_URL, '_blank');
  }
};