import { useJobs } from "./ResultsVM";
import JobCard from "../../components/jobCard/JobCard";
import styles from "./Results.module.scss";
import { Link, useParams } from "react-router";
import { useAllComponentsVM } from "../../pages/designCvWizard/allComponents/AllComponentsVM";
import { updatePersonalInformation } from "../../../redux/cv/cvSlice";
import { useDispatch } from "react-redux";

const Results = () => {
  const { jobIds, savedJobIds, loading, error, saveJob } = useJobs();
  const { isCvFill } = useAllComponentsVM();
  const dispatch = useDispatch();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (jobIds.length === 0) return <p>No jobs found.</p>;

  function setIdJobInCvForm(jobId: string) {
    dispatch(updatePersonalInformation({jobId}));
  }

  return (
    <div className={styles.resultsContainer}>
      {jobIds.map((jobId) => (
        <div key={jobId} className={styles.jobCardContainer}>
          <JobCard jobId={jobId} />
          {!savedJobIds.includes(jobId) && (
            <>
              <button
                className={styles.saveButton}
                onClick={() => saveJob(jobId)}
              >
                Save
              </button>

              <button onClick={() => setIdJobInCvForm(jobId)}>
                <Link to="cv" style={{ color: "white" }}>
                  {isCvFill ? "Update CV" : "Add CV"}
                </Link>
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default Results;
