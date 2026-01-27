from app.services.ai_service import ai_service
import json

class TechService:
    @staticmethod
    async def generate_architecture_description(model_type: str, framework: str, task_description: str):
        system_prompt = f"""
        Eres un arquitecto senior de Deep Learning. Tu tarea es generar la sección "3.4 Arquitectura del Modelo Propuesto" para una tesis de ingeniería.
        Debes usar terminología técnica precisa (layers, activation functions, pooling, etc.) y seguir un tono académico formal.
        Framework a utilizar: {framework}. Tipo de modelo: {model_type}.
        
        Responde ÚNICAMENTE en JSON:
        {{
          "architecture_title": "Nombre sugerido de la arquitectura",
          "description": "Texto académico fluido...",
          "layers_breakdown": [
            {{"layer": "Nombre capa", "config": "Detalles técnicos"}}
          ],
          "rationale": "Justificación técnica de esta elección"
        }}
        """
        
        user_prompt = f"Descripción de la tarea del modelo: {task_description}"
        
        response = await ai_service.get_response(system_prompt, user_prompt)
        try:
            return json.loads(response.strip().replace("```json", "").replace("```", ""))
        except:
            return {"error": "Error al generar arquitectura", "raw": response}

    @staticmethod
    def estimate_resources(params_millions: float, batch_size: int = 32):
        # Lógica simplificada de estimación de recursos
        gpu_mem = (params_millions * 4) * 1.2 / 1024 # Estima GB (4 bytes por param + buffer)
        
        time_colab = params_millions * 2 # Minutos estimados base
        time_local = time_colab * 10
        
        recommendation = "GPU Local (RTX 3060+) o Google Colab Free"
        if gpu_mem > 8:
            recommendation = "Google Colab Pro (A100/V100) o AWS SageMaker"
        elif gpu_mem > 24:
            recommendation = "Cluster de computación de alto rendimiento (HPC)"

        return {
            "total_params": f"{params_millions}M",
            "est_gpu_mem_gb": round(gpu_mem, 2),
            "est_training_time": {
                "colab_t4": f"~{round(time_colab)} min",
                "local_cpu": f"~{round(time_local / 60, 1)} horas"
            },
            "recommendation": recommendation
        }

tech_service = TechService()
