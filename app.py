from flask import Flask, render_template

app = Flask(__name__)

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
    return render_template('client/profilClient')

if __name__ == '__main__':
    app.run(debug=True)
