from app.services.ai_service import ai_service
import json

class ViabilityService:
    @staticmethod
    async def evaluate_thesis_idea(title: str, objective: str, variables: list[str], scope: str):
        system_prompt = """
        Eres un experto metodológico de investigación universitaria de alto nivel. 
        Tu tarea es evaluar la VIABILIDAD de una idea de tesis basada en los datos proporcionados por el estudiante.
        
        Debes analizar:
        1. Claridad del tema.
        2. Relación lógica entre variables.
        3. Factibilidad del alcance (tiempo, recursos, acceso a datos).
        4. Rigurosidad académica inicial.

        Responde ÚNICAMENTE en formato JSON con la siguiente estructura:
        {
          "score": 0-100,
          "verdict": "Viable / Viable con ajustes / No viable",
          "analysis": {
            "strengths": ["punto fuerte 1", ...],
            "weaknesses": ["punto débil 1", ...],
            "recommendations": ["mejora 1", ...]
          },
          "methodological_advice": "Breve consejo experto"
        }
        """
        
        user_prompt = f"""
        Idea de Tesis:
        Título: {title}
        Objetivo General: {objective}
        Variables: {", ".join(variables)}
        Alcance: {scope}
        """
        
        response = await ai_service.get_response(system_prompt, user_prompt)
        
        try:
            clean_response = response.strip().replace("```json", "").replace("```", "")
            return json.loads(clean_response)
        except Exception as e:
            return {"error": "Error al procesar la evaluación", "raw": response}

viability_service = ViabilityService()
