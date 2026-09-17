import React, { useState, useMemo } from 'react';
import { Copy, Check, Download, RotateCcw, ShoppingBag, Sparkles } from 'lucide-react';
import { generateStandaloneHtml } from './game/standaloneHtml';

export default function App() {
  const [copied, setCopied] = useState(false);
  const [key, setKey] = useState(0);

  const htmlContent = useMemo(() => generateStandaloneHtml(), []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(htmlContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error('Failed to copy', e);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cashier_sim_supermarket_story.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleReload = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-stone-900 overflow-hidden select-none font-['Poppins']">
      {/* Top Bar for Single File controls in AI Studio */}
      <header className="h-12 bg-stone-950 border-b border-pink-900/40 px-4 flex items-center justify-between z-20 shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-pink-600 to-rose-400 flex items-center justify-center text-white shadow-md shadow-pink-500/20">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <div>
            <h1 className="text-sm font-bold text-pink-100 flex items-center gap-1.5 font-['Baloo_2'] leading-none">
              Cashier Sim: Supermarket Story
              <span className="text-[10px] font-normal px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                Single-File HTML 3D
              </span>
            </h1>
            <p className="text-[10px] text-stone-400 leading-none mt-0.5">
              Three.js Chibi Character Simulator (Full-Body Framing, Scan & Kembalian)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReload}
            title="Reload Game"
            className="p-1.5 rounded-lg bg-stone-800/80 hover:bg-stone-700 text-stone-300 hover:text-white transition-colors cursor-pointer text-xs flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px]">Restart</span>
          </button>

          <button
            onClick={handleDownload}
            title="Download Standalone HTML"
            className="px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 hover:text-white transition-colors cursor-pointer text-xs flex items-center gap-1.5 border border-stone-700"
          >
            <Download className="w-3.5 h-3.5 text-pink-400" />
            <span className="hidden sm:inline text-[11px] font-medium">Download .html</span>
          </button>

          <button
            onClick={handleCopy}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-pink-500/25'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Tersalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Salin Kode HTML</span>
              </>
            )}
          </button>
        </div>
      </header>

      {/* Main Game Preview Frame running the exact standalone single-file HTML */}
      <main className="flex-1 w-full h-full relative bg-black">
        <iframe
          key={key}
          srcDoc={htmlContent}
          title="Cashier Sim: Supermarket Story"
          className="w-full h-full border-0 block"
          sandbox="allow-scripts allow-same-origin allow-modals"
        />
      </main>
    </div>
  );
}
