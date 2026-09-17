import React, { useState } from 'react';
import { GDD_CHAPTERS } from '../data/gddData';
import { playClickSFX, playPageFoundSFX, playSpellUnlockedSFX, playDangerStinger } from '../utils/audioSynth';
import { BookOpen, Search, Download, Copy, Check, Sparkles, Lightbulb, CheckCircle, FileText, ChevronRight } from 'lucide-react';

export const GddDocumentViewer: React.FC = () => {
  const [selectedChapterId, setSelectedChapterId] = useState<string>('ch1');
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);

  const activeChapter = GDD_CHAPTERS.find((c) => c.id === selectedChapterId) || GDD_CHAPTERS[0];

  const filteredChapters = GDD_CHAPTERS.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopyChapter = () => {
    navigator.clipboard.writeText(
      `# ${activeChapter.title}: ${activeChapter.subtitle}\n\n${activeChapter.content}\n\n## Creative Director Rationale:\n${activeChapter.directorNotes}`
    );
    setCopied(true);
    playClickSFX();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFullGDD = () => {
    playPageFoundSFX();
    let fullText = `# GAME DESIGN DOCUMENT: THE QUEST LEDGER\n`;
    fullText += `*Lead Creative Director & Senior Game Developer Proposal*\n\n`;
    GDD_CHAPTERS.forEach((ch) => {
      fullText += `\n========================================\n`;
      fullText += `## ${ch.title} - ${ch.subtitle}\n`;
      fullText += `Ringkasan: ${ch.summary}\n`;
      fullText += `\n${ch.content}\n`;
      fullText += `\n> **Creative Director Rationale:**\n> ${ch.directorNotes}\n`;
      fullText += `\n**Poin Kunci:**\n`;
      ch.keyTakeaways.forEach((k) => (fullText += `- ${k}\n`));
      fullText += `\n`;
    });

    const blob = new Blob([fullText], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'GDD_The_Quest_Ledger_Official.md');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* LEFT COLUMN: Table of Contents & Search */}
      <div className="lg:col-span-4 space-y-4">
        <div className="bg-stone-900/90 border border-stone-700 rounded-2xl p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="font-cinzel text-sm font-bold text-amber-200 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-amber-400" />
              Daftar Bab Dokumen (GDD)
            </h3>
            <span className="text-[10px] font-mono text-stone-400 bg-stone-800 px-2 py-0.5 rounded">
              8 Bab Lengkap
            </span>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari mekanik, lore, palet..."
              className="w-full bg-stone-950 border border-stone-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
            />
          </div>

          {/* Chapter Links */}
          <div className="space-y-1.5 max-h-[520px] overflow-y-auto pr-1">
            {filteredChapters.map((ch) => (
              <button
                key={ch.id}
                onClick={() => {
                  playClickSFX();
                  setSelectedChapterId(ch.id);
                }}
                className={`w-full p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  selectedChapterId === ch.id
                    ? 'bg-amber-950/50 border-amber-400 text-amber-100 shadow'
                    : 'bg-stone-950/60 border-stone-800 text-stone-300 hover:border-stone-700'
                }`}
              >
                <div className="pr-2">
                  <div className="text-xs font-bold font-cinzel line-clamp-1">{ch.title}</div>
                  <div className="text-[10px] text-stone-400 line-clamp-1 mt-0.5 font-body">
                    {ch.subtitle}
                  </div>
                </div>
                <ChevronRight
                  className={`w-4 h-4 shrink-0 ${
                    selectedChapterId === ch.id ? 'text-amber-400' : 'text-stone-600'
                  }`}
                />
              </button>
            ))}
          </div>

          {/* Download Full GDD Markdown Button */}
          <button
            onClick={handleDownloadFullGDD}
            className="w-full py-2.5 px-3 bg-amber-600 hover:bg-amber-500 text-stone-950 text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-lg mt-2"
          >
            <Download className="w-4 h-4" />
            <span>Ekspor Seluruh GDD (.md)</span>
          </button>
        </div>
      </div>

      {/* RIGHT COLUMN: Chapter Reading Canvas */}
      <div className="lg:col-span-8 bg-stone-900/90 border border-stone-700 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-800">
          <div>
            <div className="text-[11px] font-mono text-amber-400 uppercase tracking-widest mb-1">
              Bab 0{activeChapter.number} · GDD Proposal
            </div>
            <h1 className="font-cinzel text-xl sm:text-2xl font-bold text-amber-100">
              {activeChapter.title}
            </h1>
            <p className="text-xs text-stone-400 mt-1 font-body">{activeChapter.subtitle}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyChapter}
              className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer border border-stone-700"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              <span>{copied ? 'Tersalin!' : 'Salin Bab'}</span>
            </button>
          </div>
        </div>

        {/* Key Takeaways Badges */}
        <div className="bg-stone-950 p-4 rounded-xl border border-stone-800 space-y-2">
          <div className="text-[11px] font-mono text-amber-400 font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            RINGKASAN EKSEKUTIF & POIN KUNCI DESAIN:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {activeChapter.keyTakeaways.map((point, idx) => (
              <div
                key={idx}
                className="text-xs text-stone-300 flex items-start gap-1.5 font-body leading-relaxed"
              >
                <CheckCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Content Body */}
        <div className="prose prose-invert max-w-none text-stone-300 text-sm font-body leading-relaxed space-y-4">
          {activeChapter.content.split('\n\n').map((paragraph, idx) => {
            const trimmed = paragraph.trim();
            if (!trimmed) return null;

            if (trimmed.startsWith('### ')) {
              return (
                <h3
                  key={idx}
                  className="font-cinzel text-base font-bold text-amber-200 mt-6 pt-2 border-b border-stone-800 pb-1"
                >
                  {trimmed.replace('### ', '')}
                </h3>
              );
            }
            if (trimmed.startsWith('#### ')) {
              return (
                <h4 key={idx} className="font-cinzel text-sm font-bold text-amber-300 mt-4">
                  {trimmed.replace('#### ', '')}
                </h4>
              );
            }
            if (trimmed.startsWith('> ')) {
              return (
                <blockquote
                  key={idx}
                  className="border-l-4 border-amber-500 bg-amber-950/20 p-4 rounded-r-xl italic text-amber-200/90 my-3 font-cinzel"
                >
                  {trimmed.replace('> ', '')}
                </blockquote>
              );
            }

            return (
              <p key={idx} className="leading-relaxed">
                {trimmed}
              </p>
            );
          })}
        </div>

        {/* Creative Director Rationale Box */}
        <div className="p-5 bg-gradient-to-r from-amber-950/40 to-stone-900 border-2 border-amber-600/40 rounded-xl space-y-2 shadow-lg">
          <div className="flex items-center gap-2 text-xs font-cinzel font-bold text-amber-300">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            CATATAN SENIOR GAME DEVELOPER & CREATIVE DIRECTOR (RATIONALE):
          </div>
          <p className="text-xs text-stone-200 font-body leading-relaxed italic">
            "{activeChapter.directorNotes}"
          </p>
        </div>

        {/* Audio Demo Buttons for Chapter 7 */}
        {activeChapter.number === 7 && (
          <div className="p-4 bg-stone-950 border border-stone-800 rounded-xl space-y-2">
            <span className="text-xs font-bold text-amber-300 font-mono block">
              🎵 Tes Langsung Audio Synthesizer 8-Bit (Bab 7 Audio Design):
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => playPageFoundSFX()}
                className="px-3 py-1.5 bg-amber-600/30 hover:bg-amber-600/40 border border-amber-500 text-amber-200 text-xs rounded-lg cursor-pointer"
              >
                Tes "Page Discovered Fanfare"
              </button>
              <button
                onClick={() => playSpellUnlockedSFX()}
                className="px-3 py-1.5 bg-cyan-600/30 hover:bg-cyan-600/40 border border-cyan-500 text-cyan-200 text-xs rounded-lg cursor-pointer"
              >
                Tes "Spell Unlocked Cadence"
              </button>
              <button
                onClick={() => playDangerStinger()}
                className="px-3 py-1.5 bg-rose-600/30 hover:bg-rose-600/40 border border-rose-500 text-rose-200 text-xs rounded-lg cursor-pointer"
              >
                Tes "Boss Danger Pulse"
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
