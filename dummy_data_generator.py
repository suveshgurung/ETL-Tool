import json
import random
from faker import Faker
from datetime import datetime

# Initialize Faker for realistic fake data
fake = Faker()

# ==================== FIELD-SPECIFIC PAPER GENERATORS ====================

def generate_mathematics_paper():
    areas = [
        "Algebraic Geometry", "Number Theory", "Differential Equations", 
        "Topology", "Probability Theory", "Statistical Modeling",
        "Numerical Analysis", "Graph Theory", "Combinatorics"
    ]
    approaches = [
        "Novel Approach to", "Advances in", "Computational Methods for",
        "Theoretical Framework for", "Applications of", "Survey of"
    ]
    return {
        "title": f"{random.choice(approaches)} {random.choice(areas)}",
        "year": random.randint(2018, 2023),
        "journal": random.choice([
            "Annals of Mathematics", 
            "Journal of the AMS",
            "Inventiones Mathematicae",
            "SIAM Journal on Applied Mathematics",
            "Numerische Mathematik"
        ]),
        "co_authors": [fake.name() for _ in range(random.randint(0, 2))]
    }

def generate_pharmacy_paper():
    focus_areas = [
        "Drug Delivery Systems", "Pharmacokinetics", "Pharmacodynamics",
        "Phytochemistry", "Pharmaceutical Analysis", "Clinical Pharmacy",
        "Pharmacogenomics", "Toxicology", "Medicinal Chemistry"
    ]
    methods = [
        "Novel Approach to", "Advances in", "Comparative Study of",
        "Clinical Trial:", "Review of", "Quality Assessment of"
    ]
    return {
        "title": f"{random.choice(methods)} {random.choice(focus_areas)}",
        "year": random.randint(2018, 2023),
        "journal": random.choice([
            "Journal of Pharmaceutical Sciences",
            "Pharmaceutical Research",
            "European Journal of Pharmaceutics",
            "International Journal of Pharmaceutics",
            "American Journal of Health-System Pharmacy"
        ]),
        "co_authors": [fake.name() for _ in range(random.randint(1, 3))]
    }

def generate_physics_paper():
    subfields = [
        "Quantum Mechanics", "Condensed Matter Physics", "Particle Physics",
        "Astrophysics", "Plasma Physics", "Optics", "Nuclear Physics",
        "Biophysics", "Computational Physics"
    ]
    techniques = [
        "Experimental Study of", "Theoretical Framework for", 
        "Computational Modeling of", "Novel Observations in",
        "Advances in", "Applications of"
    ]
    return {
        "title": f"{random.choice(techniques)} {random.choice(subfields)}",
        "year": random.randint(2018, 2023),
        "journal": random.choice([
            "Physical Review Letters",
            "Nature Physics",
            "Journal of Applied Physics",
            "Astrophysical Journal",
            "Nuclear Physics B"
        ]),
        "co_authors": [fake.name() for _ in range(random.randint(0, 3))]
    }

def generate_biotech_paper():
    techniques = [
        "CRISPR-Cas9", "Next-Gen Sequencing", "Proteomic Analysis",
        "Metabolic Engineering", "Synthetic Biology", "Bioinformatics",
        "Gene Therapy", "Stem Cell", "Microbiome"
    ]
    applications = [
        "in Disease Treatment", "for Agricultural Improvement",
        "in Biomanufacturing", "for Environmental Remediation",
        "in Drug Discovery"
    ]
    return {
        "title": f"{random.choice(techniques)} {random.choice(applications)}",
        "year": random.randint(2018, 2023),
        "journal": random.choice([
            "Nature Biotechnology",
            "Biotechnology Advances",
            "Metabolic Engineering",
            "ACS Synthetic Biology",
            "Journal of Biotechnology"
        ]),
        "co_authors": [fake.name() for _ in range(random.randint(1, 4))]
    }

