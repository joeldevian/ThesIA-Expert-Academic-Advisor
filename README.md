# ThesIA 🧠🎓 - Asesor Metodológico Inteligente V2

**ThesIA** es un sistema experto diseñado para transformar el proceso de tesis universitaria, con un enfoque especializado en **Ingeniería de Sistemas**. Utiliza Inteligencia Artificial avanzada (DeepSeek V3) para guiar al estudiante desde la definición de su idea hasta la redacción profesional del Capítulo I.

## 🌟 Características Principales (Version 2.0)

### 🏗️ Gestión de Perfil de Investigación
- **Validación de Grado**: Adapta la exigencia académica según el grado (Bachiller, Título, Maestría, Doctorado).
- **Control de Coherencia**: Alertas en tiempo real sobre la alineación entre nivel de investigación, área tecnológica y grado académico.

### ✍️ Asistente de Redacción de 3 Niveles
1. **Nivel 1: Guía Manual**: Detector de lenguaje coloquial y sugerencias de verbos científicos en tiempo real.
2. **Nivel 2: Asistente Semi-Automático**: Generador de párrafos en 3 estilos académicos (Formal, Técnico/Estadístico y Teórico).
3. **Nivel 3: Generación Automática Total**: Workflow de 3 pasos para proyectar borradores completos del Capítulo I (aprox. 15 páginas) con citas bibliográficas integradas.

### 🤖 Especialización en Ingeniería & Deep Learning
- **Generador de Arquitecturas**: Redacción automática de la sección técnica de modelos neuronales (CNN, RNN, Transformers).
- **Estimador de Hardware**: Cálculo de VRAM necesaria y tiempos de entrenamiento estimados en Google Colab/Local.
- **Checklist Técnico**: Validación de métricas (F1-score, Confusion Matrix) y protocolos de entrenamiento.

---

## 🛠️ Stack Tecnológico

- **Frontend**: React.js, Tailwind CSS V4, Framer Motion, Zustand (Global State).
- **Backend**: FastAPI (Python 3.10+), Uvicorn.
- **IA**: DeepSeek AI V3 API.
- **Base de Datos / Storage**: Supabase.

---

## 🚀 Instalación y Ejecución

### 1. Requisitos Previos
- Node.js (v18+)
- Python (3.10+)
- Clave API de DeepSeek

### 2. Backend
```powershell
cd backend
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```

### 3. Frontend
```powershell
cd frontend
npm install
npm run dev
```

Abra `http://localhost:5173` para empezar a trabajar en su tesis.

---

## 👨‍💻 Autor
Desarrollado para **Joel Ircanaupa** - Estudiante de Ingeniería de Sistemas.

**ThesIA: De la idea al título, con inteligencia artificial.** 🏁🤖✨
