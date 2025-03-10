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

if __name__ == '__main__':
    app.run(debug=True)
