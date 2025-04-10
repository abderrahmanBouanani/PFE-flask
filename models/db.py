import mysql.connector
from models.Utilisateur import Utilisateur
from config import Config

def get_db_connection():
    conn = mysql.connector.connect(
        host=Config.MYSQL_HOST,
        user=Config.MYSQL_USER,
        password=Config.MYSQL_PASSWORD,
        database=Config.MYSQL_DB
    )
    return conn

def get_all_utilisateurs():
    conn = get_db_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT id, nom,prenom, email,password, type_utilisateur FROM utilisateurs")  # Exemple de requête
    rows = cursor.fetchall()

    utilisateurs = [Utilisateur(row['id'], row['nom'],row['prenom'], row['email'],row['password'], row['type_utilisateur']) for row in rows]

    cursor.close()
    conn.close()
    return utilisateurs
