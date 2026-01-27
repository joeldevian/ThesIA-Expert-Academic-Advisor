import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';

import React from 'react';

interface RequireAuthProps {
    children: React.ReactNode;
}

export const RequireAuth = ({ children }: RequireAuthProps) => {
    const { session, loading } = useAuthStore();

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050811] flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    if (!session) {
        return <Navigate to="/" replace />;
    }

    return children;
};
