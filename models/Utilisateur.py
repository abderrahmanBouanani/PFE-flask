from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Utilisateur(db.Model):
    __tablename__ = 'utilisateurs'

    id = db.Column(db.Integer, primary_key=True)
    nom = db.Column(db.String(50))
    prenom = db.Column(db.String(50))
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(255))  # Utilisation de 'password' au lieu de 'motdepasse'
    telephone = db.Column(db.String(15))  # Ajout de la colonne 'telephone'
    type_utilisateur = db.Column(db.String(50))

    def __repr__(self):
        return f"<Utilisateur {self.nom}, {self.prenom}, {self.email}, {self.type_utilisateur}>"
