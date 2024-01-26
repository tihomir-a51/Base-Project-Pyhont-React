from fastapi import FastAPI
from app.api.api_v1.api import api_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Base Project")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update this with your React app's URL
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE"],
    allow_headers=["*"],
)

app.include_router(api_router)
