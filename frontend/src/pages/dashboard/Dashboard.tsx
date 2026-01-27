import React, { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Upload, FileText, LayoutDashboard, Sparkles, Network, BookOpen, Bell, User, Brain, UserCircle, PenTool, Cpu, Zap, AlertTriangle } from 'lucide-react';
import axios from 'axios';
import { ViabilityAnalyzer } from '../../components/dashboard/ViabilityAnalyzer';
import { StructureGenerator } from '../../components/dashboard/StructureGenerator';
import { ChapterOneAdvisor } from '../../components/dashboard/ChapterOneAdvisor';
import { ThesisOverview } from '../../components/dashboard/ProgressStats';
import { ThesisProfile } from '../../components/dashboard/ThesisProfile';
import { AcademicWritingAssistant } from '../../components/dashboard/AcademicWritingAssistant';
import { DeepLearningAdvisor } from '../../components/dashboard/DeepLearningAdvisor';
import { ChapterOneGenerator } from '../../components/dashboard/ChapterOneGenerator';
import { motion, AnimatePresence } from 'framer-motion';
import { useThesisStore } from '../../store/useThesisStore';

const Dashboard: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'profile' | 'regulations' | 'viability' | 'writing' | 'tech' | 'structure' | 'chapter1' | 'chapter_auto'>('profile');
    const { analysisResult, setAnalysisResult, grado, area } = useThesisStore();

    // States for local management
    const [file, setFile] = useState<File | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!file) return;
        setIsLoading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:8000/analyze/regulations', formData);
            setAnalysisResult(response.data);
        } catch (error) {
            console.error('Error:', error);
            alert('Error al conectar con el servidor.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050811] text-white selection:bg-primary-500/30">
            <div className="max-w-7xl mx-auto px-6 py-8">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div className="flex items-center gap-4">
                        <div className="h-14 w-14 bg-gradient-to-br from-primary-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-xl shadow-primary-500/20">
                            <Brain className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                                Mi Proyecto de <span className="text-primary-500">Tesis</span>
                            </h1>
                            <div className="flex items-center gap-2 text-slate-500 text-sm mt-1">
                                <span className="px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800">Versión 2.0</span>
                                <span>•</span>
                                <span className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                    DeepSeek AI V3 Activo
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="hidden lg:flex flex-col text-right mr-4 border-r border-slate-800 pr-4">
                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Contexto</span>
                            <span className="text-xs font-bold text-primary-400">{grado || 'No definido'}</span>
                            <span className="text-[9px] text-slate-600 truncate max-w-[150px]">{area || 'Esperando perfil...'}</span>
                        </div>
                        <button className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-colors">
                            <Bell className="h-5 w-5 text-slate-400" />
                        </button>
                        <div className="h-10 w-px bg-slate-800 mx-2 hidden md:block" />
                        <div className="flex items-center gap-3 pl-2">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold">Joel Ircanaupa</p>
                                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Estudiante de Sistemas</p>
                            </div>
                            <div className="h-10 w-10 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700">
                                <User className="h-5 w-5 text-slate-400" />
                            </div>
                        </div>
                    </div>
                </header>

                <AnimatePresence>
                    {useThesisStore.getState().profileValidation && !useThesisStore.getState().profileValidation.is_valid && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                            className="mb-8 bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center justify-between"
                        >
                            <div className="flex items-center gap-3">
                                <AlertTriangle className="text-red-500 h-5 w-5" />
                                <div>
                                    <p className="text-sm font-bold text-red-500">Incoherencia Académica Detectada</p>
                                    <p className="text-xs text-red-400/80">Revisa la pestaña "Mi Perfil" para corregir errores críticos en tu configuración de tesis.</p>
                                </div>
                            </div>
                            <Button size="sm" variant="outline" onClick={() => setActiveTab('profile')}>Corregir Ahora</Button>
                        </motion.div>
                    )}
                </AnimatePresence>

                <ThesisOverview />

                <div className="flex flex-col lg:flex-row gap-8">
                    <aside className="lg:w-64 flex-shrink-0">
                        <nav className="space-y-2 sticky top-8">
                            <NavButton active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} icon={<UserCircle />} label="Mi Perfil" />
                            <NavButton active={activeTab === 'regulations'} onClick={() => setActiveTab('regulations')} icon={<FileText />} label="Reglamento" />
                            <NavButton active={activeTab === 'viability'} onClick={() => setActiveTab('viability')} icon={<Sparkles />} label="Viabilidad" />
                            <NavButton active={activeTab === 'writing'} onClick={() => setActiveTab('writing')} icon={<PenTool />} label="Redacción V2" />
                            <NavButton active={activeTab === 'chapter_auto'} onClick={() => setActiveTab('chapter_auto')} icon={<Zap />} label="Gen. Automática" />
                            <NavButton active={activeTab === 'tech'} onClick={() => setActiveTab('tech')} icon={<Cpu />} label="Asesor Técnico" />
                            <NavButton active={activeTab === 'structure'} onClick={() => setActiveTab('structure')} icon={<Network />} label="Estructura" />
                            <NavButton active={activeTab === 'chapter1'} onClick={() => setActiveTab('chapter1')} icon={<BookOpen />} label="Revisión Cap I" />
                        </nav>
                    </aside>

                    <main className="flex-1 min-h-[600px] bg-slate-900/30 rounded-3xl border border-slate-800/50 p-8 backdrop-blur-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-600/5 blur-[120px] -z-10" />

                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.3 }}
                            >
                                {activeTab === 'profile' && <ThesisProfile />}
                                {activeTab === 'writing' && <AcademicWritingAssistant />}
                                {activeTab === 'tech' && <DeepLearningAdvisor />}
                                {activeTab === 'chapter_auto' && <ChapterOneGenerator />}

                                {activeTab === 'regulations' && (
                                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                        <div className="lg:col-span-1 space-y-6">
                                            <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
                                                <h3 className="font-bold mb-4 flex items-center gap-2">
                                                    <Upload className="h-4 w-4 text-primary-500" />
                                                    Base del Proyecto
                                                </h3>
                                                <div className="border-2 border-dashed border-slate-800 rounded-2xl p-8 text-center hover:border-primary-500/40 transition-all cursor-pointer group mb-6">
                                                    <input type="file" id="pdfInput" className="hidden" accept=".pdf" onChange={handleFileChange} />
                                                    <label htmlFor="pdfInput" className="cursor-pointer">
                                                        <div className="h-12 w-12 bg-slate-800 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                                                            <FileText className="text-slate-500" />
                                                        </div>
                                                        <p className="text-sm text-slate-400 font-medium">
                                                            {file ? file.name : "Subir Reglamento (PDF)"}
                                                        </p>
                                                    </label>
                                                </div>
                                                <Button className="w-full h-12 rounded-xl" onClick={handleUpload} disabled={!file || isLoading} isLoading={isLoading}>
                                                    Inicializar Proyecto
                                                </Button>
                                            </div>
                                        </div>

                                        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-8 rounded-2xl">
                                            <div className="flex justify-between items-center mb-8">
                                                <h3 className="text-xl font-bold">Estructura Formal Sugerida</h3>
                                                {analysisResult && (
                                                    <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-bold border border-green-500/20">
                                                        V2.0 Engine
                                                    </span>
                                                )}
                                            </div>

                                            {!analysisResult ? (
                                                <div className="flex flex-col items-center justify-center py-24 text-slate-600">
                                                    <LayoutDashboard className="h-14 w-14 mb-4 opacity-5" />
                                                    <p className="text-sm font-medium">Carga un reglamento para visualizar las reglas universitarias.</p>
                                                </div>
                                            ) : (
                                                <div className="space-y-6">
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <InfoBlock label="Institución" value={analysisResult.universidad} />
                                                        <InfoBlock label="Sistema Citación" value={analysisResult.formato?.norma_citacion} />
                                                    </div>
                                                    <div className="space-y-3 mt-6">
                                                        {analysisResult.estructura?.map((cap: any, i: number) => (
                                                            <div key={i} className="p-4 bg-slate-800/40 rounded-xl border border-slate-700/50 hover:bg-slate-800/60 transition-colors">
                                                                <p className="text-sm font-bold text-slate-200">{cap.capitulo} <span className="text-[10px] text-primary-500 opacity-50 ml-2">Normativa Verificada</span></p>
                                                                <div className="flex flex-wrap gap-2 mt-2">
                                                                    {cap.secciones?.map((s: string, j: number) => (
                                                                        <span key={j} className="px-2 py-0.5 bg-slate-900/50 rounded-md text-[10px] text-slate-400 border border-slate-800">{s}</span>
                                                                    ))}
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {activeTab === 'viability' && <ViabilityAnalyzer />}
                                {activeTab === 'structure' && <StructureGenerator />}
                                {activeTab === 'chapter1' && <ChapterOneAdvisor />}
                            </motion.div>
                        </AnimatePresence>
                    </main>
                </div>
            </div>
        </div>
    );
};

const NavButton = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: React.ReactElement, label: string }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-sm font-bold transition-all duration-300 ${active
            ? 'bg-primary-600 text-white shadow-xl shadow-primary-500/20 translate-x-1'
            : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900/50'
            }`}
    >
        {React.cloneElement(icon, { size: 20 } as React.SVGAttributes<SVGElement>)}
        {label}
    </button>
);

const InfoBlock = ({ label, value }: { label: string, value: string }) => (
    <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
        <p className="text-[10px] text-slate-500 uppercase font-black tracking-widest mb-1">{label}</p>
        <p className="text-sm font-bold truncate">{value || 'N/A'}</p>
    </div>
);

export default Dashboard;
