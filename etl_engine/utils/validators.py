import re
from typing import Any, Dict, List
from datetime import datetime
import pandas as pd


class DataValidator:
    @staticmethod
    def validate_email(email: str) -> bool:
        """Validate email format"""
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return (re.match(pattern, email) is not None)

    @staticmethod
    def validate_dataframe_columns(df: pd.DataFrame, required_columns: List[str]) -> Dict[str, Any]:
        """Validate if the dataframe has required columns"""
        missing_columns = [col for col in required_columns if col not in df.columns]
        return {
            "is_valid": len(missing_columns) == 0,
            "missing_columns": missing_columns,
            "available_columns": list(df.columns)
        }

    @staticmethod
    def clean_and_validate_data(df: pd.DataFrame) -> pd.DataFrame:
        """Clean and validate the dataframe"""
        # Remove duplicates
        df = df.drop_duplicates()

        # Handle missing values
        df.fillna("")

        # Clean string columns
        string_columns = df.select_dtypes(include=['object']).columns
        for col in string_columns:
            df[col] = df[col].astype(str).str.strip()

        return df
