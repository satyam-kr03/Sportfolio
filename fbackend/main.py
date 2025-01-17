from typing import Optional
from fastapi import FastAPI, HTTPException, Depends, Request, status
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from hashing import Hash
from jwttoken import create_access_token, verify_token
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from osm import get_places

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    return verify_token(token, credentials_exception)

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:8080",
    "http://localhost:5173",
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

mongodb_uri = 'mongodb+srv://b22236:aJ1dV2aaUEq7bwRq@cluster0.0lem53h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
port = 8000
client = MongoClient(mongodb_uri, port)
db = client["User"]

class Player(BaseModel):
    username: str
    password: str
    fullname: str
    dob: str
    phone: Optional[str] = None
    psport: str
    plevel: str
    ssport: Optional[str] = None
    slevel: Optional[str] = None
    height: str
    weight: str
    days: list

class Organizer(BaseModel):
    username: str
    password: str
    name: str
    type: str
    contact_name: str
    phone: str
    email: str
    description: str

class User(BaseModel):
    username: str
    password: str

class Login(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

class Event(BaseModel):
    organizer: str
    name: str
    sport: str
    type: str
    date: str
    venue: str
    address: str
    city: str
    age_group: str
    gender_cat: str
    description: str

class Geolocation(BaseModel):
    latitude: float
    longitude: float

class Venue(BaseModel):
    name: str
    address: str


@app.get("/")
def read_root(current_user: User = Depends(get_current_user)):
    return {"data": "Hello World"}

@app.post('/register-player')
def create_user(request: Player):
    hashed_pass = Hash.bcrypt(request.password)
    player_object = dict(request)
    player_object["password"] = hashed_pass
    player_object["role"] = "player"
    player_id = db["players"].insert_one(player_object)
    
    user_object = {
        "username": request.username,
        "password": hashed_pass,
        "role": "player"
    }
    user_id = db["users"].insert_one(user_object)
    return {"res": "created player user"}

@app.post('/register-organizer')
def create_user(request: Organizer):
    hashed_pass = Hash.bcrypt(request.password)
    organizer_object = dict(request)
    organizer_object["password"] = hashed_pass
    organizer_object["role"] = "organizer"
    organizer_id = db["organizers"].insert_one(organizer_object)
    
    user_object = {
        "username": request.username,
        "password": hashed_pass,
        "role": "organizer"
    }
    user_id = db["users"].insert_one(user_object)
    return {"res": "created organizer user"}

@app.post('/login')
def login(request: OAuth2PasswordRequestForm = Depends()):
    user = db["users"].find_one({"username": request.username})
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'No user found with this {request.username} username')
    if not Hash.verify(user["password"], request.password):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail=f'Wrong Username or password')
    access_token = create_access_token(data={"sub": user["username"]})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/user")
def get_user_data(current_user: User = Depends(get_current_user)):
    user = db["users"].find_one({"username": current_user.username})
    if(user["role"] == "player"):
        user = db["players"].find_one({"username": current_user.username})
    else:
        user = db["organizers"].find_one({"username": current_user.username})
    print(user)
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    user.pop("_id")
    user.pop("password")
    return user

@app.post('/create-event')
def create_event(request: Event):
    event_object = dict(request)
    # event_object["organizer"] = current_user.username
    event_id = db["events"].insert_one(event_object)
    return {"res": "created event"}


@app.get('/events')
def get_events():
    events = db["events"].find()
    event_list = []
    for event in events:
        event.pop("_id")
        event_list.append(event)
    return event_list



@app.post('/places')
def find(request: Geolocation):
    return get_places(7.735282,48.586797,7.756289,48.574457)
	# return get_places(request.latitude, request.longitude, request.latitude + 0.01, request.longitude + 0.01)

''' 
curl -X 'GET' \
  'http://127.0.0.1:8000/user' \
  -H 'accept: application/json' \
  -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJzYXR5YW1rIiwiZXhwIjoxNzE5MjMxNzI5fQ.BzmWRJMEYLuur4AssvSooKXrGCCDandbX71ETcgvhdQ'
'''