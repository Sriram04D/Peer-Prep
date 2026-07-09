# backend/websocket.py

from fastapi import APIRouter, WebSocket
from .matchmaking import add_to_queue, try_match

router = APIRouter()

@router.websocket("/ws/interview")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    user_id = websocket.headers.get("user-id") or "Anonymous"

    add_to_queue(user_id, websocket)

    while True:
        user1, user2 = try_match()
        if user1 and user2:
            await user1[1].send_text(f"Matched with {user2[0]}")
            await user2[1].send_text(f"Matched with {user1[0]}")
