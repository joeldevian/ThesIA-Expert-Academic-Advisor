import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface ThesisState {
    // Basic Info
    title: string;
    objective: string;
    variables: string;
    scope: string;

    // Profile Info
    grado: string;
    area: string;
    subArea: string;
    nivel: string;
    profileValidation: any | null;

    regulationStructure: any | null;
    analysisResult: any | null;

    // Actions
    setTitle: (title: string) => void;
    setObjective: (objective: string) => void;
    setVariables: (variables: string) => void;
    setScope: (scope: string) => void;
    setGrado: (grado: string) => void;
    setArea: (area: string) => void;
    setSubArea: (subArea: string) => void;
    setNivel: (nivel: string) => void;
    setProfileValidation: (validation: any) => void;
    setRegulationStructure: (structure: any) => void;
    setAnalysisResult: (result: any) => void;
    resetProject: () => void;

    // Persistence
    isLoading: boolean;
    fetchUserProject: () => Promise<void>;
    saveUserProject: () => Promise<void>;
}

export const useThesisStore = create<ThesisState>((set) => ({
    title: '',
    objective: '',
    variables: '',
    scope: '',
    grado: '',
    area: '',
    subArea: '',
    nivel: '',
    profileValidation: null,
    regulationStructure: null,
    analysisResult: null,

    setTitle: (title) => set({ title }),
    setObjective: (objective) => set({ objective }),
    setVariables: (variables) => set({ variables }),
    setScope: (scope) => set({ scope }),
    setGrado: (grado) => set({ grado }),
    setArea: (area) => set({ area }),
    setSubArea: (subArea) => set({ subArea }),
    setNivel: (nivel) => set({ nivel }),
    setProfileValidation: (profileValidation) => set({ profileValidation }),
    setRegulationStructure: (regulationStructure) => set({ regulationStructure }),
    setAnalysisResult: (analysisResult) => set({ analysisResult }),

    resetProject: () => set({
        title: '',
        objective: '',
        variables: '',
        scope: '',
        grado: '',
        area: '',
        subArea: '',
        nivel: '',
        profileValidation: null,
        regulationStructure: null,
        analysisResult: null,
    }),

    isLoading: false,

    fetchUserProject: async () => {
        set({ isLoading: true });
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data } = await supabase
                .from('projects')
                .select('content')
                .eq('user_id', user.id)
                .single();

            if (data && data.content) {
                set({ ...data.content });
                console.log('Proyecto cargado desde Supabase');
            }
        } catch (error) {
            console.error('Error cargando proyecto:', error);
        } finally {
            set({ isLoading: false });
        }
    },

    saveUserProject: async () => {
        const state = useThesisStore.getState();
        const content = {
            title: state.title,
            objective: state.objective,
            variables: state.variables,
            scope: state.scope,
            grado: state.grado,
            area: state.area,
            subArea: state.subArea,
            nivel: state.nivel,
            profileValidation: state.profileValidation,
            regulationStructure: state.regulationStructure,
            analysisResult: state.analysisResult,
        };

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { error } = await supabase
            .from('projects')
            .upsert({
                user_id: user.id,
                content,
                updated_at: new Date()
            }, { onConflict: 'user_id' });

        if (error) console.error('Error guardando proyecto:', error);
    }
}));

// Auto-save subscription with debounce
let saveTimeout: ReturnType<typeof setTimeout>;
useThesisStore.subscribe((state) => {
    // Check if relevant fields changed to avoid infinite loops or saving on loading
    if (state.isLoading) return;

    // Simple check to see if we should save (avoid saving on resetProject or initial load if exact same)
    // For now, save on any change after loading is done.

    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(() => {
        useThesisStore.getState().saveUserProject();
    }, 2000); // Save after 2 seconds of inactivity
});
