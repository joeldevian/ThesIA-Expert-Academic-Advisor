import React from 'react';
import { AlertTriangle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';

interface DeleteConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    title = "¿Estás absolutamente seguro?",
    description = "Esta acción no se puede deshacer. Esto eliminará permanentemente todos los datos de tu proyecto y restablecerá tu progreso al inicio."
}) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-slate-900 border border-red-500/30 rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-red-500" />

                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
                    >
                        <X size={20} />
                    </button>

                    <div className="p-6">
                        <div className="h-12 w-12 bg-red-500/10 rounded-full flex items-center justify-center mb-4 text-red-500 mx-auto">
                            <AlertTriangle size={24} />
                        </div>

                        <h3 className="text-xl font-bold text-center text-white mb-2">
                            {title}
                        </h3>

                        <p className="text-slate-400 text-center text-sm mb-8 leading-relaxed">
                            {description}
                        </p>

                        <div className="flex gap-3">
                            <button
                                onClick={onClose}
                                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-700 text-slate-300 font-medium text-sm hover:bg-slate-800 transition-colors"
                            >
                                Cancelar
                            </button>
                            <Button
                                onClick={() => {
                                    onConfirm();
                                    onClose();
                                }}
                                className="flex-1 bg-red-600 hover:bg-red-700 text-white border-none"
                            >
                                Sí, eliminar todo
                            </Button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
