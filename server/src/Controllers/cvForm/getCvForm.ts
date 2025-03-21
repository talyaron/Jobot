import { Request, Response } from "express";
import { CvFormModel } from "../../Model/cvFormModel";
import { request } from "http";

export const getCvForm = async (req: any, res: Response): Promise<void> => {
    try {
        console.log("test");
        // שליפת ה-userId מהעוגייה
        const userId = req.userId;
        if (!userId) {
            res.status(400).json({ error: "User ID is required from cookies" });
            return;
        }

        console.log("Fetching CV for User ID:", userId);

        // חיפוש הנתונים במסד הנתונים
        const existingCvForm = await CvFormModel.findOne({ "personalInformation.userId": userId });

        if (!existingCvForm) {
            res.status(404).json({ message: "CV not found", ok: false });
            return;
        }

        res.status(200).json(existingCvForm);
    } catch (error) {
        console.error("Error fetching CV:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};