def generate_compsci_paper():
    domains = [
        "Machine Learning", "Computer Vision", "Natural Language Processing",
        "Cybersecurity", "Blockchain", "Cloud Computing", "IoT", "Big Data",
        "Human-Computer Interaction", "Software Engineering"
    ]
    approaches = [
        "Deep Learning for", "Novel Algorithm for", "Survey of",
        "Comparative Study of", "Optimization Techniques for",
        "Framework for", "Systematic Review of"
    ]
    return {
        "title": f"{random.choice(approaches)} {random.choice(domains)}",
        "year": random.randint(2018, 2023),
        "journal": random.choice([
            "IEEE Transactions on Pattern Analysis",
            "ACM Computing Surveys",
            "Journal of Machine Learning Research",
            "IEEE Security & Privacy",
            "Communications of the ACM"
        ]),
        "co_authors": [fake.name() for _ in range(random.randint(0, 3))]
    }

def generate_ee_paper():
    topics = [
        "Power Systems", "Renewable Energy", "5G Networks",
        "IoT Devices", "Semiconductor Devices", "Control Systems",
        "Signal Processing", "Embedded Systems", "VLSI Design"
    ]
    methods = [
        "Modeling of", "Optimization of", "Novel Design for",
        "Performance Analysis of", "Implementation of", "Survey of"
    ]
    return {
        "title": f"{random.choice(methods)} {random.choice(topics)}",
        "year": random.randint(2018, 2023),
        "journal": random.choice([
            "IEEE Transactions on Power Systems",
            "IEEE Internet of Things Journal",
            "Renewable Energy",
            "IEEE Journal of Solid-State Circuits",
            "IEEE Transactions on Signal Processing"
        ]),
        "co_authors": [fake.name() for _ in range(random.randint(0, 2))]
    }

def generate_mech_paper():
    areas = [
        "Thermodynamics", "Fluid Mechanics", "Heat Transfer",
        "Finite Element Analysis", "Robotics", "Mechatronics",
        "Composite Materials", "Manufacturing Processes", "Automotive Systems"
    ]
    techniques = [
        "Computational Modeling of", "Experimental Analysis of",
        "Design Optimization for", "Novel Approach to",
        "Advances in", "Applications of"
    ]
    return {
        "title": f"{random.choice(techniques)} {random.choice(areas)}",
        "year": random.randint(2018, 2023),
        "journal": random.choice([
            "Journal of Mechanical Design",
            "International Journal of Heat and Mass Transfer",
            "Journal of Fluid Mechanics",
            "Composite Structures",
            "Robotics and Autonomous Systems"
        ]),
        "co_authors": [fake.name() for _ in range(random.randint(0, 2))]
    }

def generate_geomatics_paper():
    technologies = [
        "Remote Sensing", "GIS", "GPS", "LiDAR", "Photogrammetry",
        "Spatial Analysis", "Cartography", "Geospatial Intelligence"
    ]
    applications = [
        "Urban Planning", "Environmental Monitoring", "Disaster Management",
        "Agriculture", "Forestry", "Climate Change", "Hydrology"
    ]
    return {
        "title": f"{random.choice(technologies)} for {random.choice(applications)}",
        "year": random.randint(2018, 2023),
        "journal": random.choice([
            "ISPRS Journal of Photogrammetry",
            "International Journal of GIS",
            "Remote Sensing of Environment",
            "Photogrammetric Engineering & Remote Sensing",
            "Computers & Geosciences"
        ]),
        "co_authors": [fake.name() for _ in range(random.randint(0, 2))]
    }

def generate_architecture_paper():
    styles = [
        "Sustainable", "Vernacular", "Modern", "Postmodern", "Brutalist",
        "Parametric", "Biophilic", "Smart", "Resilient"
    ]
    focus_areas = [
        "Urban Design", "Building Materials", "Structural Systems",
        "Interior Spaces", "Landscape Architecture", "Historic Preservation",
        "Acoustics", "Lighting Design"
    ]
    return {
        "title": f"{random.choice(styles)} {random.choice(focus_areas)} in {fake.city()}",
        "year": random.randint(2018, 2023),
        "journal": random.choice([
            "Journal of Architectural Education",
            "Architectural Review",
            "Building and Environment",
            "Landscape and Urban Planning",
            "Architectural Science Review"
        ]),
        "co_authors": [fake.name() for _ in range(random.randint(0, 2))]
    }

