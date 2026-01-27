from app.services.ai_service import ai_service
import json

class ChapterOneService:
    @staticmethod
    async def review_chapter_one(title: str, problem_description: str, objectives: str, justification: str):
        system_prompt = """
        Eres un asesor de tesis experto. Tu tarea es revisar el Capítulo I (Planteamiento del Problema) de un estudiante.
        Debes evaluar la COHERENCIA entre:
        1. El Problema descrito.
        2. Los Objetivos planteados.
        3. La Justificación de la investigación.

        Analiza si el problema está bien delimitado, si los objetivos son medibles y si la justificación es sólida.

        Responde ÚNICAMENTE en formato JSON:
        {
          "feedback_general": "Resumen experto",
          "revisions": [
            {"section": "Problema", "evaluation": "Buena/Regular/Mejorable", "suggestions": "Tips específicos"},
            {"section": "Objetivos", "evaluation": "Buena/Regular/Mejorable", "suggestions": "Tips específicos"},
            {"section": "Justificación", "evaluation": "Buena/Regular/Mejorable", "suggestions": "Tips específicos"}
          ],
          "draft_suggestion": "Un párrafo sugerido que mejore la conexión de estas ideas."
        }
        """
        
        user_prompt = f"""
        Tesis: {title}
        Borrador del Capítulo 1:
        - Descripción del Problema: {problem_description}
        - Objetivos: {objectives}
        - Justificación: {justification}
        """
        
        response = await ai_service.get_response(system_prompt, user_prompt)
        
        try:
            clean_response = response.strip().replace("```json", "").replace("```", "")
            return json.loads(clean_response)
        except Exception as e:
            return {"error": "Error al procesar la revisión", "raw": response}

chapter_one_service = ChapterOneService()
