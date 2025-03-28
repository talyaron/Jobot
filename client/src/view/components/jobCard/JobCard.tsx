import styles from "./JobCard.module.scss";
import { Link } from "react-router-dom";
import { Job } from "../../../model/jobModel";
import { useState } from "react";

interface JobCardProps {
  job: Job;
  showSaveButton?: boolean;
  showDeleteButton?: boolean;
  onSave?: (jobId: string) => void;
  onDelete?: (jobId: string) => void;
}

const JobCard: React.FC<JobCardProps> = ({
  job,
  showSaveButton,
  showDeleteButton,
  onSave,
  onDelete,
}) => {
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const handleSave = async (jobId: string) => {
    setIsSaving(true);
    setSaveError(null);
    const success = onSave ? await onSave(jobId) : false;
    setIsSaving(false);

    if (!success) {
      setSaveError("Failed to save job. Please try again.");
    }
  };

  return (
    <div className={styles.card}>
      <Link to={`job-candidate/${job._id}`}>
        <h3 className={styles.jobTitle}>{job.jobName}</h3>
        <p className={styles.details}>
          <strong>Company:</strong> {job.company}
        </p>
        <p className={styles.details}>
          <strong>Details:</strong> {job.details}
        </p>
        <p>
          <strong>Location:</strong> {job.location.toString()}
        </p>
        <p>
          <strong>Employment Type:</strong> {job.employmentType}
        </p>
        <p>
          <strong>Salary:</strong> ${job.salary}
        </p>
      </Link>
      {showSaveButton && onSave && (
        <button
          className={styles.saveButton}
          onClick={() => handleSave(job._id)}
          disabled={isSaving}
        >
          {isSaving ? "Saving..." : "Save"}
        </button>
      )}
      {saveError && <p className={styles.error}>{saveError}</p>}
      {showDeleteButton && onDelete && (
        <button
          className={styles.deleteButton}
          onClick={() => onDelete(job._id)}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default JobCard;
