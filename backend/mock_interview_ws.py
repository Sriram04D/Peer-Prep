import asyncio
import websockets

connected = []

async def handler(websocket, path):
    connected.append(websocket)
    print("User connected.")

    if len(connected) >= 2:
        user1 = connected.pop(0)
        user2 = connected.pop(0)
        await user1.send("✅ You have been matched with a peer!")
        await user2.send("✅ You have been matched with a peer!")
        print("Two users matched.")

    try:
        async for _ in websocket:
            pass
    finally:
        if websocket in connected:
            connected.remove(websocket)

async def main():
    async with websockets.serve(handler, "localhost", 8000):
        print("WebSocket server started on ws://localhost:8000")
        await asyncio.Future()  # run forever

if __name__ == "__main__":
    asyncio.run(main())
