import React from 'react';
import { AlertCircle, X, CreditCard, RefreshCw, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './Button';

interface ErrorModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    message?: string;
    type?: 'insufficient_balance' | 'network_error' | 'generic';
}

export const ErrorModal: React.FC<ErrorModalProps> = ({
    isOpen,
    onClose,
    title = "¡Ups! Algo salió mal",
    message = "Ha ocurrido un error inesperado al procesar tu solicitud.",
    type = 'generic'
}) => {
    if (!isOpen) return null;

    const getIcon = () => {
        switch (type) {
            case 'insufficient_balance': return <CreditCard size={28} />;
            case 'network_error': return <RefreshCw size={28} />;
            default: return <AlertCircle size={28} />;
        }
    };

    const getAccentColor = () => {
        switch (type) {
            case 'insufficient_balance': return 'border-orange-500/30';
            case 'network_error': return 'border-blue-500/30';
            default: return 'border-red-500/30';
        }
    };

    const getStatusLine = () => {
        switch (type) {
            case 'insufficient_balance': return 'bg-orange-500';
            case 'network_error': return 'bg-blue-500';
            default: return 'bg-red-500';
        }
    };

    const getHeaderIconBg = () => {
        switch (type) {
            case 'insufficient_balance': return 'bg-orange-500/10 text-orange-500';
            case 'network_error': return 'bg-blue-500/10 text-blue-500';
            default: return 'bg-red-500/10 text-red-500';
        }
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className={`bg-slate-900 border ${getAccentColor()} rounded-3xl w-full max-w-md shadow-2xl relative overflow-hidden`}
                >
                    <div className={`absolute top-0 left-0 w-full h-1.5 ${getStatusLine()}`} />

                    <button
                        onClick={onClose}
                        className="absolute top-5 right-5 text-slate-500 hover:text-white transition-colors p-1"
                    >
                        <X size={20} />
                    </button>

                    <div className="p-8">
                        <div className={`h-16 w-16 ${getHeaderIconBg()} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                            {getIcon()}
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-3">
                            {title}
                        </h3>

                        <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                            {message}
                        </p>

                        <div className="space-y-3">
                            {type === 'insufficient_balance' && (
                                <a
                                    href="https://platform.deepseek.com/usage"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full"
                                >
                                    <Button className="w-full bg-orange-600 hover:bg-orange-700 border-none shadow-orange-900/20 shadow-lg">
                                        Recargar Saldo en DeepSeek
                                    </Button>
                                </a>
                            )}

                            <Button
                                onClick={onClose}
                                variant="outline"
                                className="w-full border-slate-700 text-slate-300 hover:bg-slate-800"
                            >
                                Entendido
                            </Button>
                        </div>

                        <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                            <span className="flex items-center gap-1.5">
                                <MessageSquare size={12} /> Soporte ThesIA
                            </span>
                            <span>Asistente V2.0</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};
