import React, { useState } from "react";
import styles from "./personalInformation.module.scss"

const PersonalInformation = () => {

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

  return (
    <div className={styles.continer}>
      <form onSubmit={handleSubmit}>
        <h2>מידע אישי</h2>
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
        <br /><br />
  
      </form>
      </div>
  );
};

export default PersonalInformation;