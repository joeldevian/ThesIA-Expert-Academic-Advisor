import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input: React.FC<InputProps> = ({ label, error, className = '', ...props }) => {
    return (
        <div className="w-full space-y-1.5">
            {label && <label className="text-sm font-medium text-slate-400 ml-1">{label}</label>}
            <input
                className={`w-full bg-slate-950 border ${error ? 'border-red-500' : 'border-slate-800'} 
        rounded-lg px-4 py-2 text-white transition-all focus:outline-none focus:ring-2 
        focus:ring-primary-500/50 focus:border-primary-500 placeholder:text-slate-600 ${className}`}
                {...props}
            />
            {error && <p className="text-xs text-red-500 ml-1">{error}</p>}
        </div>
    );
};

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, error, className = '', ...props }) => {
    return (
        <div className="w-full space-y-1.5">
            {label && <label className="text-sm font-medium text-slate-400 ml-1">{label}</label>}
            <textarea
                className={`w-full bg-slate-950 border ${error ? 'border-red-500' : 'border-slate-800'} 
        rounded-lg px-4 py-2 text-white transition-all focus:outline-none focus:ring-2 
        focus:ring-primary-500/50 focus:border-primary-500 placeholder:text-slate-600 min-h-[100px] ${className}`}
                {...props}
            />
            {error && <p className="text-xs text-red-500 ml-1">{error}</p>}
        </div>
    );
};
