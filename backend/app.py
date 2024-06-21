import os
from typing import Optional, List

from fastapi import FastAPI, Body, HTTPException, status
from fastapi.responses import Response
from pydantic import ConfigDict, BaseModel, Field, EmailStr
from pydantic.functional_validators import BeforeValidator

from typing_extensions import Annotated

from bson import ObjectId
import motor.motor_asyncio
from pymongo import ReturnDocument
from motor.motor_asyncio import AsyncIOMotorClient
import asyncio


app = FastAPI(
    title="Player Course API",
    summary="A sample application showing how to use FastAPI to add a ReST API to a MongoDB collection.",
)
client = motor.motor_asyncio.AsyncIOMotorClient(os.environ["MONGODB_URL"])
# db = client.college
db = client.platform
Player_collection = db.get_collection("players")

# Represents an ObjectId field in the database.
# It will be represented as a `str` on the model so that it can be serialized to JSON.
PyObjectId = Annotated[str, BeforeValidator(str)]


class PlayerModel(BaseModel):
    """
    Container for a single Player record.
    """

    # The primary key for the PlayerModel, stored as a `str` on the instance.
    # This will be aliased to `_id` when sent to MongoDB,
    # but provided as `id` in the API requests and responses.

    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    name: str = Field(...)
    # email: EmailStr = Field(...)
    course: str = Field(...)
    gpa: float = Field(..., le=4.0)
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
        json_schema_extra={
            "example": {
                "name": "Jane Doe",
                "email": "jdoe@example.com",
                "course": "Experiments, Science, and Fashion in Nanophotonics",
                "gpa": 3.0,
            }
        },
    )


class UpdatePlayerModel(BaseModel):
    """
    A set of optional updates to be made to a document in the database.
    """

    name: Optional[str] = None
    email: Optional[EmailStr] = None
    course: Optional[str] = None
    gpa: Optional[float] = None
    model_config = ConfigDict(
        arbitrary_types_allowed=True,
        json_encoders={ObjectId: str},
        json_schema_extra={
            "example": {
                "name": "Jane Doe",
                "email": "jdoe@example.com",
                "course": "Experiments, Science, and Fashion in Nanophotonics",
                "gpa": 3.0,
            }
        },
    )


class PlayerCollection(BaseModel):
    """
    A container holding a list of `PlayerModel` instances.

    This exists because providing a top-level array in a JSON response can be a [vulnerability](https://haacked.com/archive/2009/06/25/json-hijacking.aspx/)
    """

    players: List[PlayerModel]


@app.post(
    "/players/",
    response_description="Add new Player",
    response_model=PlayerModel,
    status_code=status.HTTP_201_CREATED,
    response_model_by_alias=False,
)
async def create_Player(Player: PlayerModel = Body(...)):
    """
    Insert a new Player record.

    A unique `id` will be created and provided in the response.
    """
    new_Player = await Player_collection.insert_one(
        Player.model_dump(by_alias=True, exclude=["id"])
    )
    created_Player = await Player_collection.find_one(
        {"_id": new_Player.inserted_id}
    )
    return created_Player


@app.get(
    "/players/",
    response_description="List all players",
    response_model=PlayerCollection,
    response_model_by_alias=False,
)
async def list_players():
    """
    List all of the Player data in the database.

    The response is unpaginated and limited to 1000 results.
    """
    return PlayerCollection(players=await Player_collection.find().to_list(1000))


@app.get(
    "/players/{id}",
    response_description="Get a single Player",
    response_model=PlayerModel,
    response_model_by_alias=False,
)
async def show_Player(id: str):
    """
    Get the record for a specific Player, looked up by `id`.
    """
    if (
        Player := await Player_collection.find_one({"_id": ObjectId(id)})
    ) is not None:
        return Player

    raise HTTPException(status_code=404, detail=f"Player {id} not found")


