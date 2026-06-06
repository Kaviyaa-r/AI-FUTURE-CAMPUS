import pickle
import pandas as pd

# Load trained model once during startup
with open("employability_model.pkl", "rb") as f:
    model = pickle.load(f)

FEATURES = [
    "scenario_score",
    "project_success_rate",
    "mentor_rating",
    "industry_feedback",
    "team_collaboration_score",
    "problem_solving_score",
    "ai_verification_score",
    "communication_score",
    "leadership_score"
]

THRESHOLDS = {
    "scenario_score": 70,
    "project_success_rate": 70,
    "mentor_rating": 70,
    "industry_feedback": 70,
    "team_collaboration_score": 70,
    "problem_solving_score": 70,
    "ai_verification_score": 70,
    "communication_score": 70,
    "leadership_score": 70
}

LABELS = {
    "scenario_score": "Scenario Performance",
    "project_success_rate": "Project Performance",
    "mentor_rating": "Mentor Rating",
    "industry_feedback": "Industry Feedback",
    "team_collaboration_score": "Team Collaboration",
    "problem_solving_score": "Problem Solving",
    "ai_verification_score": "AI Verification",
    "communication_score": "Communication",
    "leadership_score": "Leadership"
}


def predict_employability(student_data):
    """
    student_data = dict received from backend
    """

    input_df = pd.DataFrame([student_data])

    score = round(model.predict(input_df)[0], 1)

    weak_areas = [
        LABELS[k]
        for k, threshold in THRESHOLDS.items()
        if student_data.get(k, 0) < threshold
    ]

    if score >= 80:
        confidence = "High"
    elif score >= 60:
        confidence = "Medium"
    else:
        confidence = "Low"

    # Career Mapping Logic
    careers = []

    if student_data["ai_verification_score"] > 80:
        careers.append("AI Auditor")

    if student_data["problem_solving_score"] > 80:
        careers.append("AI Product Manager")

    if student_data["team_collaboration_score"] > 80:
        careers.append("Project Coordinator")

    if student_data["communication_score"] > 80:
        careers.append("Business Analyst")

    if student_data["leadership_score"] > 80:
        careers.append("Product Manager")

    if not careers:
        careers.append("AI Engineer")

    return {
        "employability_score": score,
        "confidence": confidence,
        "career_matches": careers,
        "weak_areas": weak_areas
    }


# Example backend payload
student = {
    "scenario_score": 85,
    "project_success_rate": 78,
    "mentor_rating": 82,
    "industry_feedback": 75,
    "team_collaboration_score": 88,
    "problem_solving_score": 92,
    "ai_verification_score": 87,
    "communication_score": 65,
    "leadership_score": 72
}

result = predict_employability(student)

print(result)