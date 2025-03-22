from flask import Flask, request, jsonify
import json
import re
import resume
import job
import os
from flask_cors import CORS

app = Flask(__name__)
# Enable CORS specifically for your frontend
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Function to match user resume to job
def match_user_to_job(resume_data, job_data):
    user_skills_flat = set()
    for category in resume_data["skills_analysis"]:
        user_skills_flat.update(resume_data["skills_analysis"][category]["skills"])

    job_skills_required = job_data["Job Requirements"]

    matched_skills = []
    missing_skills = []

    for job_skill in job_skills_required.keys():
        normalized = job_skill.lower()
        if normalized in user_skills_flat:
            matched_skills.append(job_skill)
        else:
            missing_skills.append(job_skill)

    total_required = len(job_skills_required)
    skill_match_percentage = (len(matched_skills) / total_required * 100) if total_required > 0 else 0

    job_experience_required = job_data.get("Experience Required") or 0
    experience_match = False
    total_years = 0

    for exp in resume_data.get("experiences", []):
        dur = exp.get("duration", "")
        match = re.search(r"(\d+)\s*years?", dur)
        if match:
            total_years += int(match.group(1))

    experience_match = total_years >= job_experience_required

    user_field = resume_data["career_prediction"]["recommended_field"]
    job_role = job_data["Role"].lower()
    field_match = user_field.lower() in job_role

    skill_weight = 0.6
    experience_weight = 0.25
    field_weight = 0.15

    total_score = (
        skill_match_percentage * skill_weight +
        (100 if experience_match else 0) * experience_weight +
        (100 if field_match else 0) * field_weight
    )
    final_score = round(total_score, 2)

    if final_score >= 80:
        verdict = "Excellent match"
    elif final_score >= 60:
        verdict = "Good match"
    elif final_score >= 40:
        verdict = "Moderate match"
    else:
        verdict = "Poor match"

    return {
        "match_score": final_score,
        "verdict": verdict,
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "skill_match_percentage": round(skill_match_percentage, 2),
        "experience_match": experience_match,
        "total_experience_years": total_years,
        "field_match": field_match,
        "user_field": user_field,
        "job_role": job_data["Role"]
    }

@app.route("/match", methods=["POST"])
def match_resume_to_job():
    if "resume" not in request.files or "job_description" not in request.files:
        return jsonify({"error": "Both resume (PDF) and job description (TXT) are required."}), 400
    
    resume_file = request.files["resume"]
    job_desc_file = request.files["job_description"]
    
    resume_path = "temp_resume.pdf"
    job_desc_path = "temp_job_description.txt"
    
    resume_file.save(resume_path)
    job_desc_file.save(job_desc_path)
    
    try:
        resume_data = resume.extract_resume_details(resume_path)
        resume_data = json.loads(resume_data)

        with open(job_desc_path, "r", encoding="utf-8") as file:
            job_description_text = file.read()
        
        job_data = job.extract_job_details(job_description_text)
        job_data = json.loads(job_data)

        result = match_user_to_job(resume_data, job_data)
        return jsonify(result)
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    finally:
        # Clean up temporary files
        if os.path.exists(resume_path):
            os.remove(resume_path)
        if os.path.exists(job_desc_path):
            os.remove(job_desc_path)


@app.route("/analyze_resume", methods=["POST"])
def analyze_resume():
    if "resume" not in request.files:
        return jsonify({"error": "Resume file (PDF) is required."}), 400
    
    resume_file = request.files["resume"]
    print(f"Received resume file: {resume_file.filename}")
    
    # Verify file type
    if not resume_file.filename.lower().endswith('.pdf'):
        return jsonify({"error": "Uploaded file must be a PDF."}), 400
    
    # Save uploaded file temporarily
    temp_path = "temp_resume.pdf"
    resume_file.save(temp_path)
    
    try:
        # Process the resume using your existing function
        result = resume.extract_resume_details(temp_path)
        print(f"Resume analysis result: {result[:100]}...")  # Print first 100 chars for debugging
        
        # Return the result (already in JSON format)
        return result, 200, {'Content-Type': 'application/json'}
    
    except Exception as e:
        print(f"Error analyzing resume: {str(e)}")
        return jsonify({"error": str(e)}), 500
    
    finally:
        # Clean up the temporary file
        if os.path.exists(temp_path):
            os.remove(temp_path)

# Add a simple status endpoint to check if the API is running
@app.route("/status", methods=["GET"])
def status():
    return jsonify({"status": "API is running"}), 200

if __name__ == "__main__":
    print("Starting resume matching API on http://localhost:5000")
    app.run(debug=True, host='0.0.0.0', port=5000)