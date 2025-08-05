from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
from typing import Dict, Any, List
import json

from etl_engine.loaders.postgres_loader import (
    get_postgres_db, AnalyticsFaculty, ResearchArea, Publication, 
    FacultyAnalytics, ResearchAnalytics
)

app = Flask(__name__)
CORS(app)

class DashboardService:
    @staticmethod
    def get_faculty_position_stats():
        """Get filtered faculty statistics by position for dashboard"""
        with get_postgres_db() as db:
            allowed_positions = {
                'Professor': '#3b82f6',
                'Associate Professor': '#10b981',
                'Assistant Professor': '#f59e0b',
                'Lecturer': '#ef4444',
                'Visiting Faculty': '#8b5cf6',
            }

            positions = db.query(FacultyAnalytics).filter(
                FacultyAnalytics.metric_name == 'position'
            ).all()

            position_data = []
            for pos in positions:
                title = pos.metric_value.title()
                if title in allowed_positions:
                    position_data.append({
                        'position': title,
                        'count': pos.count,
                        'color': allowed_positions[title]
                    })

            return position_data

    @staticmethod
    def get_publications_by_year():
        """Get publications trend by year"""
        with get_postgres_db() as db:
            years = db.query(ResearchAnalytics).filter(
                ResearchAnalytics.metric_name == 'publication_year'
            ).order_by(ResearchAnalytics.metric_value).all()

            return [
                {
                    'year': year.metric_value,
                    'papers': year.count
                }
                for year in years
            ]
    
    @staticmethod
    def get_research_areas_distribution():
        """Get all research areas"""
        with get_postgres_db() as db:
            areas = db.query(ResearchAnalytics).filter(
                ResearchAnalytics.metric_name == 'research_area'
            ).order_by(ResearchAnalytics.count.desc()).all()

            # Define a preset list of colors to cycle through
            color_palette = [
                "#3b82f6", "#10b981", "#f59e0b", "#ef4444",
                "#8b5cf6", "#06b6d4", "#ec4899", "#84cc16",
                "#f472b6", "#22c55e", "#eab308", "#0ea5e9",
                "#a855f7", "#16a34a", "#e11d48", "#7c3aed"
            ]

            research_data = []
            for index, area in enumerate(areas):
                research_data.append({
                    'domain': area.metric_value,
                    'papers': area.count,
                    'color': color_palette[index % len(color_palette)]  # cycle colors if needed
                })

            return research_data
    
    @staticmethod
    def get_department_faculty_count():
        """Get faculty count by department (restricted to allowed positions)"""
        with get_postgres_db() as db:
            departments = db.query(FacultyAnalytics).filter(
                FacultyAnalytics.metric_name == 'department',
            ).order_by(FacultyAnalytics.count.desc()).all()

            return [
                {
                    'department': dept.metric_value.title(),
                    'count': dept.count
                }
                for dept in departments
            ]
 
    @staticmethod
    def get_recent_publications(limit=10):
        """Get recent publications"""
        with get_postgres_db() as db:
            publications = db.query(Publication, AnalyticsFaculty).join(
                AnalyticsFaculty, Publication.faculty_id == AnalyticsFaculty.faculty_id
            ).order_by(Publication.published_year.desc()).limit(limit).all()
            
            result = []
            for pub, faculty in publications:
                result.append({
                    'title': pub.paper_title,
                    'author': f"{faculty.first_name} {faculty.last_name}",
                    'year': pub.published_year,
                    'journal': pub.journal,
                    'department': faculty.department_name
                })
            
            return result
    
    @staticmethod
    def get_top_productive_faculty(limit=10):
        """Get faculty with most publications"""
        with get_postgres_db() as db:
            allowed_positions = [
                'Professor',
                'Associate Professor',
                'Assistant Professor',
                'Lecturer',
                'Visiting Faculty'
            ]

            # Get publication counts per faculty
            faculty_pub_counts = db.query(
                AnalyticsFaculty.faculty_id,
                AnalyticsFaculty.first_name,
                AnalyticsFaculty.last_name,
                AnalyticsFaculty.department_name,
                AnalyticsFaculty.position,
                db.func.count(Publication.id).label('pub_count')
            ).join(
                Publication, AnalyticsFaculty.faculty_id == Publication.faculty_id
            ).filter(
                AnalyticsFaculty.position.in_(allowed_positions),
                AnalyticsFaculty.position.in_(allowed_positions)
            ).group_by(
                AnalyticsFaculty.faculty_id
            ).order_by(
                db.func.count(Publication.id).desc()
            ).limit(limit).all()
            
            result = []
            for faculty in faculty_pub_counts:
                result.append({
                    'name': f"{faculty.first_name} {faculty.last_name}",
                    'department': faculty.department_name,
                    'position': faculty.position,
                    'publication_count': faculty.pub_count
                })
            
            return result
    
    @staticmethod
    def search_faculty_by_research_area(research_area: str):
        """Search faculty by research area"""
        with get_postgres_db() as db:
            # Find research area
            area = db.query(ResearchArea).filter(
                ResearchArea.area_name.ilike(f"%{research_area}%")
            ).first()
            
            if not area:
                return []

            allowed_positions = [
                'Professor',
                'Associate Professor',
                'Assistant Professor',
                'Lecturer',
                'Visiting Faculty'
            ]
            
            # Get faculties in this area
            faculties = db.query(AnalyticsFaculty).filter(
                AnalyticsFaculty.research_areas.contains(area),
                AnalyticsFaculty.position.in_(allowed_positions)
            ).all()            
            result = []
            for faculty in faculties:
                # Get publication count
                pub_count = db.query(Publication).filter(
                    Publication.faculty_id == faculty.faculty_id
                ).count()
                
                result.append({
                    'faculty_id': faculty.faculty_id,
                    'name': f"{faculty.first_name} {faculty.last_name}",
                    'department': faculty.department_name,
                    'school': faculty.school_name,
                    'position': faculty.position,
                    'research_areas': [area.area_name for area in faculty.research_areas],
                    'publication_count': pub_count
                })
            
            return result
    
    @staticmethod
    def get_all_faculty_info(limit=None, offset=0, department=None, position=None, search_name=None):
        """Get all faculty information with optional filtering and pagination"""
        with get_postgres_db() as db:
            allowed_positions = [
                'Professor',
                'Associate Professor',
                'Assistant Professor',
                'Lecturer',
                'Visiting Faculty'
            ]

            query = db.query(AnalyticsFaculty).filter(
                AnalyticsFaculty.position.in_(allowed_positions)
            )

            # Apply filters if provided
            if department:
                query = query.filter(AnalyticsFaculty.department_name.ilike(f"%{department}%"))

            if position:
                query = query.filter(AnalyticsFaculty.position.ilike(f"%{position}%"))

            if search_name:
                search_term = f"%{search_name}%"
                query = query.filter(
                    db.or_(
                        AnalyticsFaculty.first_name.ilike(search_term),
                        AnalyticsFaculty.last_name.ilike(search_term),
                        db.func.concat(AnalyticsFaculty.first_name, ' ', AnalyticsFaculty.last_name).ilike(search_term)
                    )
                )

            # Get total count for pagination
            total_count = query.count()

            # Apply pagination
            query = query.offset(offset)
            if limit:
                query = query.limit(limit)

            faculties = query.all()

            result = []
            for faculty in faculties:
                # Get publication count for each faculty
                pub_count = db.query(Publication).filter(
                    Publication.faculty_id == faculty.faculty_id
                ).count()

                result.append({
                    'faculty_id': faculty.faculty_id,
                    'first_name': faculty.first_name,
                    'middle_name': faculty.middle_name,
                    'last_name': faculty.last_name,
                    'full_name': f"{faculty.first_name} {faculty.middle_name or ''} {faculty.last_name}".strip(),
                    'department': faculty.department_name,
                    'school': faculty.school_name,
                    'position': faculty.position,
                    'research_areas': [area.area_name for area in faculty.research_areas],
                    'publication_count': pub_count
                })

            return {
                'faculty': result,
                'total_count': total_count,
                'returned_count': len(result),
                'offset': offset,
                'limit': limit
            }

