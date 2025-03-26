import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { addEducation, updateEducation, removeEducation, EducationState } from "../../../../redux/cv/cvSlice";

const Education = () => {
  const dispatch = useDispatch();
  const educationList = useSelector((state: RootState) => state.cvForm.educations);

  const handleChange = (id: string, field: keyof EducationState,value: string) => {
    dispatch(updateEducation({ id, field, value}));
  };

  const handleDelete = (id: string) => {
    dispatch(removeEducation(id));
  }
  return (
    <div>
      <h2>השכלה</h2>
      {educationList.map((edu) => (
        <div key={edu.id}>
          <label>שם מוסד לימודים:</label>
          <input
            type="text"
            name="institution"
            value={edu.institution}
            onChange={(e) => handleChange(edu.id, 'institution', e.target.value)}
          />
          <label>תואר:</label>
          <input
            type="text"
            name="degree"
            value={edu.degree}
            onChange={(e) => handleChange(edu.id, 'degree', e.target.value)}
          />
          <label>שנות לימוד:</label>
          <input
            type="text"
            name="studyYears"
            value={edu.studyYears}
            onChange={(e) => handleChange(edu.id,'studyYears' ,e.target.value)}
          />
          <button onClick={() => handleDelete(edu.id)}>🗑️ מחק</button>
        </div>
      ))}
      <button onClick={() => dispatch(addEducation())}>➕ הוסף תואר</button>
    </div>
  );
};

export default Education;
