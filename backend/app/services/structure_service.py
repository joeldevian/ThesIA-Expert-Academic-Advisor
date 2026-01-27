from app.services.ai_service import ai_service
import json

class StructureService:
    @staticmethod
    async def generate_structure(title: str, objective: str, regulation_structure: list = None):
        system_prompt = """
        Eres un experto en metodología de investigación. Tu tarea es generar la TABLA DE CONTENIDOS (Estructura) detallada para una tesis.
        
        Si se proporciona una estructura de reglamento, DEBES seguirla estrictamente, pero desglosando los subpuntos necesarios para el tema específico.
        Si NO hay reglamento, usa la estructura académica estándar (I. Introducción, II. Marco Teórico, III. Metodología, IV. Resultados, V. Discusión).

        Responde ÚNICAMENTE en formato JSON:
        {
          "thesis_title": "Título",
          "chapters": [
            {
              "title": "Capítulo I: ...",
              "sections": [
                {"name": "1.1 ...", "description": "Qué debe contener esta sección"},
                {"name": "1.2 ...", "description": "Qué debe contener esta sección"}
              ]
            }
          ]
        }
        """

        regulation_info = f"Estructura del Reglamento a seguir: {json.dumps(regulation_structure)}" if regulation_structure else "No hay reglamento cargado, usa estándar APA/Metodológico."
        
        user_prompt = f"""
        Tema de Tesis: {title}
        Objetivo: {objective}
        {regulation_info}
        """

        response = await ai_service.get_response(system_prompt, user_prompt)
        
        try:
            clean_response = response.strip().replace("```json", "").replace("```", "")
            return json.loads(clean_response)
        except Exception as e:
            return {"error": "Error al generar la estructura", "raw": response}

structure_service = StructureService()
