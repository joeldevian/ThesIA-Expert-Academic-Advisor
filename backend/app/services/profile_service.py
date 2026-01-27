from typing import Dict, List, Optional
from pydantic import BaseModel

class ProfileConfig(BaseModel):
    grado: str
    area: str
    sub_area: Optional[str] = None
    nivel: str

class ProfileValidationResult(BaseModel):
    is_valid: bool
    verdict: str
    warnings: List[str]
    errors: List[str]
    requirements: List[str]

class ProfileService:
    GRADES = ["Bachiller", "Título Profesional", "Maestría", "Doctorado"]
    LEVELS = ["Exploratorio", "Descriptivo", "Correlacional", "Explicativo", "Aplicado-Tecnológico"]
    
    @staticmethod
    def validate_profile(config: ProfileConfig) -> ProfileValidationResult:
        warnings = []
        errors = []
        requirements = []
        is_valid = True

        # 1. Validación Grado vs Nivel
        if config.grado == "Bachiller":
            requirements.append("Extensión marco teórico: 15-25 páginas")
            requirements.append("Referencias mínimas: 20-30 fuentes")
            if config.nivel in ["Explicativo"]:
                warnings.append("Investigación explicativa es avanzada para nivel de Bachiller. Te recomendamos nivel Descriptivo o Correlacional.")
        
        elif config.grado == "Título Profesional":
            requirements.append("Extensión marco teórico: 25-40 páginas")
            requirements.append("Referencias mínimas: 30-50 fuentes")
            requirements.append("Requiere validación de la solución propuesta")

        elif config.grado == "Maestría":
            requirements.append("Extensión marco teórico: 40-60 páginas")
            requirements.append("Referencias mínimas: 50-80 fuentes")
            requirements.append("Análisis comparativo con estado del arte obligatorio")
            if config.nivel in ["Exploratorio", "Descriptivo"]:
                warnings.append("Para maestría se espera un nivel Correlacional, Explicativo o Aplicado.")

        elif config.grado == "Doctorado":
            requirements.append("Extensión marco teórico: 60-100 páginas")
            requirements.append("Referencias mínimas: 80-150+ fuentes")
            requirements.append("Contribución científica novedosa obligatoria")
            if config.nivel in ["Exploratorio", "Descriptivo"]:
                errors.append("Una tesis doctoral debe tener nivel Explicativo o proponer un modelo/metodología original.")
                is_valid = False

        # 2. Validación Tecnología (Deep Learning ejemplo)
        if "Deep Learning" in config.area:
            requirements.append("Sección obligatoria: Arquitectura del Modelo")
            requirements.append("Métricas obligatorias: Accuracy, Precision, Recall, F1-Score")
            if config.nivel != "Aplicado-Tecnológico":
                warnings.append("Deep Learning requiere implementación práctica. Se sugiere nivel Aplicado-Tecnológico.")

        verdict = "Configuración válida" if is_valid else "Configuración no permitida"
        
        return ProfileValidationResult(
            is_valid=is_valid,
            verdict=verdict,
            warnings=warnings,
            errors=errors,
            requirements=requirements
        )

profile_service = ProfileService()
