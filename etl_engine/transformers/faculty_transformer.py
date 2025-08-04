import pandas as pd
from typing import Dict, Any
from collections import Counter
from etl_engine.models.data_model import FacultyAnalysis

class FacultyTransformer:
    @staticmethod
    def transform_facutly_data(faculty_df: pd.DataFrame) -> Dict[str, Any]:
        """Transform raw faculty data into analytics-ready format"""
        if faculty_df.empty:
            return {}

        # Count faculty by position
        position_counts = dict(Counter(faculty_df['position'].str.lower()))

        # Count faculty by department
        department_counts = dict(Counter(faculty_df['department_name'].str.lower()))

        # Count faculty by school
        school_counts = dict(Counter(faculty_df['school_name'].str.lower()))

        return FacultyAnalysis(
            total_faculty=len(faculty_df),
            positions_counts=position_counts,
            department_counts=department_counts,
            school_counts=school_counts
        ).dict()

    @staticmethod
    def normalize_faculty_names(faculty_df: pd.DataFrame) -> pd.DataFrame:
        """Create a standardized name format"""
        faculty_df['normalized_name'] = faculty_df.apply(
            lambda row: " ".join(filter(None, [
                row['first_name'].lower().strip() if 'first_name' in row else '',
                row['middle_name'].lower().strip() if 'middle_name' in row and row['middle_name'] else '',
                row['last_name'].lower().strip() if 'last_name' in row else '',
            ])),
            axis=1
        )

        return faculty_df
