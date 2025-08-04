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

        # Number of publications by year
        year_counts = dict(Counter(research_df['published_year']))

        # Number of publications by research area
        research_area = research_df['research_area'].explode()
        area_counts = dict(Counter(research_area))

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
        faculty_research = defaultdict(list)

        for _, row in research_df.iterrows():
            for author in row['authors']:
                faculty_research[author.lower().strip()].extend(row['research_area'])

        return {k: list(set(v)) for k, v in faculty_research.items()}