dashboard_service = DashboardService()

@app.route('/')
def home():
    return jsonify({"message": "University Faculty Dashboard Backend"})

@app.route('/api/dashboard/overview')
def dashboard_overview():
    """Get dashboard overview data"""
    try:
        allowed_positions = [
            'Professor',
            'Associate Professor',
            'Assistant Professor',
            'Lecturer',
            'Visiting Faculty'
        ]

        with get_postgres_db() as db:
            total_faculty = db.query(AnalyticsFaculty).filter(
                    AnalyticsFaculty.position.in_(allowed_positions)
                ).count()

            total_publications = db.query(Publication).count()
            total_research_areas = db.query(ResearchArea).count()

            # Get unique departments among filtered positions
            unique_departments = db.query(AnalyticsFaculty.department_name).filter(
                    AnalyticsFaculty.position.in_(allowed_positions)
                ).distinct().count()

        return jsonify({
            'status': 'success',
            'data': {
                'total_faculty': total_faculty,
                'total_publications': total_publications,
                'total_research_areas': total_research_areas,
                'total_departments': unique_departments
            }
        })

    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/dashboard/faculty-positions')
def faculty_positions():
    """Get faculty distribution by positions"""
    try:
        data = dashboard_service.get_faculty_position_stats()
        return jsonify({'status': 'success', 'data': data})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/dashboard/publications-trend')
