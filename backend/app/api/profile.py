from fastapi import APIRouter, HTTPException
from app.services.profile_service import profile_service, ProfileConfig, ProfileValidationResult

router = APIRouter(prefix="/profile", tags=["Profile"])

@router.post("/validate")
async def validate_profile(config: ProfileConfig):
    result = profile_service.validate_profile(config)
    return result
