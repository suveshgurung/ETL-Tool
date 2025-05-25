from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from supabase import create_client, Client
from gotrue.errors import AuthApiError
from dotenv import load_dotenv


load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for Next.js frontend

# Supabase configuration
url: str = os.environ.get("SUPABASE_URL")
key: str = os.environ.get("SUPABASE_KEY")
supabase: Client = create_client(url, key)

@app.route('/api/signup', methods=['POST'])
def signup():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return jsonify({'error': 'Email and password are required'}), 400
        
        # Sign up user with Supabase
        response = supabase.auth.sign_up({
            "email": email,
            "password": password
        })
        
        if response.user:
            return jsonify({
                'message': 'User created successfully',
                'user': {
                    'id': response.user.id,
                    'email': response.user.email
                }
            }), 201
        else:
            return jsonify({'error': 'Failed to create user'}), 400
            
    except AuthApiError as e:
        return jsonify({'error': str(e)}), 400
    except Exception as e:
        return jsonify({'error': 'Internal server error' }), 500

@app.route('/api/signin', methods=['POST'])
def signin():
    try:
        data = request.get_json()
        email = data.get('email')
        password = data.get('password')
        
        if not email or not password:
            return jsonify({'error': 'Email and password are required'}), 400
        
        # Sign in user with Supabase
        response = supabase.auth.sign_in_with_password({
            "email": email,
            "password": password
        })
        
        if response.user and response.session:
            return jsonify({
                'message': 'Login successful',
                'user': {
                    'id': response.user.id,
                    'email': response.user.email
                },
                'access_token': response.session.access_token
            }), 200
        else:
            return jsonify({'error': 'Invalid credentials'}), 401
            
    except AuthApiError as e:
        return jsonify({'error': str(e)}), 401
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/signout', methods=['POST'])
def signout():
    try:
        # Get token from Authorization header
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({'error': 'No valid token provided'}), 401
        
        token = auth_header.split(' ')[1]
        
        # Sign out user
        supabase.auth.sign_out()
        
        return jsonify({'message': 'Logged out successfully'}), 200
        
    except Exception as e:
        return jsonify({'error': 'Internal server error'}), 500

@app.route('/api/user', methods=['GET'])
def get_user():
    try:
        # Get token from Authorization header
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({'error': 'No valid token provided'}), 401
        
        token = auth_header.split(' ')[1]
        
        # Get user info using token
        user = supabase.auth.get_user(token)
        
        if user:
            return jsonify({
                'user': {
                    'id': user.user.id,
                    'email': user.user.email
                }
            }), 200
        else:
            return jsonify({'error': 'Invalid token'}), 401
            
    except Exception as e:
        return jsonify({'error': 'Unauthorized'}), 401

@app.route('/', methods=['GET'])
def health_check():
    return jsonify({'message': 'Flask API is running!'}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)
