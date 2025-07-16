from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import auth, database


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Routers
app.include_router(auth.router, prefix="/api/auth")
app.include_router(database.router, prefix="/api/database", tags=["Database"])


@app.get("/")
async def root():
    return {"message": "Test"}
