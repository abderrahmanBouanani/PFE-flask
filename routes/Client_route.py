from flask import Blueprint, render_template
from models import Client
from service import ClientService

# Créer un blueprint pour les routes des clients
client_bp = Blueprint('client', __name__)

# Créer une instance de ClientService
client_service = ClientService()

# Route pour afficher la liste des clients
@client_bp.route('/client')
def client_list():
    clients = client_service.get_all_clients()  # Récupérer tous les clients via le service
    return render_template('client/client_list.html', clients=clients)

# Route pour afficher un client en particulier
@client_bp.route('/client/<int:id>')
def client_detail(id):
    client = client_service.get_client_by_id(id)  # Récupérer un client par son ID via le service
    if client:
        return render_template('client/client_detail.html', client=client)
    else:
        return "Client non trouvé", 404
