import { User } from "../../../model/userModel"
import styles from "./UserDetails.module.scss"

const UserDetails = ({ user }: { user: User })=> {
  return (
    <div className={styles["user-details"]}>
      <h1> {user.fullName} </h1>
      <p> {user.aiData} :אודות </p>
      {/* <p> {user.workExperience} :נסיון </p> */}
      <p> {user.email} :מייל </p>
      <p> {user.phoneNumber} :טלפון </p>
    </div>
  )
}

export default UserDetails
