import asyncio
import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage

load_dotenv()

async def test_deepseek():
    api_key = os.getenv("DEEPSEEK_API_KEY")
    print(f"Probando conexión con DeepSeek API Key: {api_key[:5]}...")
    
    llm = ChatOpenAI(
        model='deepseek-chat', 
        openai_api_key=api_key, 
        openai_api_base='https://api.deepseek.com/v1',
        max_tokens=100
    )
    
    messages = [
        SystemMessage(content="Eres un asistente útil."),
        HumanMessage(content="Hola, di 'Conexión Exitosa' si puedes leerme.")
    ]
    
    try:
        response = await llm.ainvoke(messages)
        print(f"Respuesta: {response.content}")
        return True
    except Exception as e:
        print(f"Error: {e}")
        return False

if __name__ == "__main__":
    asyncio.run(test_deepseek())
