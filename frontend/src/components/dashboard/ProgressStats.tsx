import React from 'react';
import { motion } from 'framer-motion';
import { Award } from 'lucide-react';

interface ProgressStatProps {
    label: string;
    value: number;
    total: number;
    color: string;
}

export const ProgressStats: React.FC<ProgressStatProps> = ({ label, value, total, color }) => {
    const percentage = Math.round((value / total) * 100);

    return (
        <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 backdrop-blur-sm">
            <div className="flex justify-between items-end mb-3">
                <span className="text-sm font-medium text-slate-400">{label}</span>
                <span className={`text-2xl font-bold text-${color}-500`}>{percentage}%</span>
            </div>
            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className={`h-full bg-${color}-500 shadow-[0_0_10px_rgba(var(--tw-gradient-stops),0.5)]`}
                />
            </div>
        </div>
    );
};

export const ThesisOverview: React.FC = () => {


    return (
        <div className="grid md:grid-cols-4 gap-6 mb-8">
            <ProgressStats label="Avance General" value={0} total={100} color="primary" />
            <ProgressStats label="Capítulo I" value={0} total={100} color="green" />
            <ProgressStats label="Marco Teórico" value={0} total={100} color="yellow" />
            <div className="bg-primary-600/10 p-5 rounded-2xl border border-primary-500/20 flex items-center gap-4">
                <div className="bg-primary-600 p-3 rounded-xl">
                    <Award className="h-6 w-6 text-white" />
                </div>
                <div>
                    <p className="text-xs text-primary-400 font-bold uppercase">Estado actual</p>
                    <p className="text-sm font-semibold text-white">Inicio de Proyecto</p>
                </div>
            </div>
        </div>
    );
};
