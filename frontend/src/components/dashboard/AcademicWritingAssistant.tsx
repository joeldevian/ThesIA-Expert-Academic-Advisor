import React, { useState } from 'react';
import { TextArea } from '../ui/Input';
import { Button } from '../ui/Button';
import { PenTool, Wand2, CheckCircle2, Copy, RotateCcw, Sparkles } from 'lucide-react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

export const AcademicWritingAssistant: React.FC = () => {
    const [mode, setMode] = useState<'manual' | 'semi'>('manual');
    const [draft, setDraft] = useState('');
    const [analysis, setAnalysis] = useState<any>(null);
    const [versions, setVersions] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleAnalyze = async () => {
        if (!draft) return;
        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'}/thesis/expand-text`, { text: draft });
            setAnalysis(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateVersions = async () => {
        if (!draft) return;
        setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'}/writing/generate-versions`, {
                context_info: draft,
                style_request: "Ingeniería de Sistemas - Tesis"
            });
            setVersions(response.data);
            setMode('semi');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        alert("¡Copiado al portapapeles!");
    };

    return (
        <div className="space-y-6">
            <header className="flex justify-between items-center bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
                <div className="flex gap-2">
                    <button
                        onClick={() => setMode('manual')}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${mode === 'manual' ? 'bg-primary-600 text-white' : 'text-slate-500 hover:text-white'}`}
                    >
                        <PenTool className="h-4 w-4" /> Modo Guía Manual
                    </button>
                    <button
                        onClick={() => setMode('semi')}
                        className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${mode === 'semi' ? 'bg-primary-600 text-white' : 'text-slate-500 hover:text-white'}`}
                    >
                        <Wand2 className="h-4 w-4" /> Modo Semi-Automático
                    </button>
                </div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                    V2 Redacción
                </div>
            </header>

            <div className="grid lg:grid-cols-2 gap-8">
                {/* Input Section */}
                <div className="space-y-4">
                    <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 space-y-4">
                        <TextArea
                            label="Escribe tu idea o borrador aquí"
                            placeholder="Ej: Vamos a crear un sistema con IA para mejorar la seguridad..."
                            value={draft}
                            onChange={(e) => setDraft(e.target.value)}
                            className="min-h-[200px]"
                        />
                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={handleAnalyze}
                                isLoading={loading && mode === 'manual'}
                                icon={SearchIcon}
                            >
                                Analizar Estilo
                            </Button>
                            <Button
                                className="flex-1"
                                onClick={handleGenerateVersions}
                                isLoading={loading && mode === 'semi'}
                                icon={Sparkles}
                            >
                                Generar Versiones
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Output Section */}
                <div className="bg-slate-900/50 rounded-2xl border border-slate-800 overflow-hidden flex flex-col min-h-[400px]">
                    <AnimatePresence mode="wait">
                        {mode === 'manual' && analysis ? (
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="p-6 space-y-6"
                            >
                                <h3 className="font-bold flex items-center gap-2 text-primary-400">
                                    <CheckCircle2 className="h-5 w-5" /> Revisión en Tiempo Real
                                </h3>

                                <div className="space-y-3">
                                    {analysis.issues?.map((issue: any, i: number) => (
                                        <div key={i} className="bg-slate-950 p-4 rounded-xl border border-slate-800 border-l-4 border-l-yellow-500">
                                            <p className="text-xs font-bold text-yellow-500 mb-1">Problema detectado: {issue.problem}</p>
                                            <p className="text-sm text-slate-300 mb-2 italic">"{issue.match}"</p>
                                            <p className="text-xs text-slate-500 uppercase font-black">Sugerencia:</p>
                                            <p className="text-sm text-primary-400 font-bold">{issue.suggestion}</p>
                                        </div>
                                    ))}
                                    {(!analysis.issues || analysis.issues.length === 0) && (
                                        <div className="text-center py-20 text-slate-600">
                                            <CheckCircle2 className="h-12 w-12 mx-auto mb-4 opacity-10" />
                                            <p>No se detectaron problemas críticos de estilo.</p>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        ) : mode === 'semi' && versions ? (
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                className="p-6 space-y-6"
                            >
                                <h3 className="font-bold flex items-center gap-2 text-primary-400">
                                    <Sparkles className="h-5 w-5" /> Versiones Académicas Generadas
                                </h3>

                                <VersionCard title="VERSIÓN FORMAL" text={versions.v1_formal} onCopy={() => copyToClipboard(versions.v1_formal)} />
                                <VersionCard title="VERSIÓN TÉCNICA / ESTADÍSTICA" text={versions.v2_statistical} onCopy={() => copyToClipboard(versions.v2_statistical)} />
                                <VersionCard title="VERSIÓN MARCO TEÓRICO" text={versions.v3_theoretical} onCopy={() => copyToClipboard(versions.v3_theoretical)} />
                            </motion.div>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-slate-600 p-12 text-center">
                                <RotateCcw className="h-12 w-12 mb-4 opacity-10" />
                                <p>Analiza tu borrador o genera versiones para ver los resultados aquí.</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

const VersionCard = ({ title, text, onCopy }: { title: string, text: string, onCopy: () => void }) => (
    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
        <div className="flex justify-between items-center">
            <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{title}</span>
            <button onClick={onCopy} className="text-slate-500 hover:text-primary-500 transition-colors">
                <Copy className="h-4 w-4" />
            </button>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed italic">"{text}"</p>
    </div>
);

const SearchIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
);
