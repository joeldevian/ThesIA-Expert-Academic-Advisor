import fitz  # PyMuPDF
from fastapi import UploadFile
import os

class DocumentService:
    @staticmethod
    async def extract_text_from_pdf(file: UploadFile) -> str:
        # Guardar temporalmente si es necesario o leer de memoria
        content = await file.read()
        doc = fitz.open(stream=content, filetype="pdf")
        text = ""
        for page in doc:
            text += page.get_text()
        doc.close()
        return text

    @staticmethod
    def chunk_text(text: str, chunk_size: int = 1000, overlap: int = 200) -> list[str]:
        # Implementación simple de chunking para RAG
        chunks = []
        for i in range(0, len(text), chunk_size - overlap):
            chunks.append(text[i:i + chunk_size])
        return chunks

document_service = DocumentService()
