from fastapi import APIRouter
from pydantic import BaseModel
from app.services.writing_service import writing_service

router = APIRouter(prefix="/writing", tags=["Writing"])

class TextAnalysisRequest(BaseModel):
    text: str

class VersionGenerationRequest(BaseModel):
    context_info: str
    style_request: str

class FullChapterRequest(BaseModel):
    data: dict
    profile: dict

@router.post("/analyze")
async def analyze_text(request: TextAnalysisRequest):
    return await writing_service.analyze_writing(request.text)

@router.post("/generate-versions")
async def generate_versions(request: VersionGenerationRequest):
    return await writing_service.generate_versions(request.context_info, request.style_request)

@router.post("/generate-full-chapter")
async def generate_full_chapter(request: FullChapterRequest):
    return await writing_service.generate_full_chapter(request.data, request.profile)
