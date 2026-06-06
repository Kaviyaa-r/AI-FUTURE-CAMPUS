import pandas as pd

CAREER_REQUIREMENTS = {
    "AI Security Engineer": {
        "python": 70,
        "networking": 70,
        "cloud_security": 70,
        "ai_security": 70,
        "problem_solving": 70,
        "communication": 60
    },

    "AI Product Manager": {
        "problem_solving": 75,
        "communication": 75,
        "leadership": 70,
        "ai_tools": 70
    },

    "AI Auditor": {
        "ai_security": 70,
        "problem_solving": 75,
        "communication": 65,
        "critical_thinking": 80
    }
}


def analyze_skill_gap(student_data):

    career = student_data["career_goal"]

    if career not in CAREER_REQUIREMENTS:
        return {
            "error": "Career goal not supported"
        }

    required = CAREER_REQUIREMENTS[career]

    missing_skills = []
    strong_skills = []

    readiness_scores = []

    for skill, required_score in required.items():

        current_score = student_data.get(skill, 0)

        readiness_scores.append(
            min(current_score / required_score, 1.0) * 100
        )

        if current_score < required_score:
            missing_skills.append(skill.replace("_", " ").title())
        else:
            strong_skills.append(skill.replace("_", " ").title())

    readiness_score = round(sum(readiness_scores) / len(readiness_scores), 1)

    return {
        "career_goal": career,
        "readiness_score": readiness_score,
        "missing_skills": missing_skills,
        "strong_skills": strong_skills,
        "recommended_focus": missing_skills[:3]
    }


student = {
    "career_goal": "AI Security Engineer",
    "python": 75,
    "networking": 60,
    "cloud_security": 40,
    "ai_security": 35,
    "problem_solving": 80,
    "communication": 70
}

result = analyze_skill_gap(student)

print(result)