from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.regulation_service import regulation_service
from app.services.document_service import document_service

router = APIRouter(prefix="/analyze", tags=["Analysis"])

@router.post("/regulations")
async def analyze_regulations(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="El archivo debe ser un PDF")
    
    result = await regulation_service.analyze_regulations(file)
    return result

@router.post("/extract-text")
async def extract_text(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="El archivo debe ser un PDF")
    
    text = await document_service.extract_text_from_pdf(file)
    return {"text_preview": text[:1000], "total_length": len(text)}
