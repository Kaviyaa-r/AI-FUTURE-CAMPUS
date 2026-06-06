import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const client = new OpenAI({
    apiKey: process.env.API_KEY
});

/* -----------------------------
   HEALTH CHECK
------------------------------*/

app.get("/", (req, res) => {

    res.json({
        message: "AI Future Campus Backend Running"
    });

});

/* -----------------------------
   MODULE 3
   SKILL GAP ANALYSIS
------------------------------*/

app.post("/skill-gap", async (req, res) => {

    try {

        const {
            target_role,
            current_skills
        } = req.body;

        if (!target_role || !current_skills) {

            return res.status(400).json({
                success: false,
                message: "target_role and current_skills required"
            });

        }

        const prompt = `

Target Role:
${target_role}

Current Skills:
${current_skills.join(", ")}

Analyze the student profile.

Return ONLY valid JSON:

{
"missing_skills": [],
"score": 0,
"roadmap": [],
"projects": []
}

Requirements:
1. Find missing skills
2. Give employability score out of 100
3. Create 3 month roadmap
4. Suggest projects

`;

        const response =
        await client.chat.completions.create({

            model: "gpt-4.1-mini",

            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ]

        });

        let aiOutput =
        response.choices[0].message.content;

        try {

            aiOutput = JSON.parse(aiOutput);

        } catch {

            aiOutput = {
                raw_response: aiOutput
            };

        }

        res.json({

            success: true,
            data: aiOutput

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

});

/* -----------------------------
   MODULE 4
   EMPLOYABILITY SCORE ENGINE
------------------------------*/

app.post("/employability-score", (req, res) => {

    try {

        const {

            technical_skills,
            problem_solving,
            communication,
            leadership,
            ai_tool_usage,
            project_completion,
            peer_reviews

        } = req.body;

        const technical =

        (
            (
                technical_skills +
                problem_solving +
                project_completion
            ) / 30
        ) * 100;

        const communicationScore =

        (communication / 10) * 100;

        const leadershipScore =

        (leadership / 10) * 100;

        const aiCollaboration =

        (
            (
                ai_tool_usage +
                peer_reviews
            ) / 20
        ) * 100;

        const employabilityScore =

        (
            technical * 0.40 +
            communicationScore * 0.20 +
            leadershipScore * 0.15 +
            aiCollaboration * 0.25
        );

        const weakAreas = [];

        if (technical < 60)
            weakAreas.push("Technical");

        if (communicationScore < 60)
            weakAreas.push("Communication");

        if (leadershipScore < 60)
            weakAreas.push("Leadership");

        if (aiCollaboration < 60)
            weakAreas.push("AI Collaboration");

        res.json({

            employability_score:
            Number(
                employabilityScore.toFixed(1)
            ),

            breakdown: {

                Technical:
                Number(
                    technical.toFixed(0)
                ),

                Communication:
                Number(
                    communicationScore.toFixed(0)
                ),

                Leadership:
                Number(
                    leadershipScore.toFixed(0)
                ),

                "AI Collaboration":
                Number(
                    aiCollaboration.toFixed(0)
                )

            },

            weak_areas: weakAreas

        });

    } catch (error) {

        res.status(500).json({

            message:
            error.message

        });

    }

});

/* -----------------------------
   SERVER START
------------------------------*/

const PORT =
process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(
        `Server Running On Port ${PORT}`
    );

});