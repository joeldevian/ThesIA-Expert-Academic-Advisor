from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.viability_service import viability_service
from app.services.structure_service import structure_service
from app.services.chapter_one_service import chapter_one_service

router = APIRouter(prefix="/thesis", tags=["Thesis"])

class ThesisIdeaRequest(BaseModel):
    title: str
    objective: str
    variables: list[str]
    scope: str

class StructureRequest(BaseModel):
    title: str
    objective: str
    regulation_structure: list = None

class ChapterOneRequest(BaseModel):
    title: str
    problem_description: str
    objectives: str
    justification: str

@router.post("/evaluate-viability")
async def evaluate_viability(request: ThesisIdeaRequest):
    # ...
    if not request.title or not request.objective:
        raise HTTPException(status_code=400, detail="El título y objetivo son obligatorios")
    
    result = await viability_service.evaluate_thesis_idea(
        request.title, 
        request.objective, 
        request.variables, 
        request.scope
    )
    return result

@router.post("/generate-structure")
async def generate_structure(request: StructureRequest):
    if not request.title:
        raise HTTPException(status_code=400, detail="El título es obligatorio")
    
    result = await structure_service.generate_structure(
        request.title,
        request.objective,
        request.regulation_structure
    )
    return result

@router.post("/review-chapter-one")
async def review_chapter_one(request: ChapterOneRequest):
    result = await chapter_one_service.review_chapter_one(
        request.title,
        request.problem_description,
        request.objectives,
        request.justification
    )
    return result
