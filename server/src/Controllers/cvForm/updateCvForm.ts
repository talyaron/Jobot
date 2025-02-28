import { Request, Response } from "express";
import { CvFormModel } from "../../Model/cvFormModel";
import { ok } from "assert";

export const updateCvForm = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log("Request Body:", JSON.stringify(req.body, null, 2));
        const { userId, ...formData } = req.body;

        // if (!userId) {
        //     res.status(400).json({ error: "User ID is required" });
        // }

        const existingCvForm = await CvFormModel.findOne({ userId });
        console.log("Existing CV Before Update:", JSON.stringify(existingCvForm, null, 2));

        if (existingCvForm) {
            await CvFormModel.findOneAndUpdate(
                { userId },
                { items: [], ...formData },
                { new: true } // מחזיר את הרשומה לאחר העדכון
            );

            res.status(200).json({ message: "Updated successfully", ok: true });
        } else {
            const newCvForm = new CvFormModel({ userId, ...formData });
            await newCvForm.save();
            res.status(201).json({ok: true, message: "Created successfully" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