def publications_trend():
    """Get publications trend by year"""
    try:
        data = dashboard_service.get_publications_by_year()
        return jsonify({'status': 'success', 'data': data})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/dashboard/research-areas')
def research_areas():
    """Get top research areas"""
    try:
        data = dashboard_service.get_research_areas_distribution()
        return jsonify({'status': 'success', 'data': data})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/dashboard/department-faculty')
def department_faculty():
    """Get faculty count by department"""
    try:
        data = dashboard_service.get_department_faculty_count()
        return jsonify({'status': 'success', 'data': data})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/dashboard/recent-publications')
def recent_publications():
    """Get recent publications"""
    try:
        limit = request.args.get('limit', 10, type=int)
        data = dashboard_service.get_recent_publications(limit)
        return jsonify({'status': 'success', 'data': data})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/dashboard/top-faculty')
def top_faculty():
    """Get top productive faculty"""
    try:
        limit = request.args.get('limit', 10, type=int)
        data = dashboard_service.get_top_productive_faculty(limit)
        return jsonify({'status': 'success', 'data': data})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/all-faculty')
def get_all_faculty():
    """Get all faculty information with optional filtering and pagination"""
    try:
        # Get query parameters
        limit = request.args.get('limit', type=int)
        offset = request.args.get('offset', 0, type=int)
        department = request.args.get('department', '')
        position = request.args.get('position', '')
        search_name = request.args.get('search', '')
        
        # Convert empty strings to None for optional parameters
        department = department if department else None
        position = position if position else None
        search_name = search_name if search_name else None
        
        data = dashboard_service.get_all_faculty_info(
            limit=limit,
            offset=offset,
            department=department,
            position=position,
            search_name=search_name
        )
        
        return jsonify({'status': 'success', 'data': data})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/search/supervisor')
def search_supervisor():
    """Search for potential supervisors by research area"""
    try:
        research_area = request.args.get('area', '')
        if not research_area:
            return jsonify({'status': 'error', 'message': 'Research area parameter is required'}), 400
        
        data = dashboard_service.search_faculty_by_research_area(research_area)
        return jsonify({'status': 'success', 'data': data})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/faculty/<int:faculty_id>')
def get_faculty_details(faculty_id):
    """Get detailed information about a specific faculty member"""
    try:
        with get_postgres_db() as db:
            faculty = db.query(AnalyticsFaculty).filter(
                AnalyticsFaculty.faculty_id == faculty_id
            ).first()
            
            if not faculty:
                return jsonify({'status': 'error', 'message': 'Faculty not found'}), 404
            
            # Get publications
            publications = db.query(Publication).filter(
                Publication.faculty_id == faculty_id
            ).order_by(Publication.published_year.desc()).all()
            
            faculty_data = {
                'faculty_id': faculty.faculty_id,
                'name': f"{faculty.first_name} {faculty.middle_name or ''} {faculty.last_name}".strip(),
                'department': faculty.department_name,
                'school': faculty.school_name,
                'position': faculty.position,
                'research_areas': [area.area_name for area in faculty.research_areas],
                'publications': [{
                    'title': pub.paper_title,
                    'year': pub.published_year,
                    'journal': pub.journal,
                    'coauthors': pub.coauthors
                } for pub in publications]
            }
            
            return jsonify({'status': 'success', 'data': faculty_data})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/research-areas/all')
def get_all_research_areas():
    """Get all available research areas"""
    try:
        with get_postgres_db() as db:
            areas = db.query(ResearchArea).order_by(ResearchArea.area_name).all()
            area_list = [area.area_name for area in areas]
            
        return jsonify({'status': 'success', 'data': area_list})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

@app.route('/api/analytics/collaboration')
def collaboration_analytics():
    """Get collaboration analytics"""
    try:
        with get_postgres_db() as db:
            # Find publications with multiple authors (coauthors not empty)
            collab_pubs = db.query(Publication).filter(
                Publication.coauthors.isnot(None),
                Publication.coauthors != ''
            ).count()
            
            total_pubs = db.query(Publication).count()
            collab_percentage = (collab_pubs / total_pubs * 100) if total_pubs > 0 else 0
            
            return jsonify({
                'status': 'success',
                'data': {
                    'total_publications': total_pubs,
                    'collaborative_publications': collab_pubs,
                    'collaboration_percentage': round(collab_percentage, 2)
                }
            })
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)
