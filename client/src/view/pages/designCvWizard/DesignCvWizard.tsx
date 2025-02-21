import React from 'react'
import styles from "./DesignCvWizard.module.scss"

const DesignCvWizard = () => {

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault(); // מונע רענון של הדף
        console.log("Form submitted!");
      };

  return (
    <div>
      <h1 className={styles.test}>Design CV Wizard</h1>
      <form onSubmit={handleSubmit}>
    <label htmlFor="title">Title:</label>
    <input type="text" id="title" name="title" required />
    <br />
    <label htmlFor="name">Name:</label>
    <input type="text" id="name" name="name" required />
    <br />
    <label htmlFor="email">Email:</label>
    <input type="email" id="email" name="email" required />
    <br />
    <button type="submit">Submit</button>
  </form>
    </div>
  )
}

export default DesignCvWizard
