import React, { useState } from 'react';
import { useThesisStore } from '../../store/useThesisStore';
import { AlertTriangle, Settings } from 'lucide-react';
import { DeleteConfirmationModal } from '../ui/DeleteConfirmationModal';

export const ProjectSettings: React.FC = () => {
    const { resetProject } = useThesisStore();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    return (
        <div className="max-w-4xl mx-auto animate-in fade-in duration-500">
            <div className="bg-slate-900/50 p-8 rounded-3xl border border-slate-800 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-8">
                    <div className="p-3 bg-slate-800 rounded-xl">
                        <Settings className="text-slate-400" size={24} />
                    </div>
                    <div>
                        <h2 className="text-xl font-bold text-white">Configuración del Proyecto</h2>
                        <p className="text-sm text-slate-500">Administra las opciones generales y acciones de riesgo</p>
                    </div>
                </div>

                {/* Zona de Peligro */}
                <div className="bg-red-500/5 p-8 rounded-2xl border border-red-500/20">
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-red-500/10 rounded-full text-red-500 shrink-0">
                            <AlertTriangle size={24} />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-lg font-bold text-red-500 mb-2">Zona de Peligro</h3>
                            <p className="text-slate-400 text-sm mb-6 leading-relaxed">
                                Si decides reiniciar, perderás permanentemente todo el progreso actual,
                                incluyendo la configuración del perfil, avances de capítulos y análisis.
                                <br /><span className="font-bold text-red-400/80">Esta acción no se puede deshacer.</span>
                            </p>

                            <button
                                onClick={() => setIsDeleteModalOpen(true)}
                                className="px-6 py-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-500 text-sm font-bold hover:bg-red-500 hover:text-white transition-all duration-300 flex items-center gap-2 group"
                            >
                                <AlertTriangle size={18} className="group-hover:rotate-12 transition-transform" />
                                Eliminar Proyecto y Reiniciar Entorno
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={resetProject}
            />
        </div>
    );
};
