from flask_sqlalchemy import SQLAlchemy
import mysql.connector

# Créez l'instance de SQLAlchemy
#db = SQLAlchemy()

# Cette fonction permet d'initialiser la base de données avec l'app Flask
#def init_db(app):
#    db.init_app(app)

def get_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="",
        database="shopall"
    )