def generate_chemical_paper():
    processes = [
        "Catalysis", "Polymerization", "Nanomaterial Synthesis",
        "Separation Processes", "Reaction Engineering", "Process Optimization",
        "Biochemical Engineering", "Electrochemistry"
    ]
    applications = [
        "Energy Storage", "Pharmaceuticals", "Environmental Remediation",
        "Materials Science", "Food Processing", "Consumer Products"
    ]
    return {
        "title": f"{random.choice(processes)} for {random.choice(applications)}",
        "year": random.randint(2018, 2023),
        "journal": random.choice([
            "Chemical Engineering Journal",
            "Industrial & Engineering Chemistry Research",
            "Journal of Materials Chemistry",
            "ACS Catalysis",
            "AIChE Journal"
        ]),
        "co_authors": [fake.name() for _ in range(random.randint(0, 2))]
    }

def generate_civil_paper():
    specialties = [
        "Structural Engineering", "Geotechnical Engineering", 
        "Transportation Engineering", "Environmental Engineering",
        "Water Resources", "Construction Management", 
        "Earthquake Engineering", "Materials Science"
    ]
    methods = [
        "Design of", "Analysis of", "Modeling of", 
        "Innovations in", "Case Study:", "Review of"
    ]
    return {
        "title": f"{random.choice(methods)} {random.choice(specialties)}",
        "year": random.randint(2018, 2023),
        "journal": random.choice([
            "Journal of Structural Engineering",
            "Geotechnique",
            "Construction and Building Materials",
            "Transportation Research",
            "Journal of Environmental Engineering"
        ]),
        "co_authors": [fake.name() for _ in range(random.randint(0, 2))]
    }

def generate_ai_paper():
    techniques = [
        "Deep Learning", "Reinforcement Learning", "Generative Models",
        "Computer Vision", "Natural Language Processing", "Robotics",
        "Explainable AI", "Federated Learning", "Transfer Learning"
    ]
    applications = [
        "Healthcare", "Autonomous Vehicles", "Financial Systems",
        "Education", "Manufacturing", "Cybersecurity", "Agriculture"
    ]
    return {
        "title": f"{random.choice(techniques)} for {random.choice(applications)}",
        "year": random.randint(2018, 2023),
        "journal": random.choice([
            "Nature Machine Intelligence",
            "Journal of Artificial Intelligence Research",
            "IEEE Transactions on Neural Networks",
            "AI Magazine",
            "Neural Computation"
        ]),
        "co_authors": [fake.name() for _ in range(random.randint(0, 3))]
    }

def generate_education_paper():
    levels = [
        "Primary Education", "Secondary Education", "Higher Education",
        "Vocational Training", "Adult Education", "Special Education"
    ]
    approaches = [
        "Pedagogical Innovations in", "Curriculum Development for",
        "Assessment Methods for", "Technology Integration in",
        "Policy Analysis of", "Case Study:"
    ]
    return {
        "title": f"{random.choice(approaches)} {random.choice(levels)}",
        "year": random.randint(2018, 2023),
        "journal": random.choice([
            "Educational Researcher",
            "Review of Educational Research",
            "American Educational Research Journal",
            "Journal of Teacher Education",
            "Computers & Education"
        ]),
        "co_authors": [fake.name() for _ in range(random.randint(0, 2))]
    }

def generate_medical_paper(specialty=None):
    if not specialty:
        specialties = [
            "Cardiology", "Neurology", "Oncology", "Pediatrics", 
            "Surgery", "Pathology", "Pharmacology", "Public Health",
            "Radiology", "Psychiatry", "Dermatology", "Ophthalmology"
        ]
        specialty = random.choice(specialties)
    
    study_types = [
        "Clinical Trial:", "Case Study:", "Review of", 
        "Epidemiological Study of", "Meta-Analysis of",
        "Novel Treatment for", "Genetic Factors in"
    ]
    return {
        "title": f"{random.choice(study_types)} {specialty}",
        "year": random.randint(2018, 2023),
        "journal": random.choice([
            "The Lancet",
            "New England Journal of Medicine",
            "JAMA",
            "BMJ",
            f"Journal of {specialty}"
        ]),
        "co_authors": [fake.name() for _ in range(random.randint(1, 4))]
    }

