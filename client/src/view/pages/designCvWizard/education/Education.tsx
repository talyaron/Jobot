import React from "react";
import styles from "./education.module.scss";
import { useEducationVM } from "./educationVM";

const Education = () => {
    const { 
        educationData, 
        setEducationData,
        editingIndexEducation, 
        setEditingIndexEducation,
        formDataEducation, 
        setFormDataEducation 
    } = useEducationVM();

    const resetForm = () => {
        setFormDataEducation({
            institutionName: "",
            degree: "",
            studyYears: ""
        });
        setEditingIndexEducation(null);
    };

    const handleEducationChange = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);
        const institutionName = formData.get("institutionName") as string;
        const degree = formData.get("degree") as string;
        const studyYears = formData.get("studyYears") as string;

        if (editingIndexEducation !== null) {
            // עדכון השכלה קיימת 
            setEducationData((prev) => {
                const newData = [...prev];
                newData[editingIndexEducation] = {
                    institutionName,
                    degree,
                    studyYears
                };
                return newData;
            });
        } else {
            // הוספת השכלה חדשה
            setEducationData((prev) => [
                ...prev,
                {
                    institutionName,
                    degree,
                    studyYears
                }
            ]);
        }

        resetForm();
    };

    const handleEducationDelete = (index: number) => {
        setEducationData((prev) => [
            ...prev.slice(0, index),
            ...prev.slice(index + 1)
        ]);
    };

    const handleEducationEdit = (index: number) => {
        const education = educationData[index];
        setFormDataEducation({
            institutionName: education.institutionName,
            degree: education.degree,
            studyYears: education.studyYears
        });
        setEditingIndexEducation(index);
    };

    return (
        <div className={styles.continer}>
            <form onSubmit={handleEducationChange}>
                <h2>השכלה</h2>
                <label htmlFor="institutionName">שם המוסד:</label>
                <input 
                    type="text" 
                    id="institutionName" 
                    name="institutionName" 
                    value={formDataEducation.institutionName}
                    onChange={(e) => setFormDataEducation({
                        ...formDataEducation, 
                        institutionName: e.target.value
                    })}
                    required
                />
                <br />
                <label htmlFor="degree">תואר:</label>
                <input 
                    type="text" 
                    id="degree" 
                    name="degree"
                    value={formDataEducation.degree}
                    onChange={(e) => setFormDataEducation({
                        ...formDataEducation, 
                        degree: e.target.value
                    })}
                    required
                />
                <br />
                <label htmlFor="studyYears">שנות לימוד:</label>
                <input 
                    type="text" 
                    id="studyYears" 
                    name="studyYears"
                    value={formDataEducation.studyYears}
                    onChange={(e) => setFormDataEducation({
                        ...formDataEducation, 
                        studyYears: e.target.value
                    })}
                    required
                    placeholder="2020-2024"
                />
                <br />
                <button type="submit">
                    {editingIndexEducation !== null ? 'ערוך השכלה' : 'הוסף השכלה'}
                </button>
                {editingIndexEducation !== null && (
                    <button type="button" onClick={resetForm}>ביטול</button>
                )}
            </form>
            <div>
                {educationData.map((education, index) => (
                    <div key={index}>
                        <h4>מוסד לימודים: {education.institutionName}</h4>
                        <p>תואר: {education.degree}</p>
                        <p>שנות לימוד: {education.studyYears}</p>
                        <button onClick={() => handleEducationDelete(index)}>מחק</button>
                        <button onClick={() => handleEducationEdit(index)}>ערוך</button>
                        <p>--------------------------</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Education;