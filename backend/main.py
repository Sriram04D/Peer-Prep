from fastapi import FastAPI, WebSocket
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

waiting_users = []

@app.websocket("/ws/interview")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    if waiting_users:
        peer = waiting_users.pop(0)
        await websocket.send_text("🎉 You have been paired with a partner. Start your mock interview now!")
        await peer.send_text("🎉 You have been paired with a partner. Start your mock interview now!")
    else:
        waiting_users.append(websocket)
        await websocket.send_text("⌛ Waiting for another user to join...")
