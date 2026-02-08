import { candidatoService } from '../../services/candidatoService';
import logo from '../../assets/images/logo.png';
import TextType from '../reactbits/texttype';
import { FileDown } from "lucide-react";

interface CabecalhoProps {
  scrolled: boolean;
}

export const Cabecalho = ({ scrolled }: CabecalhoProps) => {
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled 
          ? "py-3 md:py-4 bg-white/90 backdrop-blur-2xl border-b border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.05)]" 
          : "py-5 md:py-8 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
        
        <div className="flex items-center gap-3 md:gap-6 group cursor-pointer">
          <div className="relative scale-90 md:scale-110 transition-transform group-hover:scale-105 md:group-hover:scale-125 duration-500">
            <div className="absolute inset-0 bg-blue-400/20 blur-xl md:blur-2xl rounded-full animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-slate-50 to-white p-2 md:p-3 rounded-xl md:rounded-2xl border border-slate-200 shadow-lg">
              <img src={logo} alt="Logo" className="w-8 h-8 md:w-12 md:h-12 object-contain" />
            </div>
          </div>

          <div className="flex flex-col ml-1 md:ml-6">
            <h1 className="text-2xl md:text-5xl font-black tracking-tighter leading-[0.9] md:leading-[0.8] flex flex-col">
              <span className="text-slate-900 drop-shadow-sm">TALENTOS</span>
              <span className="text-blue-600 drop-shadow-[0_0_15px_rgba(37,99,235,0.2)]">DIÁRIOS</span>
            </h1>
            
            <div className="hidden sm:flex items-center gap-2 mt-1 md:mt-2">
              <div className="h-[2px] w-4 md:w-6 bg-blue-600/30"></div>
              <span className="text-[10px] md:text-[12px] text-slate-500 font-black tracking-[0.2em] md:tracking-[0.3em] uppercase italic">
                <TextType 
                  text={["Talentos Diários", "Open To Work", "Início Imediato"]}
                  typingSpeed={70}
                  pauseDuration={2000}
                  cursorCharacter="_"
                  className="text-green-500"
                />
              </span>
            </div>
          </div>              
        </div>

        <button 
          onClick={() => candidatoService.baixarPdf()}
          className={`flex items-center justify-center gap-3 p-4 md:px-10 md:py-4 rounded-full font-black text-xs transition-all duration-500 active:scale-95 shadow-lg group ${
            scrolled 
              ? "bg-slate-900 text-white hover:bg-[#0077b5]" 
              : "bg-slate-900 text-white hover:bg-[#0077b5]"
          }`}
          title="Baixar Lista PDF"
        >
          <FileDown 
            size={20} 
            strokeWidth={3} 
            className="transition-transform duration-300" 
          />
          
          <span className="hidden md:inline">BAIXAR LISTA PDF</span>
        </button>

      </div>
    </header>
  );
};