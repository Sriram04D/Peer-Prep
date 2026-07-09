# backend/matchmaking.py

match_queue = []

def add_to_queue(user_id, websocket):
    match_queue.append((user_id, websocket))

def try_match():
    if len(match_queue) >= 2:
        user1 = match_queue.pop(0)
        user2 = match_queue.pop(0)
        return user1, user2
    return None, None
