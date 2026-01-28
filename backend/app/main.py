from fastapi import FastAPI, Request, status
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from app.api.analysis import router as analysis_router
from app.api.thesis import router as thesis_router
from app.api.profile import router as profile_router
from app.api.writing import router as writing_router
from app.api.tech import router as tech_router
import openai

app = FastAPI(
    title="ThesIA API",
    description="Asesor Metodológico Inteligente para Tesis Universitarias",
    version="0.1.0"
)

@app.exception_handler(openai.APIStatusError)
async def openai_exception_handler(request: Request, exc: openai.APIStatusError):
    # Detectar error de saldo insuficiente (402)
    if exc.status_code == 402:
        return JSONResponse(
            status_code=status.HTTP_402_PAYMENT_REQUIRED,
            content={
                "detail": "Saldo insuficiente en DeepSeek",
                "type": "insufficient_balance",
                "message": "Tu cuenta de DeepSeek no tiene saldo suficiente para procesar esta solicitud profesional. Por favor, recarga créditos en el panel de DeepSeek."
            },
        )
    
    # Otros errores de API
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "detail": str(exc),
            "type": "api_error",
            "message": "Ocurrió un error al comunicarse con el motor de IA. Por favor, intenta de nuevo más tarde."
        },
    )

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Ajustar en producción
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analysis_router)
app.include_router(thesis_router)
app.include_router(profile_router)
app.include_router(writing_router)
app.include_router(tech_router)

@app.get("/")
async def root():
    return {"message": "Bienvenido a la API de ThesIA - Tu Asesor de Tesis Inteligente"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
