from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.analysis import router as analysis_router
from app.api.thesis import router as thesis_router
from app.api.profile import router as profile_router
from app.api.writing import router as writing_router
from app.api.tech import router as tech_router

app = FastAPI(
    title="ThesIA API",
    description="Asesor Metodológico Inteligente para Tesis Universitarias",
    version="0.1.0"
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
