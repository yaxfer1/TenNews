from datetime import datetime, timedelta
from bcrypt import hashpw, checkpw, gensalt
import jwt
from flask import jsonify
import mysql.connector

# Configuración de la conexión a la base de datos
config = {
    'user': 'root',
    'password': 'xxxx',
    'host': 'localhost',
    'database': 'tennews'
}

def obtain_id_username(username):
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor(dictionary=True)
    query = "SELECT id FROM users WHERE username = %s"
    cursor.execute(query, (username,))
    user_id = cursor.fetchone()
    cursor.close()
    connection.close()
    return user_id

# Método para obtener elementos de un usuario por su ID de usuario
def obtain_elements_from_user(user):
    user_id = obtain_id_username(user)
    if user_id is None:
        return []  # O maneja este caso de alguna otra manera

    connection = mysql.connector.connect(**config)
    cursor = connection.cursor()
    query = "SELECT name, type FROM elements WHERE owner_id = %s"
    cursor.execute(query, (user_id['id'],))  # Pasa solo el valor del ID como parámetro
    results = cursor.fetchall()
    elements = [row[0] for row in results]
    types = [row[1] for row in results]
    print(types)
    cursor.close()
    connection.close()

    return elements, types

def obtain_username_password(username):
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor(dictionary=True)
    query = "SELECT password_hash FROM users WHERE username = %s"
    cursor.execute(query, (username,))
    user_password = cursor.fetchone()
    print(user_password)
    cursor.close()
    connection.close()
    print(user_password)
    return user_password

def register_normal(user, hashed_password):
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor(dictionary=True)
    # Insertar el nuevo usuario y su contraseña hasheada en la base de datos
    query = "INSERT INTO users (username, password_hash, permission) VALUES (%s, %s, 'normal')"
    try:
        cursor.execute(query, (user, hashed_password))
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({'message': 'Usuario registrado correctamente'}), 201
    except mysql.connector.Error as err:
        cursor.close()
        connection.close()
        return jsonify({'error': f'Error al registrar usuario: {err}'}), 500

def add_element_db(element, type, user_id):
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor(dictionary=True)
    print(element)
    print(type)
    print(user_id)
    ids = user_id.__getitem__("id")
    print(ids)
    query = "INSERT INTO elements (name, type, owner_id) VALUES (%s, %s, %s)"
    try:
        cursor.execute(query, (element, type, ids))
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify(element, type), 201
    except mysql.connector.Error as err:
        cursor.close()
        connection.close()
        print(err)
        return jsonify({'error': f'Error at inserting element: {err}'}), 500


def rm_element_db(element, type, user_id):
    connection = mysql.connector.connect(**config)
    cursor = connection.cursor(dictionary=True)
    print(element)
    print(type)
    print(user_id)
    ids = user_id.__getitem__("id")
    print(ids)
    query = "DELETE FROM elements WHERE name = %s AND type = %s AND owner_id = %s"
    try:
        cursor.execute(query, (element, type, ids))
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify(element, type), 201
    except mysql.connector.Error as err:
        cursor.close()
        connection.close()
        print(err)
        return jsonify({'error': f'Error at inserting element: {err}'}), 500
