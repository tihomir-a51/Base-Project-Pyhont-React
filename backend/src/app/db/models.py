import uuid

from sqlalchemy import Table, Column, String, Integer, ForeignKey, Boolean, LargeBinary
from sqlalchemy.orm import relationship

from app.db.database import Base


class DbUsers(Base):
    __tablename__: str = "users"
    id = Column(
        String(50), primary_key=True, default=lambda: str(uuid.uuid4()), nullable=False
    )
    username = Column(String(45), nullable=False, unique=True)
    password = Column(String(150), nullable=False)
    first_name = Column(String(150), nullable=False)
    last_name = Column(String(150), nullable=False)
    email = Column(String(45), nullable=False, unique=True)
    type = Column(String(45), nullable=False)
    picture = Column(LargeBinary, nullable=True, default=None)
    is_verified = Column(Boolean, default=False)
    is_deleted = Column(Boolean, default=False)
