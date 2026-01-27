import React, { useState } from 'react';
import { Button } from '../ui/Button';
import { Network, ChevronDown, ChevronRight, FileJson, Download, Plus } from 'lucide-react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useThesisStore } from '../../store/useThesisStore';

export const StructureGenerator: React.FC = () => {
    const { title, objective, analysisResult } = useThesisStore();
    const regulationStructure = analysisResult?.estructura;

    const [isLoading, setIsLoading] = useState(false);
    const [structure, setStructure] = useState<any | null>(null);
    const [expandedChapters, setExpandedChapters] = useState<number[]>([]);

    const handleGenerate = async () => {
        if (!title) return;
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:8000/thesis/generate-structure', {
                title,
                objective,
                regulation_structure: regulationStructure
            });
            setStructure(response.data);
            setExpandedChapters(response.data.chapters.map((_: any, i: number) => i));
        } catch (error) {
            console.error('Error:', error);
            alert('Error al generar la estructura.');
        } finally {
            setIsLoading(false);
        }
    };

    const toggleChapter = (index: number) => {
        setExpandedChapters(prev =>
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        );
    };

    if (!title) {
        return (
            <div className="bg-slate-900/50 p-12 rounded-2xl border border-slate-800 text-center">
                <Network className="h-12 w-12 text-slate-700 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Faltan datos del proyecto</h3>
                <p className="text-slate-500">Primero define tu idea en la pestaña de "Viabilidad".</p>
            </div>
        );
    }

    return (
        <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Network className="text-primary-500" />
                        Esqueleto de la Tesis
                    </h2>
                    <p className="text-sm text-slate-500">Genera una ruta detallada basada en tu tema y reglamento.</p>
                </div>
                {!structure && (
                    <Button
                        onClick={handleGenerate}
                        isLoading={isLoading}
                        icon={Plus}
                    >
                        Generar Estructura
                    </Button>
                )}
            </div>

            <AnimatePresence>
                {!structure ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="py-20 text-center text-slate-600 border-2 border-dashed border-slate-800 rounded-xl"
                    >
                        <FileJson className="mx-auto h-12 w-12 mb-4 opacity-10" />
                        <p>Haz clic en "Generar Estructura" para crear tu plan de trabajo.</p>
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <div className="flex justify-between items-center bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6 font-medium text-primary-400">
                            <span className="truncate pr-4">Tesis: {structure.thesis_title}</span>
                            <Button variant="ghost" size="sm" icon={Download}>Exportar PDF</Button>
                        </div>

                        {structure.chapters.map((chapter: any, idx: number) => (
                            <div key={idx} className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden">
                                <button
                                    onClick={() => toggleChapter(idx)}
                                    className="w-full text-left p-4 flex items-center justify-between hover:bg-slate-900 transition-colors"
                                >
                                    <span className="font-bold text-slate-200">{chapter.title}</span>
                                    {expandedChapters.includes(idx) ? <ChevronDown /> : <ChevronRight />}
                                </button>

                                <AnimatePresence>
                                    {expandedChapters.includes(idx) && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="border-t border-slate-800"
                                        >
                                            <div className="p-4 space-y-4">
                                                {chapter.sections.map((section: any, sIdx: number) => (
                                                    <div key={sIdx} className="pl-4 border-l-2 border-primary-500/30">
                                                        <h4 className="text-sm font-semibold text-slate-300 mb-1">{section.name}</h4>
                                                        <p className="text-xs text-slate-500 leading-relaxed font-light italic">
                                                            {section.description}
                                                        </p>
                                                    </div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
