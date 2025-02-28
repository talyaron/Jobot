import styles from "./jobInputBox.module.scss";
import JobInputBoxVm from "./JobInputBoxVm";

const JobInputBox = () => {
  const { textAreaRef, handleSubmit } = JobInputBoxVm();
  return (
    <div className={styles.boxWrapper}>
      <h2>:הוסף הודעה למעסיק </h2>
      <textarea ref={textAreaRef} />
      <button onClick={handleSubmit}> שליחה</button>
    </div>
  );
};

export default JobInputBox;
