import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../../../redux/store'
import { addWorkExperience, updateWorkExperience, removeWorkExperience } from '../../../../redux/cv/cvSlice'

import styles from "./workExperience.module.scss"
const WorkExperience: React.FC = () => {
    const dispatch = useDispatch();
    const workExperience = useSelector((state: RootState) => state.cvForm.workExperience);
    console.log(workExperience);

    return (
        <div className={styles.continer}>
            <h2>ניסיון תעסוקתי</h2>
            <button onClick={() => dispatch(addWorkExperience())}>+ הוסף ניסיון תעסוקתי</button>
            
            {workExperience.map((exp) => (
                <div key={exp.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
                    <input 
                        type="text" 
                        placeholder="שם החברה" 
                        value={exp.jobName} 
                        onChange={(e) => dispatch(updateWorkExperience({ id: exp.id, data: { jobName: e.target.value } }))} 
                    />
                    <input 
                        type="text" 
                        placeholder="תפקיד" 
                        value={exp.jobTitle} 
                        onChange={(e) => dispatch(updateWorkExperience({ id: exp.id, data: { jobTitle: e.target.value } }))} 
                    />
                    <input 
                        type="text" 
                        placeholder="סוג המשרה" 
                        value={exp.jobType} 
                        onChange={(e) => dispatch(updateWorkExperience({ id: exp.id, data: { jobType: e.target.value } }))} 
                    />
                    <input 
                        type="date" 
                        placeholder="תאריך התחלה" 
                        value={exp.startDate} 
                        onChange={(e) => dispatch(updateWorkExperience({ id: exp.id, data: { startDate: e.target.value } }))} 
                    />
                    <input 
                        type="date" 
                        placeholder="תאריך סיום" 
                        value={exp.endDate || ""} 
                        onChange={(e) => dispatch(updateWorkExperience({ id: exp.id, data: { endDate: e.target.value } }))} 
                    />
                    <textarea 
                        placeholder="תיאור התפקיד" 
                        value={exp.responsibility} 
                        onChange={(e) => dispatch(updateWorkExperience({ id: exp.id, data: { responsibility: e.target.value } }))} 
                    />
                    <button onClick={() => dispatch(removeWorkExperience(exp.id))}>🗑️ מחק</button>
                </div>
            ))}
        </div>
    );
};

export default WorkExperience;
