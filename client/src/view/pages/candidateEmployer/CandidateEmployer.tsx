import styles from "./CandidateEmployer.module.scss"
import { User } from "../../../model/userModel";
import UserDetails from "../../components/UserDetails/UserDetails"
import useCandidateEmployer from "./CandidateEmployerVM"

const CandidateEmployer = ({ user }: { user: User }) => {
    const { onApprove, onReject } = useCandidateEmployer();

    return (
        <div className={styles["candidate-employer"]}>
            <UserDetails user={user} />
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
