import styles from "./jobInputBox.module.scss";
import JobInputBoxVm from "./JobInputBoxVm";
import { Job } from "../../../model/jobModel";
import { FC } from "react";
import { User } from "../../../model/userModel";

interface JobProps {
    job: Job|null;
    user: User;
  }


const JobInputBox:FC<JobProps> = ({ job ,user}) => {
  const { textAreaRef, handleSubmit } = JobInputBoxVm();
  if(!job)return;
  return (
    <div className={styles.boxWrapper}>
      <h2>:הוסף הודעה למעסיק </h2>
      <textarea ref={textAreaRef} />
      <button onClick={()=>handleSubmit(job,user)}> שליחה</button>
    </div>
  );
};

export default JobInputBox;
