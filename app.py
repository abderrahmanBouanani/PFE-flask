from flask import Flask, render_template, request, redirect, url_for, flash, session
from flask_migrate import Migrate
from models.Utilisateur import Utilisateur  # Assure-toi que le modèle Utilisateur est bien défini
from flask import jsonify, session
from database.Connexion import get_connection

app = Flask(__name__, template_folder='templates')

app.secret_key = 'startSession'  # Change ceci par une clé sécurisée


# Route pour la page de signup (inscription)
@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        # Récupérer les données du formulaire
        nom = request.form['nom']
        prenom = request.form['prenom']
        email = request.form['email']
        telephone = request.form['telephone']
        password = request.form['motdepasse']
        type_utilisateur = request.form['type_utilisateur']

        # Vérifie si l'utilisateur existe déjà
        if Utilisateur.get_by_email(email):
            flash('Un compte avec cet email existe déjà.', 'danger')
            return redirect(url_for('signup'))

        # Créer l'utilisateur (insertion dans la base)
        Utilisateur.create(
            nom=nom,
            prenom=prenom,
            email=email,
            password=password,
            telephone=telephone,
            type_utilisateur=type_utilisateur
        )

        flash('Utilisateur inscrit avec succès !', 'success')
        return redirect(url_for('login'))  # ou autre page après inscription

    return render_template('auth/signup.html')



# Route pour la page de login
@app.route('/', methods=['GET', 'POST'], endpoint='login')
def login():
    if request.method == 'POST':
        email = request.form.get('email')
        motdepasse = request.form.get('motdepasse')

        # Utilisation de la connexion déjà définie dans Connexion.py
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)

        query = "SELECT * FROM utilisateurs WHERE email = %s"
        cursor.execute(query, (email,))
        utilisateur = cursor.fetchone()

        cursor.close()
        conn.close()

        if email == "admin@gmail.com" and motdepasse == "admin123":
                    return redirect(url_for('admin_dashboard'))  # Rediriger vers le tableau de bord de l'admin
        
        if utilisateur:
            if utilisateur['password'] == motdepasse:
                session['user_id'] = utilisateur['id']
                session['type_utilisateur'] = utilisateur['type_utilisateur']

                if utilisateur['type_utilisateur'] == 'client':
                    return redirect(url_for('client_home'))
                elif utilisateur['type_utilisateur'] == 'vendeur':
                    return redirect(url_for('vendeur_home'))
                elif utilisateur['type_utilisateur'] == 'livreur':
                    return redirect(url_for('livraisons'))
                else:
                    return redirect(url_for('login'))
            else:
                error_message = "Mot de passe incorrect."
                return render_template('auth/login.html', error=error_message)
        else:
            error_message = "Adresse email ou mot de passe est incorrect !"
            return render_template('auth/login.html', error=error_message)

    return render_template('auth/login.html')





# Partie Client
@app.route('/client_home')
def client_home():
    return render_template('client/index.html')  

@app.route('/client_boutique')
def client_boutique():
    return render_template('client/shop.html')

@app.route('/client_about')
def client_about():
    return render_template('client/about.html')

@app.route('/client_service')
def client_service():
    return render_template('client/services.html')

@app.route('/client_contact')
def client_contact():
    return render_template('client/contact.html')

@app.route('/client_profil')
def client_profil():
    if 'user_id' in session:
        # Récupérer l'ID de l'utilisateur connecté
        user_id = session['user_id']
        
        # Connexion à la base de données
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)  # Utilisation de dictionnaires pour une récupération facile des résultats
        
        # Récupérer les informations de l'utilisateur depuis la base de données
        cursor.execute("SELECT * FROM utilisateurs WHERE id = %s", (user_id,))
        utilisateur = cursor.fetchone()

        cursor.close()
        conn.close()

        if utilisateur:
            # Passer les données à la page de profil
            return render_template('client/profilClient.html', utilisateur=utilisateur)
        else:
            # Si l'utilisateur n'existe pas, rediriger vers la page de connexion
            return redirect(url_for('login'))
    else:
        # Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
        return redirect(url_for('login'))

@app.route('/client_cart')
def client_cart():
    return render_template('client/cart.html')

@app.route('/client_checkout')
def client_checkout():
    return render_template('client/checkout.html')

@app.route('/client_thankyou')
def client_thankyou():
    return render_template('client/thankyou.html')

# Partie Admin
@app.route('/admin_dashboard')
def admin_dashboard():
    return render_template('admin/dashboard.html')

@app.route('/admin_about')
def admin_about():
    return render_template('admin/about.html')

@app.route('/admin_commande')
def admin_commande():
    return render_template('admin/commandes.html')

@app.route('/admin_produit')
def admin_produit():
    return render_template('admin/produits.html')

@app.route('/admin_utilisateur')
def admin_utilisateur():
    return render_template('admin/Utilisateur.html')

# Partie Vendeur
@app.route('/vendeur_home')
def vendeur_home():
    return render_template('vendeur/vendeurHome.html')

@app.route('/vendeur_boutique')
def vendeur_boutique():
    return render_template('vendeur/vendeurBoutique.html')

@app.route('/vendeur_about')
def vendeur_about():
    return render_template('vendeur/vendeurApropos.html')

@app.route('/vendeur_service')
def vendeur_service():
    return render_template('vendeur/vendeurService.html')

@app.route('/vendeur_contact')
def vendeur_contact():
    return render_template('vendeur/vendeurContact.html')

@app.route('/vendeur_profil')
def vendeur_profil():
    if 'user_id' in session:
        # Récupérer l'ID de l'utilisateur connecté
        user_id = session['user_id']
        
        # Connexion à la base de données
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)  # Utilisation de dictionnaires pour une récupération facile des résultats
        
        # Récupérer les informations de l'utilisateur depuis la base de données
        cursor.execute("SELECT * FROM utilisateurs WHERE id = %s", (user_id,))
        utilisateur = cursor.fetchone()

        cursor.close()
        conn.close()

        if utilisateur:
            # Passer les données à la page de profil
            return render_template('vendeur/vendeurProfile.html', utilisateur=utilisateur)
        else:
            # Si l'utilisateur n'existe pas, rediriger vers la page de connexion
            return redirect(url_for('login'))
    else:
        # Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
        return redirect(url_for('login'))
    

# Partie Livreur
@app.route('/livraisons')
def livraisons():
    return render_template('delivery/livraisons.html')

@app.route('/profil_livreur')
def profil_livreur():
    if 'user_id' in session:
        # Récupérer l'ID de l'utilisateur connecté
        user_id = session['user_id']
        
        # Connexion à la base de données
        conn = get_connection()
        cursor = conn.cursor(dictionary=True)  # Utilisation de dictionnaires pour une récupération facile des résultats
        
        # Récupérer les informations de l'utilisateur depuis la base de données
        cursor.execute("SELECT * FROM utilisateurs WHERE id = %s", (user_id,))
        utilisateur = cursor.fetchone()

        cursor.close()
        conn.close()

        if utilisateur:
            # Passer les données à la page de profil
            return render_template('delivery/profil-livreur.html', utilisateur=utilisateur)
        else:
            # Si l'utilisateur n'existe pas, rediriger vers la page de connexion
            return redirect(url_for('login'))
    else:
        # Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
        return redirect(url_for('login'))
    

if __name__ == '__main__':
    app.run(debug=True)
