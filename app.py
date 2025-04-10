from flask import Flask, render_template, request, redirect, url_for, flash, session
from flask_migrate import Migrate
from database.Connexion import db, init_db
from models.Utilisateur import Utilisateur  # Assure-toi que le modèle Utilisateur est bien défini
from flask import jsonify, session

# Initialisation de l'application Flask
app = Flask(__name__, template_folder='templates')

# Configuration de l'application Flask pour MySQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:@localhost/shopall'  # Remplacez 'root' par votre nom d'utilisateur MySQL
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Optionnel, pour éviter un warning
app.config['SECRET_KEY'] = 'ton_secret_key'  # Clé secrète pour les sessions et flash messages

# Initialiser l'instance de SQLAlchemy
db.init_app(app)

# Initialisation de Flask-Migrate pour les migrations
migrate = Migrate(app, db)

# Configuration du secret key pour utiliser flash messages
app.config['SECRET_KEY'] = 'ton_secret_key'  # Change cette clé par une vraie clé secrète pour la sécurité


# Route pour la page de signup (inscription)
@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        # Récupérer les données du formulaire
        nom = request.form['nom']
        prenom = request.form['prenom']
        email = request.form['email']
        telephone = request.form['telephone']
        password = request.form['motdepasse']  # Assurez-vous d'utiliser 'password' ici
        type_utilisateur = request.form['type_utilisateur']

        # Créer un nouvel utilisateur avec le mot de passe
        nouvel_utilisateur = Utilisateur(
            nom=nom,
            prenom=prenom,
            email=email,
            telephone=telephone,
            password=password,  
            type_utilisateur=type_utilisateur
        )

        # Ajouter l'utilisateur à la base de données
        db.session.add(nouvel_utilisateur)
        db.session.commit()

        flash('Utilisateur inscrit avec succès !', 'success')
        return redirect(url_for('login'))

    return render_template('auth/signup.html')



# Route pour la page de login
@app.route('/', methods=['GET', 'POST'], endpoint='login')
def login():
    if request.method == 'POST':
        email = request.form['email']
        motdepasse = request.form['motdepasse']

        # Recherche l'utilisateur par email
        utilisateur = Utilisateur.query.filter_by(email=email).first()
        print(utilisateur)
        if utilisateur:
            # Comparaison des mots de passe (en clair)
            if utilisateur.password == motdepasse:
                # Authentifie l'utilisateur (enregistre son id dans la session)
                session['user_id'] = utilisateur.id
                session['type_utilisateur'] = utilisateur.type_utilisateur

                # Renvoie la réponse JSON pour la redirection côté client
                return jsonify({
                    "success": True,
                    "type_utilisateur": utilisateur.type_utilisateur,
                })

            else:
                # Si le mot de passe est incorrect
                return jsonify({"success": False, "message": "Mot de passe incorrect."})

        else:
            # Si l'email n'existe pas dans la base de données
            return jsonify({"success": False, "message": "Email non trouvé."})

    # Si la méthode est GET, rendre la page de login
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
    return render_template('client/profilClient.html')

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
    return render_template('vendeur/vendeurProfile.html')

# Partie Livreur
@app.route('/livraisons')
def livraisons():
    return render_template('delivery/livraisons.html')

@app.route('/profil_livreur')
def profil_livreur():
    return render_template('delivery/profil-livreur.html')

if __name__ == '__main__':
    app.run(debug=True)
