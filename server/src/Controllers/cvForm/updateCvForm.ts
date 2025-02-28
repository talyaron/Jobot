import { Request, Response } from "express";
import { CvFormModel } from "../../Model/cvFormModel";

export const updateCvForm = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, ...formData } = req.body;

        // if (!userId) {
        //     res.status(400).json({ error: "User ID is required" });
        // }

        const existingCvForm = await CvFormModel.findOne({ userId });

        if (existingCvForm) {
            const updatedCvForm = await CvFormModel.findOneAndUpdate(
                { userId },
                { items: [], ...formData },
                { new: true } // מחזיר את הרשומה לאחר העדכון
            );

            res.status(200).json({ message: "Updated successfully", updatedCvForm });
        } else {
            const newCvForm = new CvFormModel({ userId, ...formData });
            await newCvForm.save();
            res.status(201).json(newCvForm);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
