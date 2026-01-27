import React from 'react';
import { Button } from '../components/ui/Button';
import { Brain, FileText, CheckCircle, GraduationCap, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/useAuthStore';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#0f172a] text-white">
            {/* Hero Section */}
            <header className="relative overflow-hidden pt-6 pb-32">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary-900/20 via-transparent to-transparent -z-10" />

                <nav className="container mx-auto px-6 h-16 flex items-center justify-between mb-10">
                    <div className="flex items-center gap-2">
                        <div className="bg-primary-600 p-2 rounded-xl">
                            <Brain className="h-6 w-6" />
                        </div>
                        <span className="text-2xl font-bold tracking-tight">ThesIA</span>
                    </div>
                    <div className="flex items-center gap-6 text-sm font-medium text-slate-400">
                        <a href="#features" className="hover:text-white transition-colors">Funciones</a>
                        <a href="#about" className="hover:text-white transition-colors">Metodología</a>
                        <Button variant="ghost" onClick={() => useAuthStore.getState().signInWithGoogle()}>Iniciar Sesión</Button>
                        <Button size="sm" onClick={() => navigate('/dashboard')}>Ir al Dashboard</Button>
                    </div>
                </nav>

                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-block px-4 py-1.5 mb-6 text-sm font-medium rounded-full bg-primary-500/10 text-primary-400 border border-primary-500/20">
                            Asesor Metodológico con IA - Beta v0.1
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400 leading-tight">
                            Domina tu Tesis con <br /> <span className="text-primary-500">Asesoría Inteligente</span>
                        </h1>
                        <p className="max-w-2xl mx-auto text-xl text-slate-400 mb-10 leading-relaxed">
                            Guía paso a paso, análisis de reglamentos universitarios y evaluación
                            de viabilidad técnica. La herramienta definitiva para terminar tu carrera.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" icon={GraduationCap} onClick={() => {
                                const session = useAuthStore.getState().session;
                                if (session) {
                                    navigate('/dashboard');
                                } else {
                                    useAuthStore.getState().signInWithGoogle();
                                }
                            }}>Comenzar mi Proyecto</Button>
                            <Button size="lg" variant="outline" icon={ChevronRight}>Ver Demo</Button>
                        </div>
                    </motion.div>
                </div>
            </header>

            {/* Features Grid */}
            <section id="features" className="py-24 bg-slate-900/50">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8">
                        <FeatureCard
                            icon={<FileText className="h-8 w-8 text-primary-500" />}
                            title="Análisis de Reglamentos"
                            description="Sube el PDF de tu universidad y extraemos la estructura formal requerida automáticamente."
                        />
                        <FeatureCard
                            icon={<CheckCircle className="h-8 w-8 text-primary-500" />}
                            title="Evaluación de Viabilidad"
                            description="Nuestra IA analiza tu tema y variables para decirte qué tan factible es tu investigación."
                        />
                        <FeatureCard
                            icon={<Brain className="h-8 w-8 text-primary-500" />}
                            title="Asesoría Metodológica"
                            description="Sugerencias inteligentes capítulo a capítulo, cuidando la coherencia y rigurosidad académica."
                        />
                    </div>
                </div>
            </section>
        </div>
    );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-primary-500/30 transition-all group">
        <div className="mb-6 p-3 rounded-xl bg-primary-500/10 w-fit group-hover:bg-primary-500/20 transition-all">
            {icon}
        </div>
        <h3 className="text-xl font-bold mb-4">{title}</h3>
        <p className="text-slate-400 leading-relaxed">{description}</p>
    </div>
);

export default LandingPage;
