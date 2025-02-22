import React from "react";
import styles from "./DesignCvWizard.module.scss";
import { useDesignCvWizard } from "./DesignCvWizardVM";

const DesignCvWizard = () => {
  const { workExperienceCvData, setWorkExperienceCvData } = useDesignCvWizard();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted!");
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const phoneNumber = formData.get("phoneNumber");
    const city = formData.get("city");

    console.log(firstName, lastName, email, phoneNumber, city);
  };

  const handleWorkExperienceChange = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Work Experience form submitted!");
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const jobName = formData.get("jobName") as string;
    const jobTitle = formData.get("jobTitle") as string;
    const jobType = formData.get("jobType") as string;
    const startDate = new Date(formData.get("startDate") as string);
    const endDate = formData.get("endDate") ? new Date(formData.get("endDate") as string) : undefined;
    
    const responsibility = formData.get("responsibility") as string;

    setWorkExperienceCvData({ jobName, jobTitle, jobType, startDate, endDate, responsibility });

    console.log(workExperienceCvData);
  };

  return (
    <div>
      <h1 className={styles.test}>Design CV Wizard</h1>
      <form onSubmit={handleSubmit}>
        <h2> Personal Information</h2>
        <label htmlFor="firstName">שם פרטי:</label>
        <input type="text" id="firstName" name="firstName" required />
        <br />
        <label htmlFor="lastName">שם משפחה:</label>
        <input type="text" id="lastName" name="lastName" required />
        <br />
        <label htmlFor="email">אימייל:</label>
        <input type="email" id="email" name="email" required />
        <br />
        <label htmlFor="phoneNumber">מספר טלפון:</label>
        <input type="tel" id="phoneNumber" name="phoneNumber" />
        <br />
        <label htmlFor="city">עיר מגורים:</label>
        <input type="text" id="city" name="city" required />
        <br />
        <button type="submit">שליחת קורות חיים</button>
      </form>

      <form onSubmit={handleWorkExperienceChange}>
        <h2>Work Experience</h2>
        <label htmlFor="companyName">שם חברה:</label>
        <input type="text" id="jobName" name="jobName" />
        <br />
        <label htmlFor="jobTitle">תפקידך בעבודה:</label>
        <input type="text" id="jobTitle" name="jobTitle" />
        <br />
        <label htmlFor="jobType">סוג משרה:</label>
        <input type="text" id="jobType" name="jobType" placeholder="משרה מלאה / חלקית" />
        <br />
        <label htmlFor="startDate">התחלת עבודה:</label>
        <input type="date" id="startDate" name="startDate" required />
        <br />
        <label htmlFor="endDate">סיום עבודה:</label>
        <input type="date" id="endDate" name="endDate" required />
        <br />
        <label htmlFor="jobDescription">תחומי אחריות מרכזיים עבודה:</label>
        <textarea id="responsibility" name="responsibility" rows={4} cols={50}></textarea>
        <br />
        <button type="submit">הוסף עבודה</button>
      </form>
    </div>
  );
};

export default DesignCvWizard;