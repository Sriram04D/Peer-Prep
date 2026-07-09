from pymongo import MongoClient
from dotenv import load_dotenv
from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent
ENV_PATH = BASE_DIR / ".env"

print("ENV PATH:", ENV_PATH)
print("ENV EXISTS:", ENV_PATH.exists())

load_dotenv(dotenv_path=ENV_PATH, override=True)

MONGO_URI = os.getenv("MONGO_URI")

print("MONGO_URI:", MONGO_URI)

if not MONGO_URI:
    raise ValueError("❌ MONGO_URI not found")

client = MongoClient(MONGO_URI)

db = client["peerprep"]

users_collection = db["users"]
queue_collection = db["queue"]
sessions_collection = db["sessions"]
feedback_collection = db["feedback"]

print("✅ Connected to MongoDB Atlas")