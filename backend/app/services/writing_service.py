from app.services.ai_service import ai_service
import json

class WritingService:
    @staticmethod
    async def analyze_writing(text: str):
        system_prompt = """
        Eres un revisor de estilo académico experto. Analiza el texto del estudiante y detecta problemas de redacción científica.
        
        Debes buscar:
        1. Lenguaje coloquial o informal.
        2. Uso de la primera persona (plural o singular).
        3. Verbos imprecisos (hacer, crear, poner).
        4. Falta de objetividad.

        Responde ÚNICAMENTE en JSON con esta estructura:
        {
          "has_issues": true/false,
          "issues": [
            {"match": "texto original", "problem": "descripción", "suggestion": "reemplazo sugerido"}
          ],
          "improved_text": "Versión corregida completa"
        }
        """
        
        response = await ai_service.get_response(system_prompt, text)
        try:
            return json.loads(response.strip().replace("```json", "").replace("```", ""))
        except:
            return {"error": "Error al analizar texto", "raw": response}

    @staticmethod
    async def generate_versions(context_info: str, style_request: str):
        system_prompt = """
        Eres un redactor académico de élite. Basándote en la información "en bruto" del estudiante, genera TRES versiones profesionales:
        1. MODO FORMAL: Lenguaje académico estándar, objetivo y fluido.
        2. MODO ESTADÍSTICO/TÉCNICO: Enfocado en datos, precisión y métricas.
        3. MODO MARCO TEÓRICO: Integra conceptos y fundamentación científica.

        Responde ÚNICAMENTE en JSON:
        {
          "v1_formal": "Texto...",
          "v2_statistical": "Texto...",
          "v3_theoretical": "Texto..."
        }
        """
        
        user_prompt = f"Información del estudiante: {context_info}\nContexto adicional: {style_request}"
        
        response = await ai_service.get_response(system_prompt, user_prompt)
        try:
            return json.loads(response.strip().replace("```json", "").replace("```", ""))
        except:
            return {"error": "Error al generar versiones", "raw": response}

    @staticmethod
    async def generate_full_chapter(data: dict, profile: dict):
        system_prompt = f"""
        Eres un asesor de tesis de élite especializado en Ingeniería de Sistemas. 
        Tu tarea es generar un borrador EXTENSO y COMPLETO del CAPÍTULO I (Planteamiento del Problema).
        
        Debes seguir este perfil académico:
        - Grado: {profile.get('grado')}
        - Área: {profile.get('area')}
        - Nivel: {profile.get('nivel')}
        
        Usa la siguiente información clave del estudiante:
        {json.dumps(data, indent=2)}
        
        Estructura obligatoria del borrador:
        1.1 Descripción de la Realidad Problemática (Contexto local, nacional e internacional).
        1.2 Formulación del Problema (General y específicos).
        1.3 Objetivos de la Investigación.
        1.4 Justificación (Teórica, práctica y metodológica).
        1.5 Delimitación (Espacial, temporal y social).

        Reglas:
        - Tono: Académico formal, tercera persona.
        - Extensión: Proyecta un borrador detallado.
        - Citas: Incluye citas simuladas (ej: Smith, 2023) relevantes al área.

        Responde ÚNICAMENTE en JSON:
        {{
          "sections": [
            {{"id": "1.1", "title": "Realidad Problemática", "content": "..."}},
            {{"id": "1.2", "title": "Formulación del Problema", "content": "..."}},
            {{"id": "1.3", "title": "Objetivos", "content": "..."}},
            {{"id": "1.4", "title": "Justificación", "content": "..."}},
            {{"id": "1.5", "title": "Delimitación", "content": "..."}}
          ],
          "citations_count": 15,
          "academic_tone_score": 95
        }}
        """
        
        response = await ai_service.get_response(system_prompt, "Generar borrador completo del Capítulo I.")
        try:
            return json.loads(response.strip().replace("```json", "").replace("```", ""))
        except:
            return {"error": "Error al generar capítulo", "raw": response}

writing_service = WritingService()
