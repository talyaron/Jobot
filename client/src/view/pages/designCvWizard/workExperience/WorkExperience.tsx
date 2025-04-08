import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../../../redux/store'
import { addWorkExperience, updateWorkExperience, removeWorkExperience, WorkExperienceState } from '../../../../redux/cv/cvSlice'

import styles from "./workExperience.module.scss"
const WorkExperience: React.FC = () => {
    const dispatch = useDispatch();
    const workExperience = useSelector((state: RootState) => state.cvForm.workExperience);

    const handleUpdateWorkExperience = (id: string, field: keyof WorkExperienceState, value: string) => {
        dispatch(updateWorkExperience({ id, field, value }));
    };

    return (
        <div className={styles.continer}>
            <h2>ניסיון תעסוקתי</h2>
            <button onClick={() => dispatch(addWorkExperience())}>+ הוסף ניסיון תעסוקתי</button>
            
            {workExperience.map((exp) => (
                <div key={exp.id} style={{ border: "1px solid #ccc", padding: "10px", margin: "10px 0" }}>
                   <input 
                         type="text" 
                        placeholder="שם החברה" 
                        name="jobName"
                        value={exp.jobName} 
                        onChange={(e) => handleUpdateWorkExperience(exp.id, 'jobName', e.target.value)}
                    />              
                    <input 
                        type="text" 
                        name="jobTitle"
                        placeholder="תפקיד" 
                        value={exp.jobTitle} 
                        onChange={(e) => handleUpdateWorkExperience(exp.id, 'jobTitle', e.target.value)}
                        />
                    <input 
                        type="text"
                        name="jobType" 
                        placeholder="סוג המשרה" 
                        value={exp.jobType} 
                        onChange={(e) =>handleUpdateWorkExperience(exp.id, 'jobType', e.target.value)}
                    />
                    <input 
                        type="date" 
                        name="startDate"
                        placeholder="תאריך התחלה" 
                        value={exp.startDate} 
                        onChange={(e) => handleUpdateWorkExperience(exp.id, 'startDate', e.target.value)}
                    />
                    <input 
                        type="date" 
                        name="endDate"
                        placeholder="תאריך סיום" 
                        value={exp.endDate || ""} 
                        onChange={(e) => handleUpdateWorkExperience(exp.id, 'endDate', e.target.value)}
                    />
                    <textarea 
                        placeholder="תיאור התפקיד" 
                        name="responsibility" 
                        value={exp.responsibility} 
                        onChange={(e) => handleUpdateWorkExperience(exp.id, 'responsibility', e.target.value)}
                    />
                    <button onClick={() => dispatch(removeWorkExperience(exp.id))}>🗑️ מחק</button>
                </div>
            ))}
        </div>
    );
};

export default WorkExperience;
