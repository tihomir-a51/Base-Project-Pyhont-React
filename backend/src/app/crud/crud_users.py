from typing import Annotated, Generic, Optional, TypeVar, Type, Dict
import io

from fastapi import Depends, HTTPException, status
from fastapi.responses import StreamingResponse
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.db.models import DbUsers
from app.schemas.user_schema import UserCreate
from app.email import *
from app.core.hashing import Hash


UserModelType = TypeVar("UserModelType", bound=DbUsers)


class UserFactory(Generic[UserModelType]):
    @staticmethod
    async def create_db_user(
        db: Session, schema: UserCreate, user_type: str
    ) -> UserModelType:
        """
        Create a new user in the database based on the provided schema.

        Parameters:
        - db (Session): The SQLAlchemy database session.
        - schema (UserCreate): The user creation schema containing user data.
        - user_type (str): The type of user to be created.

        Returns:
        UserModelType: The newly created user model instance.

        Raises:
        HTTPException: If there's an issue adding the user to the database or sending the verification email.
        """
        new_user = DbUsers(
            username=schema.username,
            password=Hash.bcrypt(schema.password),
            first_name=schema.first_name,
            last_name=schema.last_name,
            email=schema.email,
            type="user",
        )
        try:
            db.add(new_user)
            db.commit()
        except IntegrityError as err:
            raise HTTPException(status_code=status.HTTP_409_CONFLICT, detail=err.args)
        else:
            db.refresh(new_user)
            await send_email([schema.email], new_user)
            return new_user


def create_user_factory(user_type: str) -> Type[UserFactory]:
    """
    Create a user factory based on the specified user type.

    Parameters:
    - user_type (str): The type of user for which to create a factory.

    Returns:
    Type[UserFactory]: A user factory class based on the specified user type.

    Raises:
    ValueError: If an unsupported user type is provided.
    """

    factories = {  # here you can add different users for the logic. Currently the users are admin and user
        "admin": UserFactory,
        "user": UserFactory,
    }
    return factories.get(user_type, UserFactory)


async def create_user(db: Session, schema: UserCreate) -> UserModelType:
    """
    Create a new user based on the provided schema.

    Parameters:
    - db (Session): The SQLAlchemy database session.
    - schema (UserCreate): The user creation schema containing user data.

    Returns:
    Dict[str, str]: A dictionary with a success message indicating the account creation.

    Raises:
    HTTPException: If there's an issue creating the user or sending the verification email.
    """

    # user_type = schema.get_type() - this can be used when several users are created. Check UserType for reference
    user_type = "user"
    factory = create_user_factory(user_type)
    new_user = await factory.create_db_user(db, schema, user_type)
    return {
        "message": f"Verification e-mail sent to {schema.email}, please verify your account"
    }


def get_data_db(db: Session, db_tables, filters=1) -> List[DbUsers]:
    """
    Retrieve data from the specified database tables with optional filters.

    Parameters:
    - db (Session): The SQLAlchemy database session.
    - db_tables (List[Type[DbModelType]]): The list of database tables to query.
    - filters (Optional[List[FilterType]]): Optional filters to apply to the query.

    Returns:
    Union[Query, List[DbModelType]]: If filters are provided, returns a SQLAlchemy Query object;
                                    otherwise, returns a list of queried database model instances.

    Raises:
    ValueError: If filters are provided but not of the correct type.
    """

    if filters != 1:
        return db.query(*db_tables).filter(*filters)
    else:
        return db.query(*db_tables).all()


def delete_data_db(db: Session, user: DbUsers) -> None:
    """
    Perform a soft delete by marking the user as deleted.

    Parameters:
    - db (Session): The SQLAlchemy database session.
    - user (DbUsers): The user to be marked as deleted.

    Returns:
    None

    Raises:
    SQLAlchemyError: If there's an issue committing the changes to the database.
    """

    user.is_deleted = True
    user.is_verified = False
    db.commit()


async def upload_picture(
    db: Session, user: DbUsers, image: bytearray
) -> Dict[str, str]:
    """
    Upload a user's profile picture.

    Parameters:
    - db (Session): The SQLAlchemy database session.
    - user (DbUsers): The user whose profile picture is to be updated.
    - image (bytearray): The binary data of the new profile picture.

    Returns:
    Dict[str, str]: A dictionary with a success message indicating the image upload.

    Raises:
    SQLAlchemyError: If there's an issue committing the changes to the database.
    """

    user.picture = image
    db.commit()

    return {"message": "Image uploaded successfully"}


async def get_image(db: Session, user: DbUsers) -> StreamingResponse:
    """
    Retrieve the profile image of a user.

    Parameters:
    - db (Session): The SQLAlchemy database session.
    - user (DbUsers): The user whose profile image is to be retrieved.

    Returns:
    StreamingResponse: A streaming response containing the user's profile image.

    Raises:
    HTTPException: If the user does not have a profile image or if there's an issue retrieving it.
    """

    return StreamingResponse(io.BytesIO(user.picture), media_type="image/jpeg")
