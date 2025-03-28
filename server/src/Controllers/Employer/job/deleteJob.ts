import { JobModel } from "../../../Model/jobModel";

export async function deleteJob(req: any, res: any) {
    try {
        const { id } = req.params;

        if (!id) return res.status(400).json({ error: "Job ID is required." });

        const deletedJob = await JobModel.findByIdAndDelete(id);

        if (!deletedJob) return res.status(404).json({ error: "Job not found." });

        return res.json({ message: "Job deleted successfully!" });

    } catch (error) {
        console.error("Error deleting job:", error);
        return res.status(500).json({ message: "Server error" });
    }
}