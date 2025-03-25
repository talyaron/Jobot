import { UserJobPreferencesModel } from "../../Model/joinTables/userJobPreferencesModel";

export async function setUserPreferences(req: any, res: any) {
  try {
    const { preferences } = req.body;
    const userId = req.body.userId || req.userId;
console.log(preferences,userId)
    if (!userId || !preferences) {
      return res.status(400).json({ message: "Missing userId or preferences" });
    }

    const newPreference = await UserJobPreferencesModel.create({
      userId,
      preferences,
    });

    res.status(201).json({ message: "Preferences saved", data: newPreference });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}
