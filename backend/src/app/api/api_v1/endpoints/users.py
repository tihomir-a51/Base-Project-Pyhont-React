from typing import Annotated, List

from fastapi import Depends, APIRouter, File, HTTPException, Path, UploadFile
from sqlalchemy.orm import Session

from app.schemas.user_schema import UserDisplay, UserCreate
from app.db.database import get_db
from app.db.models import DbUsers
import app.crud.crud_users as crud_user
from app.core.auth import get_current_user, check_if_admin, find_user_by_id


router = APIRouter()


@router.post("/users", status_code=201)
async def create_user_admin(
    schema: UserCreate, db: Annotated[Session, Depends(get_db)]
):
    """
    Create a new user with administrative privileges.

    Parameters:
    - schema (UserCreate): The user creation schema containing user data.
    - db (Session): The SQLAlchemy database session.

    Returns:
    Dict[str, Union[str, int]]: A dictionary with the ID and a success message for the created user.

    Raises:
    HTTPException: If there's an issue creating the user or if the username or email is already taken.
    """

    return await crud_user.create_user(db, schema)


@router.get("/users", response_model=List[UserDisplay])
async def get_users(
    db: Annotated[Session, Depends(get_db)],
    _: Annotated[DbUsers, Depends(get_current_user)],
):
    """
    Retrieve a list of verified and active users.

    Parameters:
    - db (Session): The SQLAlchemy database session.
    - current_user (DbUsers): The currently authenticated user.

    Returns:
    List[UserDisplay]: A list of user data in the UserDisplay format.

    Raises:
    HTTPException: If there's an issue retrieving the user data.
    """

    tables = [DbUsers]
    filters = [DbUsers.is_verified == True, DbUsers.is_deleted == False]

    return await crud_user.get_data_db(db, tables, filters)


@router.delete("/users/{user_to_delete}", status_code=204)
def get_users(
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[DbUsers, Depends(get_current_user)],
    user_to_delete: Annotated[str, Path(description="ID for user to delete")],
):
    """
    Delete a user, performing a soft delete by marking 'is_deleted' as True.

    Parameters:
    - db (Session): The SQLAlchemy database session.
    - current_user (DbUsers): The currently authenticated user with administrative privileges.
    - user_to_delete (str): The ID of the user to be deleted.

    Returns:
    None

    Raises:
    HTTPException: If the authenticated user lacks administrative privileges or if the specified user is not found.
    """

    check_if_admin(current_user)
    find_user = find_user_by_id(db, user_to_delete)

    return crud_user.delete_data_db(db, find_user)


@router.post("/users/image")
async def upload(
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[DbUsers, Depends(get_current_user)],
    image: Annotated[UploadFile, File()],
):
    """
    Upload a profile image for the currently authenticated user.

    Parameters:
    - db (Session): The SQLAlchemy database session.
    - current_user (DbUsers): The currently authenticated user.
    - image (UploadFile): The uploaded image file.

    Returns:
    Dict[str, str]: A dictionary with a success message indicating the image upload.

    Raises:
    HTTPException: If there's an issue processing or saving the uploaded image.
    """

    file = await image.read()
    binary_pic = bytearray(file)

    return await crud_user.upload_picture(db, current_user, binary_pic)


@router.get("/users/image")
async def get_image(
    db: Annotated[Session, Depends(get_db)],
    current_user: Annotated[DbUsers, Depends(get_current_user)],
):
    """
    Retrieve the profile image of the currently authenticated user.

    Parameters:
    - db (Session): The SQLAlchemy database session.
    - current_user (DbUsers): The currently authenticated user.

    Returns:
    bytes: The binary data of the user's profile image.

    Raises:
    HTTPException: If the user does not have a profile image or if there's an issue retrieving it.
    """

    return await crud_user.get_image(db, current_user)
