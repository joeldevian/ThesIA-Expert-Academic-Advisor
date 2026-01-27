import os
from dotenv import load_dotenv
from langchain_openai import ChatOpenAI
from langchain_core.messages import SystemMessage, HumanMessage

load_dotenv()

class AIService:
    def __init__(self):
        api_key = os.getenv("DEEPSEEK_API_KEY")
        # DeepSeek usa compatibilidad con OpenAI API
        self.llm = ChatOpenAI(
            model='deepseek-chat', 
            openai_api_key=api_key, 
            openai_api_base='https://api.deepseek.com/v1',
            max_tokens=2048
        )

    async def get_response(self, system_prompt: str, user_prompt: str):
        messages = [
            SystemMessage(content=system_prompt),
            HumanMessage(content=user_prompt)
        ]
        response = await self.llm.ainvoke(messages)
        return response.content

# Singleton instance
ai_service = AIService()
