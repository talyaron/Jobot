import React, { useState } from "react";
import styles from "./workExperience.module.scss";
import { useWorkExperienceVM } from "./workExperienceVM"

const WorkExperience = () => {
  const { workExperienceCvData, setWorkExperienceCvData } = useWorkExperienceVM();
  const { editingIndexWorkExperience, setEditingIndexWorkExperience}  = useWorkExperienceVM();
  const { formDataWorkExperience, setFormDataWorkExperience } = useWorkExperienceVM();

  const resetForm = () => {
    setFormDataWorkExperience({
      jobName: "",
      jobTitle: "",
      jobType: "",
      startDate: "",
      endDate: "",
      responsibility: ""
    });
    setEditingIndexWorkExperience(null);
  };

  const handleWorkExperienceChange = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const jobName = formData.get("jobName") as string;
    const jobTitle = formData.get("jobTitle") as string;
    const jobType = formData.get("jobType") as string;
    const startDate = new Date(formData.get("startDate") as string);
    const endDate = formData.get("endDate") ? new Date(formData.get("endDate") as string) : undefined;
    const responsibility = formData.get("responsibility") as string;

    if (editingIndexWorkExperience !== null) {
      // עדכון עבודה קיימת
      setWorkExperienceCvData((prev) => {
        const newData = [...prev];
        newData[editingIndexWorkExperience] = {
          jobName,
          jobTitle,
          jobType,
          startDate,
          endDate,
          responsibility,
        };
        return newData;
      });
    } else {
      // הוספת עבודה חדשה
      setWorkExperienceCvData((prev) => [
        ...prev,
        {
          jobName,
          jobTitle,
          jobType,
          startDate,
          endDate,
          responsibility,
        },
      ]);
    }
    console.log(workExperienceCvData)

    // resetForm();
  };

  const handleWorkExperienceDelete = (index: number) => {
    setWorkExperienceCvData((prev) => [
      ...prev.slice(0, index),
      ...prev.slice(index + 1),
    ]);
  };

  const handleWorkExperienceEdit = (index: number) => {
    const workExperience = workExperienceCvData[index];
    setFormDataWorkExperience({
      jobName: workExperience.jobName,
      jobTitle: workExperience.jobTitle,
      jobType: workExperience.jobType,
      startDate: workExperience.startDate.toISOString().split('T')[0],
      endDate: workExperience.endDate ? workExperience.endDate.toISOString().split('T')[0] : "",
      responsibility: workExperience.responsibility
    });
    setEditingIndexWorkExperience(index);
  };

  return (
    <div className={styles.continer}>
      <form onSubmit={handleWorkExperienceChange}>
        <h2>ניסיון תעסוקתי</h2>
        <label htmlFor="companyName">שם חברה:</label>
        <input 
          type="text" 
          id="jobName" 
          name="jobName" 
          value={formDataWorkExperience.jobName}
          onChange={(e) => setFormDataWorkExperience({...formDataWorkExperience, jobName: e.target.value})}
        />
        <br />
        <label htmlFor="jobTitle">תפקידך בעבודה:</label>
        <input 
          type="text" 
          id="jobTitle" 
          name="jobTitle"
          value={formDataWorkExperience.jobTitle}
          onChange={(e) => setFormDataWorkExperience({...formDataWorkExperience, jobTitle: e.target.value})}
        />
        <br />
        <label htmlFor="jobType">סוג משרה:</label>
        <input 
          type="text" 
          id="jobType" 
          name="jobType" 
          placeholder="משרה מלאה / חלקית"
          value={formDataWorkExperience.jobType}
          onChange={(e) => setFormDataWorkExperience({...formDataWorkExperience, jobType: e.target.value})}
        />
        <br />
        <label htmlFor="startDate">התחלת עבודה:</label>
        <input 
          type="date" 
          id="startDate" 
          name="startDate" 
          required
          value={formDataWorkExperience.startDate}
          onChange={(e) => setFormDataWorkExperience({...formDataWorkExperience, startDate: e.target.value})}
        />
        <br />
        <label htmlFor="endDate">סיום עבודה:</label>
        <input 
          type="date" 
          id="endDate" 
          name="endDate" 
          required
          value={formDataWorkExperience.endDate}
          onChange={(e) => setFormDataWorkExperience({...formDataWorkExperience, endDate: e.target.value})}
        />
        <br /><br />
        <label htmlFor="jobDescription">תחומי אחריות מרכזיים בעבודה:</label>
        <br />
        <textarea 
          id="responsibility" 
          name="responsibility" 
          rows={4} 
          cols={50}
          value={formDataWorkExperience.responsibility}
          onChange={(e) => setFormDataWorkExperience({...formDataWorkExperience, responsibility: e.target.value})}
        ></textarea>
        <br />
        <button type="submit">{editingIndexWorkExperience !== null ? 'ערוך עבודה' : 'הוסף עבודה'}</button>
        {editingIndexWorkExperience !== null && (
          <button type="button" onClick={resetForm}>ביטול</button>
        )}
      </form>
      <div>
        {workExperienceCvData.map((workExperience, index) => (
          <div key={index}>
            <h4>שם חברה: {workExperience.jobName}</h4>
            <p>תפקידך בעבודה: {workExperience.jobTitle}</p>
            <p>סוג משרה: {workExperience.jobType}</p>
            <p>תאריך התחלה: {workExperience.startDate.toLocaleDateString()}</p>
            <p>תאריך סיום: {workExperience.endDate?.toLocaleDateString()}</p>
            <p>אחריות בעבודה: {workExperience.responsibility}</p>
            <button onClick={() => handleWorkExperienceDelete(index)}>מחק</button>
            <button onClick={() => handleWorkExperienceEdit(index)}>ערוך</button>
            <p>--------------------------</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkExperience;