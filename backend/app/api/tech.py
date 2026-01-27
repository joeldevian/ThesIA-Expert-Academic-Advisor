from fastapi import APIRouter
from pydantic import BaseModel
from app.services.tech_service import tech_service

router = APIRouter(prefix="/tech", tags=["Technical"])

class ArchitectureRequest(BaseModel):
    model_type: str
    framework: str
    task_description: str

class ResourceRequest(BaseModel):
    params_millions: float
    batch_size: int = 32

@router.post("/generate-architecture")
async def generate_architecture(request: ArchitectureRequest):
    return await tech_service.generate_architecture_description(
        request.model_type, request.framework, request.task_description
    )

@router.post("/estimate-resources")
async def estimate_resources(request: ResourceRequest):
    return tech_service.estimate_resources(request.params_millions, request.batch_size)
