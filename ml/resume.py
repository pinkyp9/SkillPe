import pdfplumber
import re
import json
from collections import defaultdict

# Path to the resume PDF
def extract_resume_details(pdf_path):
# Define skill categories with example keywords
    DOMAIN_SKILLS = {
        "Software Development": {
            # Programming languages
            "python", "java", "c", "c++", "c#", "javascript", "typescript", "go", "rust", 
            "ruby", "php", "scala", "perl", "lua", "dart",
            
            # Development frameworks
            "react", "angular", "vue", "django", "flask", "spring", "express", "fastapi", 
            "next.js", "nuxt.js", "nestjs", "laravel", "rails", "asp.net",
            
            # Development tools
            "git", "github", "gitlab", "vs code", "intellij", "eclipse", "pycharm", 
            "docker", "kubernetes", "jenkins", "jira", "confluence", "postman",
            
            # Testing
            "jest", "pytest", "junit", "selenium", "cypress", "mocha", "chai", "unittest",
            
            # Software architecture
            "microservices", "rest api", "graphql", "soap", "mvc", "mvvm", "clean architecture"
        },
        
        "Web Development": {
            # Frontend
            "html", "css", "javascript", "typescript", "react", "angular", "vue", "svelte",
            "next.js", "nuxt.js", "webpack", "babel", "bootstrap", "tailwind", "material-ui",
            "sass", "less", "jquery", "redux", "responsive design",
            
            # Backend
            "node.js", "express", "django", "flask", "spring", "fastapi", "laravel", "php",
            "ruby on rails", "asp.net", "graphql", "rest api",
            
            # Deployment & Hosting
            "netlify", "vercel", "heroku", "aws", "azure", "gcp", "firebase", "nginx", "apache"
        },
        
        "Data Science & Analytics": {
            # Core data science
            "data science", "data analysis", "statistical modeling", "hypothesis testing",
            "a/b testing", "predictive modeling", "time series analysis", "dimensionality reduction",
            "feature engineering", "regression", "classification", "clustering",
            
            # Tools & Libraries
            "python", "r", "sql", "pandas", "numpy", "matplotlib", "seaborn", "plotly",
            "scikit-learn", "jupyter", "tableau", "power bi", "excel", "spss", "sas",
            
            # Big Data
            "big data", "hadoop", "spark", "kafka", "hive", "pig", "etl", "data pipeline",
            "data engineering", "data warehouse", "data lake"
        },
        
        "Machine Learning & AI": {
            # Core ML concepts
            "machine learning", "deep learning", "neural networks", "supervised learning", 
            "unsupervised learning", "reinforcement learning", "transfer learning", 
            "generative ai", "bayesian networks", "gans", "feature selection",
            
            # Frameworks & Libraries
            "tensorflow", "pytorch", "keras", "scikit-learn", "xgboost", "lightgbm", 
            "catboost", "hugging face", "openai", "langchain",
            
            # Specialized ML areas
            "computer vision", "natural language processing", "nlp", "recommender systems",
            "anomaly detection", "sentiment analysis", "transformers", "bert", "gpt",
            "llm", "large language models"
        },
        
        "Computer Vision": {
            "computer vision", "opencv", "image processing", "object detection", "face recognition",
            "image classification", "image segmentation", "ocr", "optical flow", "yolo",
            "r-cnn", "convolutional neural networks", "cnn", "feature extraction", "sift", "surf"
        },
        
        "Natural Language Processing": {
            "nlp", "natural language processing", "transformers", "bert", "gpt", "word2vec",
            "glove", "text classification", "named entity recognition", "sentiment analysis",
            "topic modeling", "text generation", "machine translation", "chatbots",
            "question answering", "text summarization", "language understanding", "word embeddings",
            "tokenization", "lemmatization", "tf-idf", "rnn", "lstm"
        },
        
        "Cloud Computing & DevOps": {
            # Cloud platforms
            "aws", "amazon web services", "azure", "gcp", "google cloud", "ibm cloud",
            "oracle cloud", "digital ocean", "heroku", "netlify", "vercel",
            
            # DevOps tools
            "docker", "kubernetes", "jenkins", "github actions", "gitlab ci/cd", "travis ci",
            "circleci", "terraform", "ansible", "puppet", "chef", "vagrant",
            
            # Monitoring & Logging
            "prometheus", "grafana", "elk stack", "splunk", "datadog", "new relic",
            "cloudwatch", "nagios", "zabbix",
            
            # Infrastructure
            "serverless", "lambda", "ec2", "s3", "rds", "microservices", "iac",
            "infrastructure as code", "load balancing", "auto-scaling"
        },
        
        "Database Management": {
            # Relational databases
            "sql", "mysql", "postgresql", "oracle", "sql server", "sqlite", "mariadb",
            
            # NoSQL databases
            "mongodb", "cassandra", "couchdb", "dynamodb", "firebase", "redis", "neo4j",
            "elasticsearch", "hbase",
            
            # Data warehousing
            "snowflake", "redshift", "bigquery", "synapse", "data warehouse",
            
            # Database concepts
            "database design", "normalization", "indexing", "query optimization",
            "acid", "transaction management", "replication", "sharding"
        },
        
        "Mobile Development": {
            # Cross-platform
            "react native", "flutter", "xamarin", "ionic", "cordova", "capacitor",
            
            # Android
            "android", "android studio", "kotlin", "java", "jetpack compose", "material design",
            
            # iOS
            "ios", "swift", "objective-c", "swiftui", "uikit", "xcode", "cocoa touch",
            
            # Mobile concepts
            "mobile ui/ux", "responsive design", "push notifications", "offline storage",
            "location services", "camera integration", "bluetooth", "mobile security"
        },
        
        "Cybersecurity": {
            "cybersecurity", "network security", "application security", "penetration testing",
            "ethical hacking", "vulnerability assessment", "threat modeling", "encryption",
            "authentication", "authorization", "oauth", "jwt", "kerberos", "sso",
            "firewall", "ids/ips", "siem", "dlp", "security audit", "compliance",
            "burpsuite", "wireshark", "metasploit", "nmap", "kali linux", "owasp"
        },
        
        "Game Development": {
            "unity", "unreal engine", "godot", "game design", "3d modeling", "animation",
            "physics engines", "ai for games", "shader programming", "level design",
            "c#", "c++", "directx", "opengl", "vulkan", "blender", "maya", "zbrush"
        },
        
        "Embedded Systems & IoT": {
            "embedded systems", "iot", "internet of things", "arduino", "raspberry pi", "esp32",
            "stm32", "pic microcontroller", "rtos", "embedded c", "embedded linux",
            "verilog", "vhdl", "rtl", "fpga", "asic", "pcb design", "firmware",
            "sensors", "actuators", "robotics", "automation"
        },
        
        "UI/UX Design": {
            "ui design", "ux design", "user research", "wireframing", "prototyping",
            "user testing", "interaction design", "visual design", "information architecture",
            "accessibility", "responsive design", "figma", "sketch", "adobe xd", "invision",
            "design systems", "user-centered design", "usability"
        },
        
        "Project Management": {
            "project management", "agile", "scrum", "kanban", "waterfall", "jira",
            "confluence", "trello", "asana", "monday.com", "gantt chart", "sprint planning",
            "backlog grooming", "risk management", "stakeholder management", "pmp",
            "prince2", "lean", "six sigma"
        },
        
        "Soft Skills": {
            "leadership", "communication", "problem-solving", "teamwork", "adaptability",
            "creativity", "critical thinking", "emotional intelligence", "collaboration",
            "time management", "negotiation", "conflict resolution", "public speaking",
            "decision making", "mentoring", "customer service", "presentation skills"
        }
    }

    # Career fields mapped to specific skills
    CAREER_FIELDS = {
        "Web Development": {
            "react", "next.js", "angular", "vue", "svelte", "html", "css", "javascript",
            "typescript", "django", "flask", "express", "fastapi", "spring", "tailwind",
            "bootstrap", "material-ui", "php", "laravel"
        },
        
        "Machine Learning & AI": {
            "machine learning", "deep learning", "tensorflow", "pytorch", "scikit-learn",
            "keras", "xgboost", "opencv", "computer vision", "nlp", "transformers",
            "bert", "gpt", "text classification", "image processing", "ocr"
        },
        
        "Data Science & Analytics": {
            "data science", "big data", "data visualization", "statistical modeling",
            "feature engineering", "dimensionality reduction", "time series analysis",
            "hypothesis testing", "a/b testing", "etl", "sql", "power bi", "tableau",
            "pandas", "numpy", "matplotlib", "seaborn", "plotly"
        },
        
        "Cloud & DevOps": {
            "aws", "azure", "gcp", "firebase", "docker", "kubernetes", "jenkins",
            "terraform", "ansible", "circleci", "travis ci", "heroku", "vercel", "netlify"
        },
        
        "Cybersecurity": {
            "burpsuite", "nmap", "wireshark", "metasploit", "kali linux", "owasp",
            "firewall", "splunk", "siem", "threat intelligence"
        },
        
        "Mobile Development": {
            "flutter", "react native", "swift", "kotlin", "android studio", "xamarin",
            "ionic", "cordova", "jetpack compose"
        },
        
        "Embedded Systems & IoT": {
            "arduino", "raspberry pi", "esp32", "stm32", "fpga", "verilog", "vhdl", "robotics"
        },
        
        "Software Development": {
            "c", "c++", "c#", "java", "python", "rust", "go", "ruby", "dart", "scala",
            "perl", "lua", "matlab", "objective-c"
        }
    }

    # Achievement Keywords and Experience section identifiers
    ACHIEVEMENT_KEYWORDS = ["achievements", "awards", "honors", "recognition", "accomplishments"]
    EXPERIENCE_KEYWORDS = ["experience", "work experience", "employment history", "professional experience"]
    SECTION_STOPWORDS = ["projects", "research", "skills", "education", "certifications", "positions of responsibility"]

    # Date patterns
    DATE_PATTERNS = [r"\b\d{2}/\d{4}\b", r"\b\d{4}\b", r"\b\d{2}-\d{4}\b", r"\b\w+ \d{4}\b"]


    #-------------------------------------------------------------------------
    # Text Extraction Functions
    #-------------------------------------------------------------------------

    def extract_text_from_pdf(pdf_path):
        """Extract text from a PDF file."""
        text = ""
        with pdfplumber.open(pdf_path) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
        return text.lower()


    def extract_experience_section(text):
        """Extract the work experience section from resume text."""
        lines = text.split("\n")
        experience_section = []
        capture = False

        for line in lines:
            if any(keyword in line for keyword in EXPERIENCE_KEYWORDS):
                capture = True
                continue
            if capture:
                if any(stopword in line for stopword in SECTION_STOPWORDS):
                    break  # Stop when reaching unrelated sections
                experience_section.append(line)

        return "\n".join(experience_section).strip()


    def extract_email(text):
        """Extract email address from text."""
        email_pattern = r"[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
        emails = re.findall(email_pattern, text)
        return emails[0] if emails else None


    def extract_phone_number(text):
        """Extract phone number from text."""
        phone_pattern = r"\b\d{10}\b"  # Matches a 10-digit number
        phones = re.findall(phone_pattern, text)
        return phones[0] if phones else None


    def extract_links(text):
        """Extract professional links from text."""
        patterns = {
            "LinkedIn": r"(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+",
            "GitHub": r"(https?:\/\/)?(www\.)?github\.com\/[a-zA-Z0-9_-]+",
            "Leetcode": r"(https?:\/\/)?(www\.)?leetcode\.com\/[a-zA-Z0-9_-]+",
            "Codeforces": r"(https?:\/\/)?(www\.)?codeforces\.com\/profile\/[a-zA-Z0-9_-]+",
            "CodeChef": r"(https?:\/\/)?(www\.)?codechef\.com\/users\/[a-zA-Z0-9_-]+",
            "Portfolio": r"(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.(com|net|org|io|dev|xyz)\/[a-zA-Z0-9_-]+"
        }
        
        extracted = {key: None for key in patterns}
        
        for platform, pattern in patterns.items():
            match = re.search(pattern, text)
            if match:
                extracted[platform] = match.group(0) if match.group(0).startswith("http") else "https://" + match.group(0)
        
        return extracted
    def extract_name(text):
        lines = text.strip().split("\n")
        if lines:
            return lines[0]  # Assuming name is in the first line
        return None


    def extract_achievements_section(text):
        achievements = []
        text_lower = text.lower()
        lines = text_lower.split("\n")
        capture = False
        for line in lines:
            line = line.strip()
            if any(keyword in line for keyword in ACHIEVEMENT_KEYWORDS):
                capture = True
                continue            
            if capture and (line.startswith(("•", "-", "*")) or len(line.split()) > 3):
                achievements.append(line)
        
        return achievements

    def extract_skills(text):
        """Extract and categorize skills from resume text."""
        categorized_skills = defaultdict(set)
        text_lower = text.lower()
        
        for category in DOMAIN_SKILLS.keys():
            match = re.search(rf"{category.lower()}[:\-\n]?\s*([\w\s,\/\-\(\).]+)", text_lower)
            if match:
                skills = re.split(r",|\s|\/", match.group(1))
                for skill in skills:
                    skill = skill.strip().lower()
                    if skill in DOMAIN_SKILLS[category]:
                        categorized_skills[category].add(skill)

        words = set(re.split(r"\W+", text_lower))
        for category, skill_set in DOMAIN_SKILLS.items():
            for skill in skill_set:
                if skill in words:
                    categorized_skills[category].add(skill)
        
        return categorized_skills
    def compute_skill_scores(skills_dict):
        skill_scores = {}
        total_skills = sum(len(skills) for skills in skills_dict.values())

        for category, skills in skills_dict.items():
            score = len(skills)
            percentage = (score / total_skills * 100) if total_skills > 0 else 0
            skill_scores[category] = {
                "skills": list(skills), 
                "score": score, 
                "percentage": round(percentage, 2)
            }

        return skill_scores
    def extract_career_skills(text):
        """Extract skills related to specific career fields."""
        career_skills = defaultdict(set)
        text_lower = text.lower()
        words = set(re.split(r"\W+", text_lower))
        
        for field, skill_set in CAREER_FIELDS.items():
            for skill in skill_set:
                if skill in words:
                    career_skills[field].add(skill)
        
        return career_skills


    def predict_career_field(career_skills):
        """Determine the most suitable career field based on skills."""
        field_scores = {field: len(skills) for field, skills in career_skills.items()}
        
        total_score = sum(field_scores.values())
        if total_score > 0:
            for field in field_scores:
                field_scores[field] = round((field_scores[field] / total_score) * 100, 2)
        
        sorted_fields = sorted(field_scores.items(), key=lambda x: x[1], reverse=True)
        recommended_field = sorted_fields[0][0] if sorted_fields else "Unknown"
        
        return recommended_field, field_scores

    def extract_experience_details(experience_text):
        """Extract detailed work experience information."""
        experiences = []
        lines = experience_text.split("\n")

        current_job = None
        job_description = []

        for i, line in enumerate(lines):
            line = line.strip()
            if re.search(r"\b(manager|developer|engineer|analyst|intern|specialist|lead)\b", line, re.IGNORECASE):
                if current_job:
                    current_job["description"] = " ".join(job_description).strip()
                    experiences.append(current_job)

                current_job = {
                    "role": line,
                    "skills": set(),
                    "duration": "",
                    "description": "",
                }
                job_description = []
                if i + 1 < len(lines) and re.search(r"\b(\d{4})\s*[-–]\s*(\d{4}|PRESENT)\b", lines[i + 1], re.IGNORECASE):
                    current_job["duration"] = lines[i + 1].strip()

            if current_job and re.search(r"\b(\d{4})\s*[-–]\s*(\d{4}|PRESENT)\b", line, re.IGNORECASE):
                current_job["duration"] = line.strip()

            if current_job:
                for category, skills in CAREER_FIELDS.items():
                    for skill in skills:
                        if skill in line.lower():
                            current_job["skills"].add(skill)

                job_description.append(line)

        if current_job:
            current_job["description"] = " ".join(job_description).strip()
            experiences.append(current_job)

        return experiences
    def parse_date(date_str):
        """Convert date strings to datetime objects."""
        from datetime import datetime
        formats = ["%m/%Y", "%Y", "%m-%Y", "%B %Y"]
        for fmt in formats:
            try:
                return datetime.strptime(date_str, fmt)
            except ValueError:
                continue
        return None
    def extract_duration(text):
        """Extract total experience duration."""
        dates = []
        for pattern in DATE_PATTERNS:
            matches = re.findall(pattern, text)
            dates.extend(matches)

        if len(dates) >= 2:
            start_date = parse_date(dates[0])
            end_date = parse_date(dates[-1])

            if start_date and end_date:
                if end_date < start_date:
                    return "Invalid Date Range"
                total_months = (end_date.year - start_date.year) * 12 + (end_date.month - start_date.month)
                return f"{total_months // 12} years, {total_months % 12} months"
        return "Unknown"
    def analyze_resume(pdf_path):
        resume_text = extract_text_from_pdf(pdf_path)
        name = extract_name(resume_text)
        email = extract_email(resume_text)
        phone = extract_phone_number(resume_text)
        links = extract_links(resume_text)
        extracted_skills = extract_skills(resume_text)
        skill_analysis = compute_skill_scores(extracted_skills)
        career_skills = extract_career_skills(resume_text)
        predicted_field, field_percentages = predict_career_field(career_skills)
        achievements = extract_achievements_section(resume_text)
        experience_text = extract_experience_section(resume_text)
        experiences = extract_experience_details(experience_text)
        for exp in experiences:
            exp["skills"] = list(exp["skills"])
        resume_analysis = {
            "personal_details": {
                "name": name,
                "email": email,
                "phone": phone,
                "links": links
            },
            "skills_analysis": skill_analysis,
            "career_prediction": {
                "recommended_field": predicted_field,
                "field_scores": field_percentages,
                "field_skills": {field: list(skills) for field, skills in career_skills.items()}
            },
            "achievements": achievements,
            "experiences": experiences
        }
        return resume_analysis
    resume_analysis = analyze_resume(pdf_path)
    return json.dumps(resume_analysis, indent=4)
extract_resume_details("resume.pdf")