def generate_management_paper():
    domains = [
        "Strategic Management", "Financial Management", "Marketing",
        "Human Resources", "Operations", "Supply Chain", 
        "Entrepreneurship", "Organizational Behavior"
    ]
    contexts = [
        "in Startups", "in Multinational Corporations",
        "in Developing Economies", "in Tech Industries",
        "Post-Pandemic", "in the Digital Age"
    ]
    return {
        "title": f"{random.choice(domains)} {random.choice(contexts)}",
        "year": random.randint(2018, 2023),
        "journal": random.choice([
            "Harvard Business Review",
            "Academy of Management Journal",
            "Strategic Management Journal",
            "Journal of Marketing",
            "Management Science"
        ]),
        "co_authors": [fake.name() for _ in range(random.randint(0, 3))]
    }

def generate_law_paper():
    areas = [
        "Constitutional Law", "International Law", "Corporate Law",
        "Human Rights Law", "Environmental Law", "Intellectual Property",
        "Criminal Law", "Tax Law", "Cyber Law"
    ]
    contexts = [
        "in Nepal", "in South Asia", "Comparative Analysis with",
        "Case Study:", "Recent Developments in", "Historical Perspective on"
    ]
    return {
        "title": f"{random.choice(areas)}: {random.choice(contexts)}",
        "year": random.randint(2018, 2023),
        "journal": random.choice([
            "Harvard Law Review",
            "Yale Law Journal",
            "Stanford Law Review",
            "American Journal of International Law",
            "Journal of Legal Studies"
        ]),
        "co_authors": [fake.name() for _ in range(random.randint(0, 2))]
    }

def generate_arts_paper():
    disciplines = [
        "Visual Arts", "Music", "Literature", "Theater", 
        "Film Studies", "Cultural Studies", "Art History"
    ]
    approaches = [
        "Critical Analysis of", "Historical Perspective on",
        "Contemporary Trends in", "Comparative Study of",
        "Innovations in", "Case Study:"
    ]
    return {
        "title": f"{random.choice(approaches)} {random.choice(disciplines)}",
        "year": random.randint(2018, 2023),
        "journal": random.choice([
            "Art Journal",
            "Journal of Aesthetics and Art Criticism",
            "Critical Inquiry",
            "Screen",
            "Modern Language Review"
        ]),
        "co_authors": [fake.name() for _ in range(random.randint(0, 2))]
    }

# ==================== DEPARTMENT TO GENERATOR MAPPING ====================

