import { useJobs } from "./ResultsVM";
import JobCard from "../../components/jobCard/JobCard";
import styles from "./Results.module.scss";
import { Link, useParams } from "react-router";
import { useAllComponentsVM } from "../../pages/designCvWizard/allComponents/AllComponentsVM";
import { updatePersonalInformation } from "../../../redux/cv/cvSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

const Results = () => {
  const { jobIds, savedJobIds, loading, error, saveJob } = useJobs();
  const { isCvFill } = useAllComponentsVM();
  const dispatch = useDispatch();
  const personalInformation = useSelector(
    (state: RootState) => state.cvForm.personalInformation
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (jobIds.length === 0) return <p>No jobs found.</p>;

  function setIdJobInCvForm(jobId: string) {
    dispatch(
      updatePersonalInformation({ ...personalInformation, [jobId]: jobId })
    );
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
              {/* <div>
    {jobIds.map((jobId) => (
      <p key={jobId}>{jobId}</p>
    ))}
</div> */}

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
