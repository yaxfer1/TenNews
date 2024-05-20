from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime, timedelta
from bcrypt import hashpw, checkpw, gensalt
import dbManagement
import jwt
#import tests
app = Flask(__name__)
CORS(app)

from MultiQueryAI import rag_chain, retrieval_chain, rag_chain_modify
import Chat

@app.route('/api/get_result', methods=['GET'])
def get_result():
    out = rag_chain({"question": question})
    print(out["text"])
    return jsonify(out["text"])

@app.route('/api/get_context', methods=['POST'])
def get_context():
    data = request.get_data()
    texto_str = data.decode('utf-8')
    texto_limpio = texto_str.strip('"')
    print(texto_limpio)
    out = retrieval_chain({"question": texto_limpio})
    print(out["contexts"])
    return jsonify(out["contexts"])


@app.route('/api/set_context', methods=['POST'])
def set_context():
    data = request.get_data()
    texto_str = data.decode('utf-8')
    texto_limpio = texto_str.strip('"')
    partes = texto_limpio.split('|||')

    out = rag_chain_modify({"query": partes[2], "contexts": partes[1], "queryini": partes[0]})

    return jsonify(out["text"])


@app.route('/api/ai_chat', methods=['POST'])
def ai_chat():
    data = request.get_data()

    chat = Chat.agent(data)
    print(chat["output"])
    return jsonify(chat["output"])



# Secret key for JWT 
JWT_SECRET = 'secret'

# Function to generate JWT token
def generate_jwt(username):
    payload = {
        'iss': username,
        'exp': datetime.utcnow() + timedelta(hours=1)  # Token expires
    }
    token = jwt.encode(payload, JWT_SECRET, algorithm='HS256')
    return token
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # Obtain hash from database
    user_data = dbManagement.obtain_username_password(username)
    stored_hash_with_salt = user_data.get("password_hash")

    # Verify password
    if stored_hash_with_salt and checkpw(password.encode('utf-8'), stored_hash_with_salt.encode('utf-8')):
        token = generate_jwt(username)
        return jsonify({'jwt': token}), 201
    else:
        return jsonify({'error': 'Invalid Credentials'}), 403

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    if not data:
        return jsonify({'error': 'Not enough data'}), 400

    username = data.get('username')
    password = data.get('password')
    if not username or not password:
        return jsonify({'error': 'Incomplete Credentials'}), 400

    # Password hashing before storing it
    hashed_password = hashpw(password.encode('utf-8'), gensalt())

    return dbManagement.register_normal(username, hashed_password)
@app.route('/api/add_element', methods=['POST'])
def add_element():
    data = request.json
    jwt_token = data.get('jwt')
    elemento = data.get('element')
    type = data.get('type')

    # VVerify and parse JWT
    try:
        payload = jwt.decode(jwt_token, JWT_SECRET, algorithms=['HS256'])
        username = payload['iss']
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Expired Token'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid Token'}), 401

    user_id = dbManagement.obtain_id_username(username)
    if user_id:

        return dbManagement.add_element_db(elemento, type, user_id)
    else:
        return jsonify({'error': 'User not found'}), 404

@app.route('/api/rm_element', methods=['POST'])
def rm_element():
    data = request.json
    jwt_token = data.get('jwt')
    elemento = data.get('element')
    type = data.get('type')

    # Verify JWT
    try:
        payload = jwt.decode(jwt_token, JWT_SECRET, algorithms=['HS256'])
        username = payload['iss']
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Expired Token'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Invalid Token'}), 401

    user_id = dbManagement.obtain_id_username(username)
    if user_id:

        return dbManagement.rm_element_db(elemento, type, user_id)
    else:
        return jsonify({'error': 'User not found'}), 404



@app.route('/api/get_elements', methods=['POST'])
def get_elements():
    data = request.json
    jwt_token = data.get('jwt')

    try:
        payload = jwt.decode(jwt_token, JWT_SECRET, algorithms=['HS256'])
        username = payload['iss']
    except jwt.ExpiredSignatureError:
        return jsonify({'error': 'Token expirado'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'error': 'Token inválido'}), 401



    elements = dbManagement.obtain_elements_from_user(username) 
    print(elements)
    return jsonify(elements), 200

if __name__ == '__main__':
    app.run(debug=True)
