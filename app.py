from flask import Flask, render_template

app = Flask(__name__, template_folder='templates')

@app.route('/' , endpoint='login')
def login():
    return render_template('auth/login.html')

@app.route('/signup' , endpoint='signup')
def signup():
    return render_template('auth/signup.html')

#partie client
@app.route('/client_home')
def client_home():
    return render_template('client/index.html')  # Spécifiez le chemin relatif à partir du dossier templates

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

#Partie Admin
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

#partie vendeur
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