department_generators = {
    # School of Science
    "Department of Mathematics": generate_mathematics_paper,
    "Department of Pharmacy": generate_pharmacy_paper,
    "Department of Physics": generate_physics_paper,
    "Department of Biotechnology": generate_biotech_paper,
    "Department of Environmental Science and Engineering": lambda: generate_biotech_paper(),
    "Department of Agriculture": lambda: generate_biotech_paper(),
    
    # School of Engineering
    "Department of Computer Science and Engineering": generate_compsci_paper,
    "Department of Electrical and Electronics Engineering": generate_ee_paper,
    "Department of Mechanical Engineering": generate_mech_paper,
    "Department of Geomatics Engineering": generate_geomatics_paper,
    "Department of Architecture": generate_architecture_paper,
    "Department of Chemical Science and Engineering": generate_chemical_paper,
    "Department of Civil Engineering": generate_civil_paper,
    "Department of Artificial intelligence": generate_ai_paper,
    
    # School of Education
    "Department of Educational Leadership": generate_education_paper,
    "Department of Inclusive Education, Early Childhood Development and Professional Studies": generate_education_paper,
    "Department of STEAM Education": generate_education_paper,
    "Department of Language Education": generate_education_paper,
    "Department of Development Education": generate_education_paper,
    
    # School of Medical Sciences
    "Department of Anatomy": lambda: generate_medical_paper("Anatomy"),
    "Department of Biochemistry": lambda: generate_medical_paper("Biochemistry"),
    "Department of Community Medicine": lambda: generate_medical_paper("Public Health"),
    "Department of Microbiology": lambda: generate_medical_paper("Microbiology"),
    "Department of Pathology": lambda: generate_medical_paper("Pathology"),
    "Department of Pharmacology": lambda: generate_medical_paper("Pharmacology"),
    "Department of Physiology": lambda: generate_medical_paper("Physiology"),
    "Department of Medicine": generate_medical_paper,
    "Department of Surgery": lambda: generate_medical_paper("Surgery"),
    "Department of Obstetrics and Gynaecology": lambda: generate_medical_paper("Obstetrics"),
    "Department of Pediatrics": lambda: generate_medical_paper("Pediatrics"),
    "Department of Otorhinolaryngology": lambda: generate_medical_paper("ENT"),
    "Department of Ophthalmology": lambda: generate_medical_paper("Ophthalmology"),
    "Department of Radiodiagnosis": lambda: generate_medical_paper("Radiology"),
    "Department of Orthopedics": lambda: generate_medical_paper("Orthopedics"),
    "Department of Anaesthesia": lambda: generate_medical_paper("Anesthesiology"),
    "Department of Forensic Medicine": lambda: generate_medical_paper("Forensics"),
    "Department of Dermatology": lambda: generate_medical_paper("Dermatology"),
    "Department of General Practice and Emergency Medicine": lambda: generate_medical_paper("Emergency Medicine"),
    "Department of Psychiatry": lambda: generate_medical_paper("Psychiatry"),
    "Department of Oral and Maxillofacial Surgery": lambda: generate_medical_paper("Oral Surgery"),
    "Department of Prosthodontics and Maxillo Facial Prosthesis": lambda: generate_medical_paper("Prosthodontics"),
    "Department of Periodontics": lambda: generate_medical_paper("Periodontics"),
    "Department of Conservative Dentistry and Endodontics": lambda: generate_medical_paper("Endodontics"),
    "Department of Orthodontics and Dentofacial Orthopedics": lambda: generate_medical_paper("Orthodontics"),
    "Department of Pediatric and Preventive Dentistry": lambda: generate_medical_paper("Pediatric Dentistry"),
    "Department of Oral Medicine and Radiology": lambda: generate_medical_paper("Oral Medicine"),
    "Department of Oral and Maxillofacial Pathology": lambda: generate_medical_paper("Oral Pathology"),
    "Department of Community Dentistry": lambda: generate_medical_paper("Dental Public Health"),
    "Department of Nursing and Midwifery": lambda: generate_medical_paper("Nursing"),
    "Department of Physiotherapy": lambda: generate_medical_paper("Physiotherapy"),
    "Department of Public Health": lambda: generate_medical_paper("Public Health"),
    
    # Other Schools
    "School of Arts": generate_arts_paper,
    "School of Management": generate_management_paper,
    "School of Law": generate_law_paper
}

# ==================== MAIN GENERATION FUNCTION ====================

def generate_faculty_research_data(faculty_list):
    output_data = []
    for faculty in faculty_list:
        department = faculty["department"]
        if department is None:
            department = faculty["school"]  # For schools without departments
        
        # Determine how many papers to generate (1-3)
        num_papers = random.choices([1, 2, 3], weights=[0.6, 0.3, 0.1])[0]
        
        # Get the appropriate paper generator
        generator = department_generators.get(department, lambda: {
            "title": f"Research in {faculty['school']}",
            "year": random.randint(2018, 2023),
            "journal": "Journal of Interdisciplinary Studies",
            "co_authors": []
        })
        
        # Generate papers
        papers = [generator() for _ in range(num_papers)]
        
        # Create the faculty research record
        if faculty['middle_name'] != "NULL":
            faculty_record = {
                "faculty_id": faculty["faculty_id"],
                "faculty_name": f"{faculty['first_name']} {faculty['middle_name']} {faculty['last_name']}",
                "department": faculty["department"],
                "school": faculty["school"],
                "papers": papers
            }
        else:
            faculty_record = {
                "faculty_id": faculty["faculty_id"],
                "faculty_name": f"{faculty['first_name']} {faculty['last_name']}",
                "department": faculty["department"],
                "school": faculty["school"],
                "papers": papers
            }
        
        output_data.append(faculty_record)
    return output_data

# ==================== SAMPLE USAGE ====================

if __name__ == "__main__":
    # Load your faculty data (replace this with your actual data loading)
    with open('faculties.json') as f:
        faculty_data = json.load(f)
    
    # Generate research papers
    research_data = generate_faculty_research_data(faculty_data)
    
    # Save to JSON file
    with open('faculty_research_papers.json', 'w') as f:
        json.dump(research_data, f, indent=2)
    
    print(f"Generated research papers for {len(research_data)} faculty members")
