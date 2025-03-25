import { UserJobPreferencesModel } from "../../Model/joinTables/userJobPreferencesModel";
import { JobModel } from "../../Model/jobModel";
import { AI_API_KEY } from "../../server";
import { GoogleGenAI } from "@google/genai";

export const getMatchedJobs = async (req: any, res: any) => {
  try {
    const userId = req.body.userId || req.userId;
    console.log("User ID:", userId);

    const userPreferences = await UserJobPreferencesModel.findOne({ userId });

    if (!userPreferences || !userPreferences.preferences) {
      return res.status(404).json({ message: "User preferences not found" });
    }

    const allJobs = await JobModel.find();

    const matchedJobIds = await askAI(allJobs, userPreferences);
    if (matchedJobIds.length === 0)
     return res.status(200).json({ message: "didnt find matching jobs" });
    const filtered = allJobs.filter((job) =>
      matchedJobIds.some((id) => job._id.toString() === id)
    );

    res.status(200).json({ message: "success", filtered });
  } catch (error) {
    console.error("Error fetching matched jobs:", error);
    res.status(500).json({ message: "Error fetching matched jobs", error });
  }
};

async function askAI(allJobs: any[], userPreferences: any): Promise<string[]> {
  try {
    if (!AI_API_KEY) throw new Error("no api key");

    const ai = new GoogleGenAI({ apiKey: AI_API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `Given the user preferences: ${JSON.stringify(
        userPreferences
      )}, and the following jobs: ${JSON.stringify(
        allJobs.map((job) => ({
          _id: job._id,
          title: job.title,
          description: job.description,
        }))
      )}. Return ONLY a JSON array of the 4 best matching job _id fields. Do not include any other text or markdown code blocks.`,
    });

    let text = response.text;
    if (!text) return [];

    // Clean up the response
    text = text.replace(/```json\n/g, ""); // Remove markdown code block start
    text = text.replace(/```/g, ""); // remove any remaining code block indicators.

    try {
      const jobIds = JSON.parse(text);
      if (Array.isArray(jobIds)) {
        return jobIds.map((id: any) => id.toString());
      } else {
        console.error("AI response was not a JSON array.");
        return [];
      }
    } catch (parseError) {
      console.error("Error parsing AI response:", parseError);
      return [];
    }
  } catch (error) {
    console.error("Error communicating with Gemini API:", error);
    return [];
  }
}
