import pandas as pd
from typing import Counter, Dict, List, Any
from collections import defaultdict
from etl_engine.models.transformer_models import ResearchAnalysis

class ResearchTransformer:
    @staticmethod
    def transform_research_data(research_df: pd.DataFrame) -> Dict[str, Any]:
        """Transform raw research data into analytics-ready format"""
        if research_df.empty:
            return {}

        # Convert the name into normalized form.
        research_df['normalized_name'] = research_df.apply(
            lambda row: " ".join(filter(None, [
                str(row['first_name']).lower().strip() if pd.notna(row['first_name']) else '',
                str(row['middle_name']).lower().strip() if pd.notna(row['middle_name']) else '',
                str(row['last_name']).lower().strip() if pd.notna(row['last_name']) else ''
            ])),
            axis=1
        )

        # Number of publications by year
        year_counts = dict(Counter(research_df['published_year']))

        # Number of publications by research area
        research_areas = research_df['research_area'].explode() if isinstance(research_df['research_area'].iloc[0], list) else research_df['research_area']
        area_counts = dict(Counter(research_areas))

        # Number of publications by department
        dept_counts = dict(Counter(research_df['department']))

        # Number of publications by school
        school_counts = dict(Counter(research_df['school']))

        return ResearchAnalysis(
            total_publications=len(research_df),
            year_counts=year_counts,
            research_area_counts=area_counts,
            department_counts=dept_counts,
            school_counts=school_counts,
        ).dict()

    @staticmethod
    def get_research_areas_by_faculty(research_df: pd.DataFrame) -> Dict[str, Any]:
        """Create a mapping of faculty names to their research areas"""
        faculty_research = defaultdict(set)

        for _, row in research_df.iterrows():
            research_area = row['research_area']

            if isinstance(research_area, str):
                areas = [area.strip() for area in research_area.split(',')]
            elif isinstance(research_area, list):
                areas = research_area
            else:
                areas = []

            # Research area for main author
            main_author = row.get('faculty_id')
            if main_author:
                faculty_research[main_author].update(areas)

        return {k: list(set(v)) for k, v in faculty_research.items()}
