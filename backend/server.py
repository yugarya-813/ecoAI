from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import Optional
import os
from datetime import datetime

app = FastAPI(title="EcoAI API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
class WaitlistEntry(BaseModel):
    email: EmailStr
    company: Optional[str] = None
    name: Optional[str] = None
    created_at: Optional[datetime] = None

class HealthCheck(BaseModel):
    status: str
    message: str

# Health check endpoint
@app.get("/api/health", response_model=HealthCheck)
async def health_check():
    return HealthCheck(status="healthy", message="EcoAI API is running")

# Waitlist endpoint
@app.post("/api/waitlist")
async def join_waitlist(entry: WaitlistEntry):
    try:
        entry.created_at = datetime.utcnow()
        # For now, just return success - in a real app, this would save to MongoDB
        return {
            "success": True,
            "message": "Successfully added to waitlist!",
            "data": {
                "email": entry.email,
                "company": entry.company,
                "name": entry.name
            }
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail="Failed to add to waitlist")

# Get landing page stats (mock data for demo)
@app.get("/api/stats")
async def get_stats():
    return {
        "websites_optimized": "2,500+",
        "carbon_reduced": "45%",
        "load_time_improved": "30%",
        "automation_level": "100%"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)