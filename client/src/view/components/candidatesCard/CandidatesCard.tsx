import React from "react"
import styles from "./CandidatesCard.module.scss"

interface CandidateCardProps{
    email: string
    phone: string
}

const CandidateCard: React.FC<CandidateCardProps> = ({
    email,
    phone
}) =>{
    return(
        <div className={styles.card}>
            <h2>Candidate Details</h2>
            <div className={styles.details}>
            <p>Email: {email}</p>
            <p>Phone: {phone}</p>
            </div>
        </div>
    )
}

export default CandidateCard;