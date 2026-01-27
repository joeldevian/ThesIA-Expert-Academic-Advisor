from app.services.ai_service import ai_service
from app.services.document_service import document_service
from fastapi import UploadFile
import json

class RegulationService:
    @staticmethod
    async def analyze_regulations(pdf_file: UploadFile):
        # 1. Extraer texto del PDF
        text = await document_service.extract_text_from_pdf(pdf_file)
        
        # 2. Enviar a DeepSeek para extraer estructura
        system_prompt = """
        Eres un experto en metodología de investigación y normativa universitaria.
        Tu tarea es analizar el reglamento de tesis proporcionado y extraer la ESTRUCTURA FORMAL requerida (capítulos, secciones, requisitos).
        Debes responder ÚNICAMENTE con un objeto JSON estructurado con el siguiente formato:
        {
          "universidad": "Nombre",
          "facultad": "Nombre",
          "estructura": [
            {
              "capitulo": "Título",
              "secciones": ["subsección 1", "subsección 2"]
            }
          ],
          "formato": {
             "fuente": "tipo",
             "tamano": "puntos",
             "norma_citacion": "APA/IEEE/etc"
          }
        }
        """
        
        # Limitamos el texto para no exceder tokens de contexto si el reglamento es muy largo
        # (En una fase posterior usaríamos RAG para esto)
        sample_text = text[:8000] 
        
        user_prompt = f"Aquí está el contenido del reglamento:\n\n{sample_text}"
        
        response = await ai_service.get_response(system_prompt, user_prompt)
        
        try:
            # Limpiar respuesta por si incluye backticks de markdown
            clean_response = response.strip().replace("```json", "").replace("```", "")
            return json.loads(clean_response)
        except Exception as e:
            return {"error": "No se pudo procesar la respuesta de la IA", "raw": response}

regulation_service = RegulationService()
