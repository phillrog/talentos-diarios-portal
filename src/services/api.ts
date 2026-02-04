import { Candidato } from "../types/candidato";

const JSON_URL = "https://raw.githubusercontent.com/phillrog/talentos-diarios/refs/heads/main/src/static/candidatos.json";
const PDF_URL = "https://github.com/phillrog/talentos-diarios/raw/main/src/static/talentos_diarios.pdf";

export const candidateService = {
  async getListaCandidatos(): Promise<Candidato[]> {
    const response = await fetch(JSON_URL);
    if (!response.ok) throw new Error("Erro ao carregar candidatos");
    return response.json();
  },

  downloadPDFCandidatos(): void {
    window.open(PDF_URL, '_blank');
  }
};