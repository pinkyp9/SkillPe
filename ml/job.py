import re
import json

def extract_job_details(job_description):
    """Extracts role, experience, and job requirements from a given job description and returns as JSON."""

    # Extract Role (Handles multiple formats: "We are looking for...", "Role:", "Position:", "Job Title:")
    role_patterns = [
        r"We are looking for (?:a|an) (.+?) to join our team",  # Example: "We are looking for a Senior Developer to join our team."
        r"Role:\s*(.+)",  # Example: "Role: Senior Frontend Developer"
        r"Position:\s*(.+)",  # Example: "Position: Software Engineer"
        r"Job Title:\s*(.+)"  # Example: "Job Title: Machine Learning Engineer"
    ]
    
    role = "Role not specified"
    for pattern in role_patterns:
        match = re.search(pattern, job_description, re.IGNORECASE)
        if match:
            role = match.group(1).strip()
            break

    # Extract Experience Requirement (Handles various formats)
    exp_match = re.search(r"(?:at least|minimal|min)?\s*(\d+)\+?\s*years?\s*of experience", job_description, re.IGNORECASE)
    experience_required = int(exp_match.group(1)) if exp_match else None  # Default to None if not found

    # Extract Required Skills & Levels (Format: "React Advanced", "JavaScript Intermediate")
    skill_pattern = re.findall(r"([\w\/+\-]+)\s+(Advanced|Intermediate|Beginner)", job_description, re.IGNORECASE)
    job_requirements = {skill.strip(): level for skill, level in skill_pattern}

    # Create JSON output
    job_data = {
        "Role": role,
        "Experience Required": experience_required,
        "Job Requirements": job_requirements
    }

    return json.dumps(job_data, indent=4)  # Convert to JSON format with indentation




