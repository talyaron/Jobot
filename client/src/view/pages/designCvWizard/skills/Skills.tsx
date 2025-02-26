import React from "react";
import styles from "./skills.module.scss";
import { useSkillsVM } from "./skills.VM";
import { useWorkExperienceVM } from "../workExperience/workExperienceVM";

const Skills = () => {
    const { 
        skillsData, 
        setSkillsData,
        editingIndexSkills, 
        setEditingIndexSkills,
        formDataSkills, 
        setFormDataSkills 
    } = useSkillsVM();
    const { workExperienceCvData, setWorkExperienceCvData } = useWorkExperienceVM();
      const { formDataWorkExperience, setFormDataWorkExperience } = useWorkExperienceVM();

    const resetForm = () => {
        setFormDataSkills({
            technicalSkills: "",
            spokenLanguages: ""
        });
        setEditingIndexSkills(null);
    };

    const handleSkillsChange = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const technicalSkills = formData.get("technicalSkills") as string;
        const spokenLanguages = formData.get("spokenLanguages") as string;

        if (editingIndexSkills !== null) {
            // עדכון כישורים קיימים
            setSkillsData((prev) => {
                const newData = [...prev];
                newData[editingIndexSkills] = {
                    technicalSkills,
                    spokenLanguages
                };
                return newData;
            });
        } else {
            // הוספת כישורים חדשים
            setSkillsData((prev) => [
                ...prev,
                {
                    technicalSkills,
                    spokenLanguages
                }
            ]);
        }

        resetForm();
    };

    const handleSkillsDelete = (index: number) => {
        setSkillsData((prev) => [
            ...prev.slice(0, index),
            ...prev.slice(index + 1)
        ]);
    };

    const handleSkillsEdit = (index: number) => {
        const skills = skillsData[index];
        setFormDataSkills({
            technicalSkills: skills.technicalSkills,
            spokenLanguages: skills.spokenLanguages
        });
        setEditingIndexSkills(index);
    };

    const handelSendAll = () => {
        console.log(formDataWorkExperience)
    };

    return (
        <div className={styles.continer}>
            <form onSubmit={handleSkillsChange}>
                <h2>כישורים</h2>
                <label htmlFor="technicalSkills">כישורים טכניים:</label>
                <input 
                    type="text" 
                    id="technicalSkills" 
                    name="technicalSkills" 
                    value={formDataSkills.technicalSkills}
                    onChange={(e) => setFormDataSkills({
                        ...formDataSkills, 
                        technicalSkills: e.target.value
                    })}
                    required
                />
                <br />
                <label htmlFor="spokenLanguages">שפות מדוברות:</label>
                <input 
                    type="text" 
                    id="spokenLanguages" 
                    name="spokenLanguages"
                    value={formDataSkills.spokenLanguages}
                    onChange={(e) => setFormDataSkills({
                        ...formDataSkills, 
                        spokenLanguages: e.target.value
                    })}
                    required
                />
                <br />
                <button type="submit">
                    {editingIndexSkills !== null ? 'ערוך כישורים' : 'הוסף כישורים'}
                </button>
                {editingIndexSkills !== null && (
                    <button type="button" onClick={resetForm}>ביטול</button>
                )}
                <br /><br />               
            </form>
            <div>
                {skillsData.map((skill, index) => (
                    <div key={index}>
                        <p>כישורים טכניים: {skill.technicalSkills}</p>
                        <p>שפות מדוברות: {skill.spokenLanguages}</p>
                        <button onClick={() => handleSkillsDelete(index)}>מחק</button>
                        <button onClick={() => handleSkillsEdit(index)}>ערוך</button>
                        <p>--------------------------</p>
                    </div>
                ))}
            </div>
            <button onClick={handelSendAll} type="button">שליחת קורות חיים</button>
        </div>
    );
};

export default Skills;