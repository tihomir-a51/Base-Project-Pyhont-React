import jwt
from typing import Annotated

from fastapi import Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.db.models import DbUsers
from app.core.security import oauth2_scheme, SECRET_KEY
from app.core.config import settings


def get_user_by_username(db: Session, username: str):
    """
    Function Name: get_user_by_username

    Description: Retrieves a user from the database based on their username.
    This function is designed to fetch a specific user, ensuring that the user has not been marked as deleted.

    Parameters:
    - **db** (Session): The active database session for querying the database.
    - **username** (str): The username of the user to be retrieved.

    Returns: The user object if found.

    Errors:
    - Raises HTTPException with status 404 if a user with the specified username is not found or is marked as deleted.
    """
    user = db.query(DbUsers).filter(DbUsers.username == username, DbUsers.is_deleted == False).first()
    if not user:
        raise HTTPException(
            status_code=404,
            detail=f'User with username {username} not found!'
        )
    
    if not user.is_verified:
        raise HTTPException(
            status_code=401,
            detail='Please verify your account'
        )
    
    return user


def get_current_user(db: Annotated[Session, Depends(get_db)],
                     token: Annotated[str, Depends(oauth2_scheme)]):
    """
    Function Name: get_current_user

    Description: Authenticates and retrieves the current user based on the provided JWT (JSON Web Token).
    This function decodes the token, extracts the username, and fetches the corresponding user from the database.

    Parameters:
    - **db** (Session): The active database session for querying the database.
    - **token** (str): The verification token sent to the user's email.

    Returns: The authenticated user object.

    Errors:
    - Raises HTTPException with status 401 if the token is invalid, expired, or the user is not found.
    """

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail='Could not validate credentials',
        headers={'WWW-Authenticate': 'Bearer'}
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[settings.ALGORITHM])
        username: str = payload.get('username')
        if username is None:
            raise credentials_exception
    except jwt.DecodeError:
        raise credentials_exception
    user = get_user_by_username(db, username=username)
    if user is None:
        raise credentials_exception
    return user


def check_if_admin(user: DbUsers):
    """
    Check if the user has administrative privileges.

    Parameters:
    - user (DbUsers): The user to be checked.

    Returns:
    bool: True if the user is an admin; raises an HTTPException if not.

    Raises:
    HTTPException: If the user does not have administrative privileges.
    """

    if not user.type == 'admin':
        raise HTTPException(
            status_code=401,
            detail='You are not authorized to perform this operation'
        )
    
    return True

def find_user_by_id(db: Session, user_id: str):
    """
    Find a user in the database by their ID.

    Parameters:
    - db (Session): The SQLAlchemy database session.
    - user_id (str): The ID of the user to be found.

    Returns:
    DbUsers: The user with the specified ID.

    Raises:
    HTTPException: If the user with the specified ID is not found.
    """
    
    user = db.query(DbUsers).filter(DbUsers.id == user_id).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail='User not found'
        )
    
    return user