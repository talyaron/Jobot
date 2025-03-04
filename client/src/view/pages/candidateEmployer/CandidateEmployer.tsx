import styles from "./CandidateEmployer.module.scss"
import { User } from "../../../model/userModel";
import UserDetails from "../../components/UserDetails/UserDetails"
import useCandidateEmployer from "./CandidateEmployerVM"

const CandidateEmployer = ({ user, message }: { user: User, message: String }) => {
    const { onApprove, onReject } = useCandidateEmployer();
    return (
        <div className={styles["candidate-employer"]}>
            <UserDetails user={user} />
            <h2>{message}</h2>
            {/* <Link to={route to chat}>
                <button className="btn" type="button"> Chat </button>
            </Link> */}
            <div className={styles.btns}>
                <button className="btn" type="button" onClick={onApprove}>Approve</button>
                <button className="btn" type="button" onClick={onReject}>Reject</button>
            </div>  
        </div>
    )
}

export default CandidateEmployer
