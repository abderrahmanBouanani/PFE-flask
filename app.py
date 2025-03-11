from flask import Flask, render_template

app = Flask(__name__, template_folder='templates')

@app.route('/' , endpoint='login')
def login():
    return render_template('auth/login.html')

@app.route('/signup' , endpoint='signup')
def signup():
    return render_template('auth/signup.html')

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


if __name__ == '__main__':
    app.run(debug=True)
