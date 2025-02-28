import { CvFormModel } from "../../Model/cvFormModel";
import { Request, Response } from "express"; // צריך להוסיף את זה


export async function addCvForm(req: Request, res: Response){
    try {
        const newCvForm = new CvFormModel(req.body);
        console.log(newCvForm)
        await newCvForm.save();
        res.status(201).json(newCvForm);
        
    } catch (error) {
        console.error(error);
    
}
}