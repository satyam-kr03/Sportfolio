from typing import Optional
from fastapi import FastAPI, HTTPException, Depends, Request,status
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from hashing import Hash
from jwttoken import create_access_token
from oauth import get_current_user
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from osm import get_places


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

from pymongo import MongoClient
mongodb_uri = 'mongodb+srv://b22236:aJ1dV2aaUEq7bwRq@cluster0.0lem53h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
port = 8000
client = MongoClient(mongodb_uri, port)
db = client["User"]

class Player(BaseModel):
	username: str
	company: str
	password: str
	fullname: str
	dob: str
	phone: str
	psport: str
	plevel: str
	ssport: str
	slevel: str
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

@app.get("/")
def read_root(current_user:User = Depends(get_current_user)):
	return {"data":"Hello OWrld"}

@app.post('/register-player')
def create_user(request:Player):
	hashed_pass = Hash.bcrypt(request.password)
	player_object = dict(request)
	player_object["password"] = hashed_pass
	player_id = db["players"].insert_one(player_object)
	user_object = {}
	user_object["username"] = request.username
	user_object["password"] = hashed_pass
	user_object["role"] = "player"
	user_id = db["users"].insert_one(user_object)
	# print(user)
	return {"res":"created player user"}

@app.post('/register-organizer')
def create_user(request:Organizer):
	hashed_pass = Hash.bcrypt(request.password)
	organizer_object = dict(request)
	organizer_object["password"] = hashed_pass
	organizer_id = db["organizers"].insert_one(organizer_object)
	user_object = {}
	user_object["username"] = request.username
	user_object["password"] = hashed_pass
	user_object["role"] = "player"
	user_id = db["users"].insert_one(user_object)
	# print(user)
	return {"res":"created organizer user"}


# @app.post('/register')
# def create_user(request:User):
# 	hashed_pass = Hash.bcrypt(request.password)
# 	user_object = dict(request)
# 	user_object["password"] = hashed_pass
# 	user_id = db["users"].insert_one(user_object)
# 	# print(user)
# 	return {"res":"created"}

@app.post('/login')
def login(request:OAuth2PasswordRequestForm = Depends()):
	user = db["users"].find_one({"username":request.username})
	if not user:
		raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail = f'No user found with this {request.username} username')
	if not Hash.verify(user["password"],request.password):
		raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,detail = f'Wrong Username or password')
	access_token = create_access_token(data={"sub": user["username"] })
	return {"access_token": access_token, "token_type": "bearer"}

@app.get('/places')
def find():
	return get_places(7.735282,48.586797,7.756289,48.574457)