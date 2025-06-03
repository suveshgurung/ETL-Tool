from abc import ABC, abstractmethod
from typing import Dict, Any
import pandas as pd
from security.credential_vault import CredentialVault


class BaseExtractor(ABC):
    def __init__(self, connection_config: Dict[str, Any], user_id: str):
        self.connection_config = connection_config
        self.user_id = user_id
        self.connection = None
        self.credential_vault = CredentialVault()

    @abstractmethod
    def connect(self):
        """Establish connection using user-provided credentails"""
        pass

    @abstractmethod
    def extract(self, query_config: Dict[str, Any]) -> pd.DataFrame:
        """Extract data based on user configuration"""
        pass

    @abstractmethod
    def get_schema(self) -> Dict[str, Any]:
        """Get schema information from the source"""
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
