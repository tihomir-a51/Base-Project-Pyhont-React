from enum import Enum
from pydantic import BaseModel, EmailStr, PositiveInt, constr


class UserType(str, Enum):
    '''
    This class can be user when more users are created for the app. Can be added to UserCreate:
        type: UserType

    If it is added in User create, you should add a new method in UserCreate:

       def get_type(self):
        return self.type
    
    Pydantic will take care to validate all UserType objects that are valid
    '''
    admin = "admin"
    user = "user"
    supervisor = 'supervisor'
    moderator = 'moderator'

    
class UserCreate(BaseModel):
    username: constr(min_length=2, max_length=15)
    password: constr(min_length=2, max_length=15)
    first_name: constr(min_length=2)
    last_name: constr(min_length=2)
    email: EmailStr


class UserDisplay(BaseModel):
    username: str
    first_name: str
    last_name: str
    email: EmailStr
    type: str
