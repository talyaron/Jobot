import styles from "./personalInformation.module.scss"
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../../redux/store'
import { updatePersonalInformation } from '../../../../redux/cv/cvSlice'

const PersonalInformation = () => {
  const dispatch = useDispatch()
  const personalInformation = useSelector((state: RootState) => state.cvForm.personalInformation)
  console.log(personalInformation)
  
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    dispatch(updatePersonalInformation({ ...personalInformation, [name]: value }));
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
  )
}

export default PersonalInformation
