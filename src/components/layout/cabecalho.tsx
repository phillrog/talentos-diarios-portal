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
          ? "py-4 bg-white/90 backdrop-blur-2xl border-b border-slate-200 shadow-[0_4px_20px_rgba(0,0,0,0.05)]" 
          : "py-8 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-6 group cursor-pointer">
          <div className="relative scale-110 md:scale-125 transition-transform group-hover:scale-150 duration-500">
            <div className="absolute inset-0 bg-blue-400/20 blur-2xl rounded-full animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-slate-50 to-white p-3 rounded-2xl border border-slate-200 shadow-xl">
              <img src={logo} alt="Logo" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
            </div>
          </div>

          <div className="flex flex-col ml-6">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-[0.8] flex flex-col">
              <span className="text-slate-900 drop-shadow-sm">TALENTOS</span>
              <span className="text-blue-600 drop-shadow-[0_0_15px_rgba(37,99,235,0.2)]">DIÁRIOS</span>
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="h-[2px] w-6 bg-blue-600/30"></div>
              <span className="text-[12px] text-slate-500 font-black tracking-[0.3em] uppercase italic">
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
          className={`hidden md:flex items-center gap-3 px-10 py-4 rounded-full font-black text-xs transition-all duration-500 active:scale-95 shadow-lg group ${
            scrolled 
              ? "bg-slate-900 text-white hover:bg-[#0077b5]" 
              : "bg-slate-900 text-white hover:bg-[#0077b5]"
          }`}
        >
          <FileDown 
            size={18} 
            strokeWidth={3} 
            className="transition-transform duration-300" 
          />
          
          BAIXAR LISTA PDF
        </button>
      </div>
    </header>
  );
};