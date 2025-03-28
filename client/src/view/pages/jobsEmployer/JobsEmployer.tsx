import React, { useState } from "react";
import styles from './JobsEmployer.module.scss';
import JobsEmployerVM, {
  Job,
  Location,
  LocationType,
  Term,
} from "./JobsEmployerVM";

const JobsEmployer: React.FC = () => {
  const [jobToEdit, setJobToEdit] = useState<Job | null>(null);

  const {
    jobs,
    formData,
    handleInputChange,
    handleSubmit,
    deleteJob,
  } = JobsEmployerVM({
    jobToEdit,
    onEditStart: setJobToEdit,
  });

  return (
    <div className={styles.jobsEmployer}>
      <h2 className={styles.jobsEmployer__title}>{jobToEdit ? "עריכת משרה" : "משרה חדשה"}</h2>

      <form onSubmit={handleSubmit} className={styles.jobsEmployer__form}>
        <div className={styles.jobsEmployer__section}>
          <h4>שכר</h4>
          <div className={styles.jobsEmployer__group}>
            <div className={styles.jobsEmployer__field}>
              <label className={styles.jobsEmployer__label}>סוג שכר</label>
              <select name="salaryType">
                <option value="">בחר סוג שכר...</option>
                <option value="">שעתי</option>
                <option value="">יומי</option>
                <option value="">גלובלי</option>

              </select>
            </div>
            <div className={styles.jobsEmployer__field}>
              <label className={styles.jobsEmployer__label}>שכר מינימלי</label>
              <input type="number" name="minSalary" placeholder="שכר מינימלי..." />
            </div>
            <div className={styles.jobsEmployer__field}>
              <label className={styles.jobsEmployer__label}>שכר מקסימלי</label>
              <input type="number" name="maxSalary" placeholder="שכר מקסימלי..." />
            </div>
            <div className={styles.jobsEmployer__field}>
              <label className={styles.jobsEmployer__label}>שכר בפועל</label>
              <input type="number" name="salary" value={formData.salary} onChange={handleInputChange} placeholder="שכר בפועל" />
            </div>
          </div>
        </div>

        <div className={styles.jobsEmployer__section}>
          <h4>מידע מתקדם</h4>
          <div className={styles.jobsEmployer__group}>
            <div className={styles.jobsEmployer__field}>
              <label className={styles.jobsEmployer__label}>סוג עבודה</label>
              <select name="employmentType" value={formData.employmentType} onChange={handleInputChange}>
              <option value="">בחר סוג עבודה...</option>
              <option value="fullTime">משרה מלאה</option>
              <option value="partTime">משרה חלקית</option>
              <option value="freelance">פרילנס / עצמאי</option>
              <option value="temporary">עבודה זמנית</option>
              <option value="student">עבודה לסטודנטים</option>
              </select>
            </div>
            <div className={styles.jobsEmployer__field}>
              <label className={styles.jobsEmployer__label}>סוג משרה</label>
              <input type="text" name="type" value={formData.type} onChange={handleInputChange} placeholder="סוג משרה" />
            </div>
            <div className={styles.jobsEmployer__field}>
              <label className={styles.jobsEmployer__label}>תאריך התחלה</label>
              <input type="date" name="startDate" onChange={handleInputChange} placeholder="DD/MM/YYYY" />
            </div>
            <div className={styles.jobsEmployer__field}>
              <label className={styles.jobsEmployer__label}>ניסיון</label>
              <select name="other">
              <option value="">בחר ניסיון...</option>
                <option value="">ללא ניסיון</option>
                <option value="">ניסיון חובה</option>
              </select>
            </div>
            <div className={styles.jobsEmployer__field}>
              <label className={styles.jobsEmployer__label}>השכלה</label>
              <select name="education1">
                <option value="">בחר השכלה...</option>
                <option value=""> ללא השכלה</option>
                <option value=""> תיכונית</option>
                <option value=""> קורס רלוונטי</option>
                <option value=""> הנדסאי</option>
                <option value=""> תואר רלוונטי</option>

              </select>
            </div>
            <div className={styles.jobsEmployer__field}>
              <label className={styles.jobsEmployer__label}>תת-השכלה</label>
              <select name="education2">
              <option value="">בחר מקצוע...</option>

              <optgroup label="רפואה ובריאות">
              <option value="doctor">רופא/ה</option>
              <option value="nurse">אח/ות</option>
              <option value="pharmacist">רוקח/ת</option>
              <option value="radiologyTech">טכנאי/ת רנטגן</option>
              <option value="physiotherapist">פיזיותרפיסט/ית</option>
              <option value="dietitian">תזונאי/ת</option>
              <option value="psychologist">פסיכולוג/ית</option>
              <option value="caregiver">מטפל/ת סיעודי/ת</option>
            </optgroup>

            <optgroup label="הייטק וטכנולוגיה">
              <option value="developer">מתכנת/ת</option>
              <option value="frontend">מפתח/ת פרונטאנד</option>
              <option value="backend">מפתח/ת בקאנד</option>
              <option value="fullstack">מפתח/ת פולסטאק</option>
              <option value="qa">בודק/ת תוכנה</option>
              <option value="dataAnalyst">אנליסט/ית נתונים</option>
              <option value="dataScientist">מדען/ית נתונים</option>
              <option value="itSupport">תמיכה טכנית / IT</option>
              <option value="devops">DevOps</option>
              <option value="cyber">אבטחת מידע / סייבר</option>
              <option value="productManager">מנהל/ת מוצר</option>
              <option value="uiux">מעצב/ת UX/UI</option>
            </optgroup>

            <optgroup label="חינוך והוראה">
              <option value="teacher">מורה</option>
              <option value="kindergarten">גננ/ת</option>
              <option value="educationCounselor">יועצ/ת חינוכי/ת</option>
              <option value="specialEducation">מורה לחינוך מיוחד</option>
            </optgroup>

            <optgroup label="עיצוב ואומנות">
              <option value="graphicDesigner">מעצב/ת גרפי/ת</option>
              <option value="interiorDesigner">מעצב/ת פנים</option>
              <option value="fashionDesigner">מעצב/ת אופנה</option>
              <option value="illustrator">מאייר/ת</option>
              <option value="animator">אנימטור/ית</option>
            </optgroup>

            <optgroup label="בנייה ותעשייה">
              <option value="electrician">חשמלאי/ת</option>
              <option value="plumber">אינסטלטור/ית</option>
              <option value="welder">רתכ/ית</option>
              <option value="machineOperator">מפעיל/ת מכונה</option>
              <option value="civilEngineer">מהנדס/ת אזרחי/ת</option>
              <option value="constructionWorker">פועל/ת בניין</option>
              <option value="architect">אדריכל/ית</option>
            </optgroup>

            <optgroup label="מכירות ושירות">
              <option value="salesperson">נציג/ת מכירות</option>
              <option value="customerService">שירות לקוחות</option>
              <option value="storeManager">מנהל/ת חנות</option>
              <option value="cashier">קופאי/ת</option>
              <option value="callCenter">מוקדן/ית</option>
            </optgroup>

            <optgroup label="משפטים וכספים">
              <option value="lawyer">עורכ/ת דין</option>
              <option value="legalAssistant">עוזר/ת משפטי/ת</option>
              <option value="accountant">רו"ח / מנהל/ת חשבונות</option>
              <option value="payroll">חשב/ת שכר</option>
              <option value="economist">כלכלן/ית</option>
            </optgroup>

            <optgroup label="תחבורה ולוגיסטיקה">
              <option value="driver">נהג/ת</option>
              <option value="forklift">מפעיל/ת מלגזה</option>
              <option value="logistics">עובד/ת לוגיסטיקה</option>
              <option value="warehouse">מחסנאי/ת</option>
              <option value="dispatcher">מתזמן/ת משלוחים</option>
            </optgroup>

            <optgroup label="אבטחה ושמירה">
              <option value="securityGuard">מאבטח/ת</option>
              <option value="police">שוטר/ת</option>
              <option value="firefighter">כבאי/ת</option>
            </optgroup>              </select>
            </div>
          </div>
        </div>

        <div className={styles.jobsEmployer__section}>
          <h4>פרטים כלליים</h4>
          <div className={styles.jobsEmployer__group}>
            <div className={styles.jobsEmployer__field}>
              <label className={styles.jobsEmployer__label}>שם משרה</label>
              <input type="text" name="jobName" value={formData.jobName} onChange={handleInputChange} placeholder="שם המשרה" />
            </div>
            <div className={styles.jobsEmployer__field}>
              <label className={styles.jobsEmployer__label}>פרטים</label>
              <input type="text" name="details" value={formData.details} onChange={handleInputChange} placeholder="פרטים" />
            </div>
            <div className={styles.jobsEmployer__field}>
              <label className={styles.jobsEmployer__label}>כתובת</label>
              <input type="text" name="address" value={formData.address} onChange={handleInputChange} placeholder="כתובת" />
            </div>
            <div className={styles.jobsEmployer__field}>
              <label className={styles.jobsEmployer__label}>אזור</label>
              <select name="location" value={formData.location} onChange={handleInputChange}>
                {Object.values(Location).map((location) => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
            <div className={styles.jobsEmployer__field}>
              <label className={styles.jobsEmployer__label}>סוג מיקום</label>
              <select name="locationType" value={formData.locationType} onChange={handleInputChange}>
                {Object.values(LocationType).map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
            <div className={styles.jobsEmployer__field}>
              <label className={styles.jobsEmployer__label}>חברה</label>
              <input type="text" name="company" value={formData.company} onChange={handleInputChange} placeholder="חברה" />
            </div>
            <div className={styles.jobsEmployer__field}>
              <label className={styles.jobsEmployer__label}>תחום</label>
              <input type="text" name="Industry" value={formData.Industry} onChange={handleInputChange} placeholder="תחום" />
            </div>
            <div className={styles.jobsEmployer__field}>
              <label className={styles.jobsEmployer__label}>אורך משרה</label>
              <select name="term" value={formData.term} onChange={handleInputChange}>
                {Object.values(Term).map((term) => (
                  <option key={term} value={term}>{term}</option>
                ))}
              </select>
            </div>
            <div className={styles.jobsEmployer__field}>
              <label className={styles.jobsEmployer__label}>הטבות</label>
              <input type="text" name="benefits" value={formData.benefits} onChange={handleInputChange} placeholder="הטבות" />
            </div>
            <div className={styles.jobsEmployer__field}>
              <label className={styles.jobsEmployer__label}>קישור לאתר</label>
              <input type="text" name="websiteURL" value={formData.websiteURL} onChange={handleInputChange} placeholder="קישור לאתר" />
            </div>
            <div className={styles.jobsEmployer__field}>
              <label className={styles.jobsEmployer__label}>דיור</label>
              <select name="housingIncluded">
                <option value="true">כן</option>
                <option value="false">לא</option>
              </select>
            </div>
          </div>
        </div>

        <div className={styles.jobsEmployer__section}>
          <h4>תיאור המשרה</h4>
          <textarea placeholder="הזן תיאור, תפקידים, דרישות וכו'" />
        </div>

        <button type="submit" className="btn btn--big">
          {jobToEdit ? "שמור שינויים" : "צור משרה"}
        </button>
      </form>

      <div className={styles.jobsEmployer__section}>
        <h3>כל המשרות</h3>
        {Array.isArray(jobs) ? (
          jobs.map((job) => (
            <div key={job._id ?? crypto.randomUUID()} className="chip">
              <span className="chip--text">{job.jobName}</span>
              <button className="btn btn--small" onClick={() => deleteJob(job._id ?? "")}>מחק</button>
              <button className="btn btn--small" onClick={() => setJobToEdit(job)}>ערוך</button>
            </div>
          ))
        ) : (
          <p>אין משרות להצגה</p>
        )}
      </div>
    </div>
  );
};

export default JobsEmployer;