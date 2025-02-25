import React from "react";
import styles from "./professionalSummary.module.scss";
import { professionalSummaryVM } from "./professionalSummaryVM";

const ProfessionalSummary = () => {
  const { professionalSummary, setProfessionalSummary } = professionalSummaryVM();

  const handleProfessionalSummaryChange = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const describeYourself = formData.get("describeYourself") as string;

    setProfessionalSummary(describeYourself);
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setProfessionalSummary(e.target.value);
  };

  return (
    <div className={styles.continer}>
      <form onSubmit={handleProfessionalSummaryChange}>
        <br />
        <h2>סיכום מקצועי:</h2>
        <label htmlFor="describeYourself">תאר את עצמך:</label>
        <br />
        <textarea 
          id="describeYourself" 
          name="describeYourself" 
          rows={4} 
          cols={50}
          value={professionalSummary}
          onChange={handleTextAreaChange}
        />
        <br />
        {/* <button type="submit">שמור</button> */}
      </form>
    </div>
  );
};

export default ProfessionalSummary;