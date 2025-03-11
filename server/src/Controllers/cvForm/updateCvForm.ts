import { Request, Response } from "express";
import { CvFormModel } from "../../Model/cvFormModel";

export const updateCvForm = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("Request Body:", JSON.stringify(req.body, null, 2));
        const { ...formData } = req.body;
        const userId = req.body.personalInformation?.userId;
        const jobId = req.body.personalInformation?.jobId;
        console.log("the job id is: " +jobId)

        if (!userId) {
            res.status(400).json({ error: "User ID is required" });
            return; // מונע המשך ריצה
        }

        console.log("User ID:", userId, "Type:", typeof userId);

        // חיפוש לפי personalInformation.userId
        const existingCvForm = await CvFormModel.findOne({ "personalInformation.userId": userId });

        console.log("Existing CV Form:", JSON.stringify(existingCvForm, null, 2));

        if (existingCvForm) {
            await CvFormModel.updateOne(
                { "personalInformation.userId": userId },
                { $set: { ...formData } },
                { upsert: false }
            );

            res.status(200).json({ message: "Updated successfully", ok: true });
            return; // כדי שלא ימשיך לתחתית ויצור רשומה חדשה
        }

        // יצירת רשומה חדשה רק אם אין אחת קיימת
        const newCvForm = new CvFormModel({ personalInformation: { userId }, ...formData });
        await newCvForm.save();

        res.status(201).json({ message: "Created successfully", ok: true });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
