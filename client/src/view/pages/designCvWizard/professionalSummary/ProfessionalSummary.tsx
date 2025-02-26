import React from "react";
import styles from "./professionalSummary.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { updateProfessionalSummary } from "../../../../redux/cv/cvSlice";

const ProfessionalSummary = () => {
  const dispatch = useDispatch();
  const professionalSummary = useSelector((state: RootState) => state.cvForm.professionalSummary);

  const handleProfessionalSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newSummary = e.target.value;
    dispatch(updateProfessionalSummary({ summary: newSummary }));
    console.log(professionalSummary)
  };

  return (
    <div className={styles.continer}>
      <form>
        <h2>סיכום מקצועי:</h2>
        <label htmlFor="describeYourself">תאר את עצמך:</label>
        <br />
        <textarea
          id="describeYourself"
          name="describeYourself"
          rows={4}
          cols={50}
          value={professionalSummary.summary}
          onChange={handleProfessionalSummaryChange}
        />
        <br />
      </form>
    </div>
  );
};

export default ProfessionalSummary;
