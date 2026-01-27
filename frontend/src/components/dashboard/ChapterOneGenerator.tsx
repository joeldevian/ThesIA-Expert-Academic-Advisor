import React, { useState } from 'react';
import { useThesisStore } from '../../store/useThesisStore';
import { Zap, CheckCircle, AlertCircle, Download, Send } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input, TextArea } from '../ui/Input';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

export const ChapterOneGenerator: React.FC = () => {
    const { grado, area, nivel } = useThesisStore();
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        empresa: '',
        problemas: '',
        consecuencias: '',
        datos_cuantitativos: '',
        solucion_propuesta: '',
        tecnologias: '',
        resultados_esperados: ''
    });
    const [loading, setLoading] = useState(false);
    const [fullChapter, setFullChapter] = useState<any>(null);

    const handleGenerate = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8000/writing/generate-full-chapter', {
                data: formData,
                profile: { grado, area, nivel }
            });
            setFullChapter(response.data);
            setStep(4);
        } catch (error) {
            console.error(error);
            alert("Error al generar el capítulo.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <header className="text-center space-y-2">
                <div className="h-12 w-12 bg-primary-600/20 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-primary-500/30">
                    <Zap className="text-primary-500 h-6 w-6" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight">Generador de Capítulo I (Nivel 3)</h2>
                <p className="text-slate-500 text-sm">Completa la información clave para proyectar un borrador de 15 páginas.</p>
            </header>

            {/* Step Progress */}
            <div className="flex justify-between items-center px-12 mb-12">
                {[1, 2, 3].map(i => (
                    <div key={i} className={`flex items-center gap-2 ${step >= i ? 'text-primary-500' : 'text-slate-700'}`}>
                        <div className={`h-8 w-8 rounded-full border-2 flex items-center justify-center font-bold text-xs ${step === i ? 'border-primary-500 bg-primary-500/10' : 'border-slate-800'}`}>
                            {i}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">
                            {i === 1 ? 'Contexto' : i === 2 ? 'Problema' : 'Propuesta'}
                        </span>
                    </div>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {step === 1 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800 space-y-6">
                        <h3 className="text-lg font-bold">Paso 1: Contexto e Institución</h3>
                        <Input label="Nombre de la Institución / Empresa" placeholder="Ej: Corporación Tecnológica XYZ S.A.C." value={formData.empresa} onChange={(e) => setFormData({ ...formData, empresa: e.target.value })} />
                        <TextArea label="Datos Cuantitativos Relevantes" placeholder="Ej: Pérdida mensual de $10k, 20% de retraso en producción..." value={formData.datos_cuantitativos} onChange={(e) => setFormData({ ...formData, datos_cuantitativos: e.target.value })} />
                        <Button className="w-full" onClick={() => setStep(2)}>Siguiente: El Problema</Button>
                    </motion.div>
                )}

                {step === 2 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800 space-y-6">
                        <h3 className="text-lg font-bold">Paso 2: Detalles de la Problemática</h3>
                        <TextArea label="Describe los problemas observados" placeholder="¿Qué está fallando exactamente?" value={formData.problemas} onChange={(e) => setFormData({ ...formData, problemas: e.target.value })} />
                        <TextArea label="Consecuencias del problema" placeholder="¿Qué pasará si no se resuelve?" value={formData.consecuencias} onChange={(e) => setFormData({ ...formData, consecuencias: e.target.value })} />
                        <div className="flex gap-3">
                            <Button variant="outline" className="flex-1" onClick={() => setStep(1)}>Atrás</Button>
                            <Button className="flex-1" onClick={() => setStep(3)}>Siguiente: La Propuesta</Button>
                        </div>
                    </motion.div>
                )}

                {step === 3 && (
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800 space-y-6">
                        <h3 className="text-lg font-bold">Paso 3: Tu Solución Tecnológica</h3>
                        <Input label="Título de tu Propuesta" placeholder="Ej: Implementación de un modelo de visión artificial..." value={formData.solucion_propuesta} onChange={(e) => setFormData({ ...formData, solucion_propuesta: e.target.value })} />
                        <TextArea label="Tecnologías a utilizar" placeholder="Ej: Python, TensorFlow, Docker, AWS..." value={formData.tecnologias} onChange={(e) => setFormData({ ...formData, tecnologias: e.target.value })} />
                        <TextArea label="Resultados Esperados" placeholder="¿Qué mejoras cuantitativas esperas?" value={formData.resultados_esperados} onChange={(e) => setFormData({ ...formData, resultados_esperados: e.target.value })} />
                        <div className="flex gap-3">
                            <Button variant="outline" className="flex-1" onClick={() => setStep(2)}>Atrás</Button>
                            <Button className="flex-1" icon={Send} onClick={handleGenerate} isLoading={loading}>Generar Capítulo Completo</Button>
                        </div>
                    </motion.div>
                )}

                {step === 4 && fullChapter && (
                    <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
                        <div className="flex justify-between items-center bg-green-500/10 border border-green-500/20 p-6 rounded-3xl">
                            <div>
                                <h3 className="text-xl font-bold text-green-500 flex items-center gap-2">
                                    <CheckCircle className="h-5 w-5" /> ¡Borrador Generado con Éxito!
                                </h3>
                                <p className="text-xs text-green-400 mt-1">Estimado: 15 páginas • Calidad Académica: {fullChapter.academic_tone_score}%</p>
                            </div>
                            <Button variant="outline" icon={Download}>Descargar PDF</Button>
                        </div>

                        <div className="grid gap-6">
                            {fullChapter.sections.map((section: any, i: number) => (
                                <div key={i} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                                    <div className="bg-slate-800/50 px-6 py-3 border-b border-slate-800 flex justify-between items-center">
                                        <span className="text-xs font-black text-primary-400 uppercase tracking-widest">{section.id} {section.title}</span>
                                        <Button variant="ghost" size="sm">Editar</Button>
                                    </div>
                                    <div className="p-8 prose prose-invert max-w-none">
                                        <p className="text-sm text-slate-300 leading-relaxed font-light whitespace-pre-wrap">{section.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 border-dashed text-center">
                            <AlertCircle className="mx-auto h-8 w-8 text-yellow-500 mb-2 opacity-50" />
                            <p className="text-sm text-slate-500">Recuerda revisar y validar las citas simuladas con bibliografía real en la pestaña "Marco Teórico".</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
