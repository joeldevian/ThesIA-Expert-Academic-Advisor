import React, { useState } from 'react';
import { Input, TextArea } from '../ui/Input';
import { Button } from '../ui/Button';
import { Target, Sparkles, TrendingUp, AlertTriangle, Lightbulb } from 'lucide-react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { useThesisStore } from '../../store/useThesisStore';

export const ViabilityAnalyzer: React.FC = () => {
    const { title, objective, variables, scope, setTitle, setObjective, setVariables, setScope } = useThesisStore();
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleEvaluate = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post('http://localhost:8000/thesis/evaluate-viability', {
                title,
                objective,
                variables: variables.split(',').map(v => v.trim()).filter(v => v !== ''),
                scope
            });
            setResult(response.data);
        } catch (error) {
            console.error('Error al evaluar:', error);
            alert('Error al conectar con el servidor de evaluación.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
                {/* Form Section */}
                <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 space-y-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Sparkles className="text-primary-500" />
                        Definición de tu Idea
                    </h2>

                    <Input
                        label="Título tentativo de la investigación"
                        placeholder="Ej: Impacto de la IA en la productividad de PYMES..."
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <TextArea
                        label="Objetivo General"
                        placeholder="¿Qué buscas demostrar o lograr?"
                        value={objective}
                        onChange={(e) => setObjective(e.target.value)}
                    />

                    <Input
                        label="Variables (separadas por coma)"
                        placeholder="Ej: Productividad, Inteligencia Artificial, PYMES"
                        value={variables}
                        onChange={(e) => setVariables(e.target.value)}
                    />

                    <TextArea
                        label="Alcance y Recursos"
                        placeholder="¿Dónde se aplicará? ¿Tienes acceso a los datos?"
                        value={scope}
                        onChange={(e) => setScope(e.target.value)}
                    />

                    <Button
                        className="w-full"
                        size="lg"
                        icon={TrendingUp}
                        onClick={handleEvaluate}
                        disabled={isLoading || !title}
                        isLoading={isLoading}
                    >
                        Evaluar con DeepSeek
                    </Button>
                </div>

                {/* Analysis Result Section */}
                <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 flex flex-col min-h-[400px]">
                    <h2 className="text-xl font-bold mb-6">Análisis del Asesor Metodológico</h2>

                    <AnimatePresence mode="wait">
                        {!result ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex-1 flex flex-col items-center justify-center text-slate-500 text-center px-8"
                            >
                                <Target className="h-16 w-12 mb-4 opacity-10" />
                                <p>Ingresa los datos de tu idea de tesis a la izquierda para que nuestra IA evalúe su factibilidad académica.</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center justify-between bg-slate-950 p-4 rounded-xl border border-slate-800">
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase tracking-wider">Puntaje de Viabilidad</p>
                                        <p className={`text-3xl font-bold ${result.score > 70 ? 'text-green-500' : 'text-yellow-500'}`}>
                                            {result.score}/100
                                        </p>
                                    </div>
                                    <div className={`px-4 py-2 rounded-lg font-bold ${result.verdict === 'Viable' ? 'bg-green-500/10 text-green-500' :
                                            result.verdict === 'No viable' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-500'
                                        }`}>
                                        {result.verdict}
                                    </div>
                                </div>
                                {/* ... resto del componente igual ... */}
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                                        <h4 className="text-sm font-bold text-green-500 flex items-center gap-2 mb-3">
                                            <CheckCircle className="h-4 w-4" /> Fortalezas
                                        </h4>
                                        <ul className="text-xs text-slate-400 space-y-2">
                                            {result.analysis.strengths.map((s: string, i: number) => <li key={i}>• {s}</li>)}
                                        </ul>
                                    </div>
                                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                                        <h4 className="text-sm font-bold text-red-500 flex items-center gap-2 mb-3">
                                            <AlertTriangle className="h-4 w-4" /> Debilidades
                                        </h4>
                                        <ul className="text-xs text-slate-400 space-y-2">
                                            {result.analysis.weaknesses.map((w: string, i: number) => <li key={i}>• {w}</li>)}
                                        </ul>
                                    </div>
                                </div>

                                <div className="p-4 bg-primary-500/5 rounded-xl border border-primary-500/20">
                                    <h4 className="text-sm font-bold text-primary-400 flex items-center gap-2 mb-2">
                                        <Lightbulb className="h-4 w-4" /> Recomendaciones Expertas
                                    </h4>
                                    <ul className="text-xs text-slate-400 space-y-2">
                                        {result.analysis.recommendations.map((r: string, i: number) => <li key={i}>- {r}</li>)}
                                    </ul>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

const CheckCircle = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
