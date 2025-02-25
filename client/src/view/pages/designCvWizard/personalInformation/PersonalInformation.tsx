import React from "react";
import styles from "./personalInformation.module.scss"
import { usePersonalInformationVM } from "./personalInformationVM";

const PersonalInformation = () => {
  const { personalInformation, updatePersonalInfo } = usePersonalInformationVM();
console.log(styles)
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    updatePersonalInfo(name as keyof typeof personalInformation, value);
  };

  return (
    <div className={styles.container}>
      <form>
        <h2>מידע אישי</h2>
        <label htmlFor="firstName">שם פרטי:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={personalInformation.firstName}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="lastName">שם משפחה:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={personalInformation.lastName}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="email">אימייל:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={personalInformation.email}
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="phoneNumber">מספר טלפון:</label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={personalInformation.phoneNumber}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="city">עיר מגורים:</label>
        <input
          type="text"
          id="city"
          name="city"
          value={personalInformation.city}
          onChange={handleChange}
          required
        />
      </form>
    </div>
  );
};

export default PersonalInformation;
