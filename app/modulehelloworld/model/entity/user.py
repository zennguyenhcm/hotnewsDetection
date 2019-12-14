# Import the database object (db) from the main application module
from app import db


# Define a base model for other database tables to inherit
class Base(db.Model):

    __abstract__ = True

    id = db.Column(db.Integer, primary_key=True)
    date_created = db.Column(db.DateTime, default=db.func.current_timestamp())
    date_modified = db.Column(db.DateTime, default=db.func.current_timestamp(), onupdate=db.func.current_timestamp())


# Define a User model
class User(Base):

    __tablename__ = 'auth_user'

    # User Name
    name = db.Column(db.String(128), nullable=False)

    # Identification Data: email & password
    email = db.Column(db.String(128), nullable=False, unique=True)

    phone = db.Column(db.String(15), nullable=True, unique=False)

    # New instance instantiation procedure
    def __init__(self, name, email, phone):
        self.name = name
        self.email = email
        self.phone = phone

    def __repr__(self):
        return '<User %r>' % (self.name)

