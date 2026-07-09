from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware
from routes.users import router as user_router

app = FastAPI()

# Register Routes
app.include_router(
    user_router,
    prefix="/users",
    tags=["Users"]
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://peer-prep12-l99oxiuxj-srirams-projects-4a06f33e.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Waiting queue
waiting_users = []

@app.get("/")
def home():
    return {"message": "PeerPrep Backend is Running 🚀"}

@app.websocket("/ws/interview")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()

    if waiting_users:
        peer = waiting_users.pop(0)

        await websocket.send_text(
            "🎉 You have been paired with a partner. Start your mock interview now!"
        )

        await peer.send_text(
            "🎉 You have been paired with a partner. Start your mock interview now!"
        )

    else:
        waiting_users.append(websocket)
        await websocket.send_text(
            "⌛ Waiting for another user to join..."
        )