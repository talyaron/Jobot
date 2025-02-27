import React from "react";
import styles from "./skills.module.scss";
import { useSkillsVM } from "./skills.VM";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from '../../../../redux/store'
import { useWorkExperienceVM } from "../workExperience/workExperienceVM";
import { addSkills,updateSkills,removeSkills } from "../../../../redux/cv/cvSlice";

const Skills: React.FC = () => {
    const dispatch = useDispatch();
    const skillsData = useSelector((state: RootState) => state.cvForm.skills)

    const handelAddSkills = () =>{
        dispatch(addSkills());
    }
    const handleRemoveSkills = (id) => {
        dispatch(removeSkills(id));
    }

    const handleUpdateSkills = (id: string, field: string, value: string) => {
        dispatch(updateSkills({id, data: {[field]: value } }));
    }
    console.log(skillsData)

    return (
        <div className={styles.continer}>
            <h2>כישורים</h2>
            <button onClick={handelAddSkills}>➕ הוספת כישורים</button>
            {skillsData.map((skills) => (
                <div key={skills.id}>
                    <label>כישורים טכניים:</label>
                    <input
                        type="text"
                        name="technicalSkills"
                        value={skills.technicalSkills}
                        onChange={(e) => handleUpdateSkills(skills.id, 'technicalSkills', e.target.value)}
               
                    />
                    <label>שפות מדוברות:</label>
                    <input
                        type="text"
                        name="spokenLanguages"
                        value={skills.spokenLanguages}
                        onChange={(e) => handleUpdateSkills(skills.id, 'spokenLanguages', e.target.value)}
                    />
                    <button onClick={() => handleRemoveSkills(skills.id)}>🗑️ מחק</button>
                </div>
            ))}

        </div>
    );
};

export default Skills;