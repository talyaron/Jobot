import { JobModel } from "../../../Model/jobModel";

export async function editJob(req: any, res: any) {
    try {
        const { id } = req.params;
        const updateData = req.body;

        if (!id) return res.status(400).json({ error: "Job ID is required." });

        const updatedJob = await JobModel.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedJob) return res.status(404).json({ error: "Job not found." });

        return res.json({ message: "Job updated successfully!", job: updatedJob });

    } catch (error) {
        console.error("Error updating job:", error);
        return res.status(500).json({ message: "Server error" });
    }
}
