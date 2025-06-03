from cryptography.fernet import Fernet
import json
import base64
import os
from typing import Dict, Any


class CredentialVault:
    def __init__(self):
        self.encryption_key = self._get_or_create_key()
        self.cipher = Fernet(self.encryption_key)

    def _get_or_create_key(self) -> bytes:
        """Get encryption key from environment or create a new one"""
        key = os.getenv('ENCRYPTION_KEY')
        if key:
            return base64.urlsafe_b64decode(key.encode())
        else:
            return Fernet.generate_key()

    def encrypt_credentials(self, credentials: Dict[str, Any]) -> str:
        """Encrypt database credentials"""
        credentials_json = json.dumps(credentials)
        encrypted_data = self.cipher.encrypt(credentials_json.encode())
        return base64.urlsafe_b64encode(encrypted_data).decode()

    def decrypt_credentials(self, encrypted_credentials: str) -> Dict[str, Any]:
        """Decrypt database credentials"""
        try:
            encrypted_data = base64.urlsafe_b64decode(encrypted_credentials.encode())
            decrypted_data = self.cipher.decrypt(encrypted_data)
            return json.loads(decrypted_data.decode())
        except Exception as e:
            raise Exception(f"Failed to decrypt credentails: {str(e)}")
