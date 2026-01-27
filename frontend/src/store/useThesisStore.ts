import { create } from 'zustand';

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
}));
