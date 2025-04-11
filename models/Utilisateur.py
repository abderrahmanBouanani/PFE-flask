from flask_sqlalchemy import SQLAlchemy
from database.Connexion import get_connection
#db = SQLAlchemy()
#
#class Utilisateur(db.Model):
#    __tablename__ = 'utilisateurs'
#
#    id = db.Column(db.Integer, primary_key=True)
#    nom = db.Column(db.String(50))
#    prenom = db.Column(db.String(50))
#    email = db.Column(db.String(100), unique=True)
#    password = db.Column(db.String(255))  # Utilisation de 'password' au lieu de 'motdepasse'
#    telephone = db.Column(db.String(15))  # Ajout de la colonne 'telephone'
#    type_utilisateur = db.Column(db.String(50))
#
#    def __repr__(self):
#        return f"<Utilisateur {self.nom}, {self.prenom}, {self.email}, {self.type_utilisateur}>"
#


class Utilisateur:
    def __init__(self, id, nom, prenom, email, password, telephone, type_utilisateur):
        self.id = id
        self.nom = nom
        self.prenom = prenom
        self.email = email
        self.password = password
        self.telephone = telephone
        self.type_utilisateur = type_utilisateur

    @staticmethod
    def get_by_email(email):
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)
        query = "SELECT * FROM utilisateurs WHERE email = %s"
        cursor.execute(query, (email,))
        row = cursor.fetchone()
        cursor.close()
        conn.close()
        if row:
            return Utilisateur(**row)
        return None

    @staticmethod
    def create(nom, prenom, email, password, telephone, type_utilisateur):
        conn = get_connection()
        cursor = conn.cursor()
        query = """
            INSERT INTO utilisateurs (nom, prenom, email, password, telephone, type_utilisateur)
            VALUES (%s, %s, %s, %s, %s, %s)
        """
        cursor.execute(query, (nom, prenom, email, password, telephone, type_utilisateur))
        conn.commit()
        cursor.close()
        conn.close()

    def __repr__(self):
        return f"<Utilisateur {self.nom}, {self.prenom}, {self.email}, {self.type_utilisateur}>"
