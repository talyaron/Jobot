import React from "react";
import styles from "./education.module.scss"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { addEducation, updateEducation, removeEducation } from "../../../../redux/cv/cvSlice";

const Education = () => {
  const dispatch = useDispatch();
  const educationList = useSelector((state: RootState) => state.cvForm.educations);
  console.log(educationList);

  const handleChange = (id: number, e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateEducation({ id, data: { [e.target.name]: e.target.value } }));
  };
console.log("the eduction is : " , educationList)
  return (
    <div className={styles.container}>
      <h2>השכלה</h2>
      {educationList.map((edu) => (
        <div key={edu.id} className={styles.educationItem}>
          <label>שם מוסד לימודים:</label>
          <input
            type="text"
            name="institutionName"
            value={edu.institutionName}
            onChange={(e) => handleChange(edu.id, e)}
          />
          <label>תואר:</label>
          <input
            type="text"
            name="degree"
            value={edu.degree}
            onChange={(e) => handleChange(edu.id, e)}
          />
          <label>שנות לימוד:</label>
          <input
            type="text"
            name="studyYears"
            value={edu.studyYears}
            onChange={(e) => handleChange(edu.id, e)}
          />
          <button onClick={() => dispatch(removeEducation(edu.id))}>🗑️ מחק</button>
        </div>
      ))}
      <button onClick={() => dispatch(addEducation())}>➕ הוסף תואר</button>
    </div>
  );
};

export default Education;
