import React, { useState } from 'react';
import { TextArea } from '../ui/Input';
import { Button } from '../ui/Button';
import { BookOpen, Send, AlertCircle, MessageSquare } from 'lucide-react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useThesisStore } from '../../store/useThesisStore';

export const ChapterOneAdvisor: React.FC = () => {
    const { title } = useThesisStore();
    const [data, setData] = useState({
        problem: '',
        objectives: '',
        justification: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [feedback, setFeedback] = useState<any>(null);

    const handleReview = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:8000/thesis/review-chapter-one', {
                title: title || "Tesis sin título",
                problem_description: data.problem,
                objectives: data.objectives,
                justification: data.justification
            });
            setFeedback(response.data);
        } catch (error) {
            console.error(error);
            alert('Error al revisar el capítulo.');
        } finally {
            setIsLoading(false);
        }
    };

    if (!title) {
        return (
            <div className="bg-slate-900/50 p-12 rounded-2xl border border-slate-800 text-center">
                <BookOpen className="h-12 w-12 text-slate-700 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">Faltan datos del proyecto</h3>
                <p className="text-slate-500">Primero define tu idea en la pestaña de "Viabilidad".</p>
            </div>
        );
    }

    return (
        <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 space-y-6">
                <header>
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <BookOpen className="text-primary-500" />
                        Borrador: Capítulo I
                    </h2>
                    <p className="text-xs text-slate-500 mt-1 truncate">Proyecto: {title}</p>
                </header>

                <TextArea
                    label="Descripción del Problema"
                    placeholder="Describe la situación actual y el problema que detectaste..."
                    value={data.problem}
                    onChange={(e) => setData({ ...data, problem: e.target.value })}
                />

                <TextArea
                    label="Objetivos (General y Específicos)"
                    placeholder="¿Qué vas a hacer? Usa verbos en infinitivo..."
                    value={data.objectives}
                    onChange={(e) => setData({ ...data, objectives: e.target.value })}
                />

                <TextArea
                    label="Justificación"
                    placeholder="¿Por qué es importante esta investigación?"
                    value={data.justification}
                    onChange={(e) => setData({ ...data, justification: e.target.value })}
                />

                <Button
                    className="w-full"
                    icon={Send}
                    onClick={handleReview}
                    disabled={isLoading}
                    isLoading={isLoading}
                >
                    Enviar a Revisión de Asesor
                </Button>
            </div>

            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 flex flex-col min-h-[500px]">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <MessageSquare className="text-primary-400" />
                    Retroalimentación de IA
                </h2>

                {!feedback ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-slate-500 text-center px-8">
                        <AlertCircle className="h-12 w-12 mb-4 opacity-10" />
                        <p>Escribe tus borradores y presiona enviar. Analizaré la coherencia de tu primer capítulo.</p>
                    </div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="space-y-6 overflow-y-auto pr-2 custom-scrollbar"
                    >
                        {/* Feedbacks cards ... */}
                        <div className="bg-primary-500/10 p-4 rounded-xl border border-primary-500/20">
                            <p className="text-sm text-primary-200 italic">" {feedback.feedback_general} "</p>
                        </div>

                        <div className="space-y-4">
                            {feedback.revisions.map((rev: any, i: number) => (
                                <div key={i} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                                    <div className="flex justify-between items-center mb-2">
                                        <h4 className="font-bold text-slate-200">{rev.section}</h4>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase ${rev.evaluation === 'Buena' ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'
                                            }`}>
                                            {rev.evaluation}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-400 leading-relaxed">{rev.suggestions}</p>
                                </div>
                            ))}
                        </div>

                        <div className="bg-slate-800/40 p-4 rounded-xl border border-slate-700">
                            <h4 className="text-sm font-bold text-slate-200 mb-2">Párrafo Sugerido</h4>
                            <p className="text-xs text-slate-300 leading-relaxed font-light italic">
                                {feedback.draft_suggestion}
                            </p>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};
