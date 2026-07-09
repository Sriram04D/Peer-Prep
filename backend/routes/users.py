from fastapi import APIRouter
from database import users_collection
from datetime import datetime

router = APIRouter()

@router.post("/login")
async def login_user(user: dict):

    existing_user = users_collection.find_one(
        {"firebase_uid": user["firebase_uid"]}
    )

    if existing_user:
        users_collection.update_one(
            {"firebase_uid": user["firebase_uid"]},
            {
                "$set": {
                    "name": user["name"],
                    "email": user["email"],
                    "photo_url": user.get("photo_url", ""),
                    "is_online": True,
                    "last_seen": datetime.utcnow()
                }
            }
        )

        return {"message": "User updated"}

    users_collection.insert_one({
        "firebase_uid": user["firebase_uid"],
        "name": user["name"],
        "email": user["email"],
        "photo_url": user.get("photo_url", ""),
        "is_online": True,
        "created_at": datetime.utcnow(),
        "last_seen": datetime.utcnow()
    })

    return {"message": "User created"}