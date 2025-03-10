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
    fetchJobById(jobId)
    getUserId();
  }

  function setNameJobInCvForm(jobName: string) {
    dispatch(updatePersonalInformation({jobName}));
  }

  async function fetchJobById(jobIds: string){
    try {
      const response = await fetch(`http://localhost:3000/api/jobs/get-job-by-id/${jobIds}`);
      if (!response.ok) throw new Error("Failed to fetch job");

      const data = await response.json();
      setNameJobInCvForm(data.jobName);

    } catch (err) {
      console.error(err);
    }
  };

  async function getUserId(){
    const response = await fetch(`http://localhost:3000/api/user/profile`,{
      credentials: "include",
    });
    if (!response.ok) throw new Error("Failed to fetch user");
    const data = await response.json();
    const userId = data._id;
    console.log(data)
    dispatch(updatePersonalInformation({userId}))
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
