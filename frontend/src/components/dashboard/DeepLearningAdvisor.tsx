import React, { useState } from 'react';
import { useThesisStore } from '../../store/useThesisStore';
import { Cpu, Database, Network, Zap, HardDrive, Calculator } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input, TextArea } from '../ui/Input';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

export const DeepLearningAdvisor: React.FC = () => {
    const { title } = useThesisStore();
    const [modelType, setModelType] = useState('CNN');
    const [framework, setFramework] = useState('TensorFlow / Keras');
    const [params, setParams] = useState(2.3);
    const [architecture, setArchitecture] = useState<any>(null);
    const [resources, setResources] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleGenerateArchitecture = async () => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:8000/tech/generate-architecture', {
                model_type: modelType,
                framework,
                task_description: title || "Clasificación de imágenes"
            });
            setArchitecture(response.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleEstimateResources = async () => {
        try {
            const response = await axios.post('http://localhost:8000/tech/estimate-resources', {
                params_millions: params
            });
            setResources(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="space-y-6">
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Configuration side */}
                <div className="space-y-6">
                    <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 space-y-6">
                        <h3 className="text-xl font-bold flex items-center gap-2">
                            <Cpu className="text-primary-500" />
                            Configuración Técnica IA
                        </h3>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Arquitectura Base</label>
                                <select
                                    value={modelType}
                                    onChange={(e) => setModelType(e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-500"
                                >
                                    <option>CNN (Convolucional)</option>
                                    <option>RNN / LSTM / GRU</option>
                                    <option>Transformers / ViT</option>
                                    <option>GAN / Autoencoders</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Framework</label>
                                <select
                                    value={framework}
                                    onChange={(e) => setFramework(e.target.value)}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-primary-500"
                                >
                                    <option>TensorFlow / Keras</option>
                                    <option>PyTorch</option>
                                    <option>Scikit-Learn (ML Tradicional)</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                                <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Parámetros del Modelo (Millones)</label>
                                <div className="flex items-center gap-4">
                                    <input
                                        type="range" min="0.1" max="100" step="0.1"
                                        value={params}
                                        onChange={(e) => setParams(parseFloat(e.target.value))}
                                        className="flex-1 accent-primary-500"
                                    />
                                    <span className="text-sm font-bold w-12">{params}M</span>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Button className="flex-1" icon={Network} onClick={handleGenerateArchitecture} isLoading={loading}>Describir Arquitectura</Button>
                                <Button variant="outline" className="flex-1" icon={Calculator} onClick={handleEstimateResources}>Estimar Recursos</Button>
                            </div>
                        </div>
                    </div>

                    {resources && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                            className="bg-primary-600/10 border border-primary-500/20 p-6 rounded-2xl space-y-4"
                        >
                            <h4 className="font-bold flex items-center gap-2 text-primary-400">
                                <HardDrive className="h-4 w-4" /> Estimación de Infraestructura
                            </h4>
                            <div className="grid grid-cols-2 gap-4">
                                <ResourceBlock label="VRAM Requerida" value={`${resources.est_gpu_mem_gb} GB`} icon={<Zap className="h-3 w-3" />} />
                                <ResourceBlock label="Tiempo Colab" value={resources.est_training_time.colab_t4} icon={<ClockIcon className="h-3 w-3" />} />
                            </div>
                            <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-800">
                                <p className="text-[10px] text-primary-400 uppercase font-bold mb-1">Recomendación de Hardware</p>
                                <p className="text-sm font-bold text-white">{resources.recommendation}</p>
                            </div>
                        </motion.div>
                    )}
                </div>

                {/* Architecture Result side */}
                <div className="bg-slate-900/50 rounded-2xl border border-slate-800 overflow-hidden flex flex-col min-h-[500px]">
                    <AnimatePresence mode="wait">
                        {!architecture ? (
                            <div className="flex-1 flex flex-col items-center justify-center text-slate-600 p-12 text-center">
                                <Database className="h-12 w-12 mb-4 opacity-10" />
                                <p>Configura tu red neuronal para generar la descripción técnica de tu arquitectura.</p>
                            </div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                                className="p-8 space-y-6 overflow-y-auto max-h-[700px] custom-scrollbar"
                            >
                                <div>
                                    <h3 className="text-2xl font-bold text-primary-400 mb-2">{architecture.architecture_title}</h3>
                                    <p className="text-sm text-slate-400 leading-relaxed italic border-l-2 border-slate-800 pl-4">
                                        {architecture.description}
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest">Desglose de Capas</h4>
                                    <div className="grid gap-2">
                                        {architecture.layers_breakdown.map((layer: any, i: number) => (
                                            <div key={i} className="flex items-center gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
                                                <div className="h-8 w-8 bg-slate-900 rounded-lg flex items-center justify-center text-[10px] font-bold text-primary-500">#{i + 1}</div>
                                                <div>
                                                    <p className="text-sm font-bold">{layer.layer}</p>
                                                    <p className="text-[11px] text-slate-500">{layer.config}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-primary-500/5 p-4 rounded-xl border border-primary-500/20">
                                    <h4 className="text-xs font-black text-primary-400 uppercase mb-2">Justificación Metodológica</h4>
                                    <p className="text-xs text-slate-300 leading-relaxed">{architecture.rationale}</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

const ResourceBlock = ({ label, value, icon }: { label: string, value: string, icon: React.ReactNode }) => (
    <div className="bg-slate-950/50 p-3 rounded-xl border border-slate-800">
        <p className="text-[10px] text-slate-500 uppercase font-black mb-1 flex items-center gap-1">
            {icon}{label}
        </p>
        <p className="text-sm font-bold text-white">{value}</p>
    </div>
);

const ClockIcon = ({ className }: { className?: string }) => (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
