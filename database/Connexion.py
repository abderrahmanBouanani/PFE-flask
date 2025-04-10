from flask_sqlalchemy import SQLAlchemy

# Créez l'instance de SQLAlchemy
db = SQLAlchemy()

# Cette fonction permet d'initialiser la base de données avec l'app Flask
def init_db(app):
    db.init_app(app)
