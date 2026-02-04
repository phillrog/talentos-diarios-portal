import { candidatoService } from '../../services/candidatoService';
import logo from '../../assets/images/logo.png';
import TextType from '../reactbits/texttype';

interface CabecalhoProps {
  scrolled: boolean;
}

export const Cabecalho = ({ scrolled }: CabecalhoProps) => {
  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled 
          ? "py-4 bg-[#020617]/90 backdrop-blur-2xl border-b border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.5)]" 
          : "py-8 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-6 group cursor-pointer">
          <div className="relative scale-110 md:scale-125 transition-transform group-hover:scale-150 duration-500">
            <div className="absolute inset-0 bg-blue-500/40 blur-2xl rounded-full animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-slate-800 to-slate-950 p-3 rounded-2xl border border-white/20 shadow-2xl">
              <img src={logo} alt="Logo" className="w-10 h-10 md:w-12 md:h-12 object-contain" />
            </div>
          </div>

          <div className="flex flex-col ml-6">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-[0.8] flex flex-col">
              <span className="text-white drop-shadow-2xl">TALENTOS</span>
              <span className="text-blue-500 drop-shadow-[0_0_20px_rgba(59,130,246,0.6)]">DIÁRIOS</span>
            </h1>
            <div className="flex items-center gap-2 mt-2">
              <div className="h-[2px] w-6 bg-blue-500/50"></div>
              <span className="text-[12px] text-blue-400 font-black tracking-[0.3em] uppercase italic">
                <TextType 
                  text={["Talentos Diários", "Open To Work", "Início Imediato"]}
                  typingSpeed={70}
                  pauseDuration={2000}
                  cursorCharacter="_"
                  className="text-emerald-400"
                />
              </span>
            </div>
          </div>              
        </div>

        <button 
          onClick={() => candidatoService.baixarPdf()}
          className={`hidden md:flex items-center gap-3 px-10 py-4 rounded-full font-black text-xs transition-all duration-500 active:scale-95 shadow-2xl ${
            scrolled 
              ? "bg-blue-600 text-white hover:bg-white hover:text-black" 
              : "bg-white text-black hover:bg-blue-600 hover:text-white"
          }`}
        >
          BAIXAR LISTA PDF
        </button>
      </div>
    </header>
  );
};