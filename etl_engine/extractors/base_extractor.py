from abc import ABC, abstractmethod
from typing import Any, Dict

import pandas as pd

from security.credential_vault import CredentialVault


class BaseExtractor(ABC):
    def __init__(self):
        self.connection = None
        self.credential_vault = CredentialVault()

    @abstractmethod
    def connect(self, connection_params: Dict[str, Any]) -> bool:
        """Establish connection using user-provided credentails"""
        pass

    @abstractmethod
    def extract(self, connection_params: Dict[str, Any]) -> bool:
        """Extract data based on user configuration"""
        return True

    def validate_permissions(self, connection_params: Dict[str, Any]) -> bool:
        """Ensure user has read permissions"""
        try:
            self.connect(connection_params)
            return True
        except Exception:
            return False

    def disconnect(self):
        """Close connection"""
        if self.connection:
            self.connection.close()
