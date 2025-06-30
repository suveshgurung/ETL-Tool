from abc import ABC, abstractmethod
from typing import Dict, Any
import pandas as pd
from security.credential_vault import CredentialVault


class BaseExtractor(ABC):
    def __init__(self):
        self.connection = None
        self.credential_vault = CredentialVault()

    @abstractmethod
    def connect(self):
        """Establish connection using user-provided credentails"""
        pass

    @abstractmethod
    def extract(self):
        """Extract data based on user configuration"""
        pass

    def validate_permissions(self) -> bool:
        """Ensure user has read permissions"""
        try:
            self.connect()
            return True
        except Exception:
            return False

    def disconnect(self):
        """Close connection"""
        if self.connection:
            self.connection.close()
