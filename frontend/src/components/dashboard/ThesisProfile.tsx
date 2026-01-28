import React, { useEffect } from 'react';
import { useThesisStore } from '../../store/useThesisStore';
import { Award, BookOpen, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';


export const ThesisProfile: React.FC = () => {
    const {
        grado, setGrado,
        area, setArea,
        nivel, setNivel,
        profileValidation, setProfileValidation
    } = useThesisStore();

    const areas = [
        "Desarrollo de Software",
        "Inteligencia Artificial & Machine Learning",
        "Deep Learning & Redes Neuronales",
        "Ciberseguridad",
        "Ciencia de Datos & Big Data",
        "Internet de las Cosas (IoT)",
        "Redes y Telecomunicaciones",
        "Sistemas de Información Empresarial",
        "DevOps & Cloud Computing"
    ];

    const grados = ["Bachiller", "Título Profesional", "Maestría", "Doctorado"];
    const niveles = ["Exploratorio", "Descriptivo", "Correlacional", "Explicativo", "Aplicado-Tecnológico"];

    const validate = async () => {
        if (!grado || !area || !nivel) return;
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'}/profile/validate`, {
                grado, area, nivel
            });
            setProfileValidation(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        validate();
    }, [grado, area, nivel]);

    return (
        <div className="grid lg:grid-cols-2 gap-8 animate-in fade-in duration-500">
            <div className="space-y-6">
                <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 space-y-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <Award className="text-primary-500" />
                        Configuración Académica
                    </h2>

                    <div className="space-y-4">
                        <section>
                            <label className="text-sm font-medium text-slate-400 block mb-2">Grado Académico</label>
                            <div className="grid grid-cols-2 gap-2">
                                {grados.map(g => (
                                    <button
                                        key={g}
                                        onClick={() => setGrado(g)}
                                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${grado === g ? 'bg-primary-600 border-primary-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700'}`}
                                    >
                                        {g}
                                    </button>
                                ))}
                            </div>
                        </section>

                        <section>
                            <label className="text-sm font-medium text-slate-400 block mb-2">Área Tecnológica</label>
                            <select
                                value={area}
                                onChange={(e) => setArea(e.target.value)}
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                            >
                                <option value="">Selecciona un área</option>
                                {areas.map(a => <option key={a} value={a}>{a}</option>)}
                            </select>
                        </section>

                        <section>
                            <label className="text-sm font-medium text-slate-400 block mb-2">Nivel de Investigación</label>
                            <div className="space-y-2">
                                {niveles.map(n => (
                                    <button
                                        key={n}
                                        onClick={() => setNivel(n)}
                                        className={`w-full text-left px-4 py-3 rounded-xl border transition-all flex items-center justify-between ${nivel === n ? 'bg-primary-600/10 border-primary-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700'}`}
                                    >
                                        <span className="text-xs font-bold">{n}</span>
                                        {nivel === n && <CheckCircle className="h-4 w-4 text-primary-500" />}
                                    </button>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            <div className="space-y-6">
                <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800 min-h-[400px]">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Info className="text-primary-400" />
                        Validación de Perfil
                    </h2>

                    <AnimatePresence mode="wait">
                        {!profileValidation ? (
                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center py-20 text-slate-600 text-center"
                            >
                                <BookOpen className="h-12 w-12 mb-4 opacity-10" />
                                <p className="text-sm">Configura tu grado y área para recibir el análisis metodológico.</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                                className="space-y-6"
                            >
                                <div className={`p-4 rounded-xl border flex items-center justify-between ${profileValidation.is_valid ? 'bg-green-500/10 border-green-500/20 text-green-500' : 'bg-red-500/10 border-red-500/20 text-red-500'}`}>
                                    <span className="font-bold text-sm uppercase tracking-widest">{profileValidation.verdict}</span>
                                    {profileValidation.is_valid ? <CheckCircle /> : <AlertTriangle />}
                                </div>

                                {profileValidation.errors.length > 0 && (
                                    <div className="bg-red-500/5 border border-red-500/20 p-4 rounded-xl">
                                        <h4 className="text-xs font-black text-red-500 uppercase mb-2">Errores Críticos</h4>
                                        <ul className="space-y-1">
                                            {profileValidation.errors.map((e: string, i: number) => <li key={i} className="text-xs text-red-400">• {e}</li>)}
                                        </ul>
                                    </div>
                                )}

                                {profileValidation.warnings.length > 0 && (
                                    <div className="bg-yellow-500/5 border border-yellow-500/20 p-4 rounded-xl">
                                        <h4 className="text-xs font-black text-yellow-500 uppercase mb-2">Advertencias Metodológicas</h4>
                                        <ul className="space-y-1">
                                            {profileValidation.warnings.map((w: string, i: number) => <li key={i} className="text-xs text-yellow-400/80">• {w}</li>)}
                                        </ul>
                                    </div>
                                )}

                                <div className="bg-primary-500/5 border border-primary-500/20 p-4 rounded-xl">
                                    <h4 className="text-xs font-black text-primary-400 uppercase mb-3">Requisitos según Grado</h4>
                                    <div className="grid gap-2">
                                        {profileValidation.requirements.map((r: string, i: number) => (
                                            <div key={i} className="bg-slate-950 p-2 rounded-lg border border-slate-800 text-[10px] text-slate-300">
                                                {r}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </div>
    );
};
