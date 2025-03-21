import { useState } from "react";
import styles from "./CandidateRegister.module.scss";
import { X } from "lucide-react";
import { RegisterCandidate } from "./CandidateRegisterVM";

interface Props {
    closeRegisterBtn: () => void;
}

function CandidateRegister({ closeRegisterBtn }: Props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        setError(null);
        setLoading(true);

        const response = await RegisterCandidate({ fullName, email, password, rePassword,phoneNumber });

        if (!response.success) {
            setError(response.message);
        } else {
            alert("Registration successful!");
            closeRegisterBtn(); 
        }

        setLoading(false);
    };

    return (
        <div className={styles.CandidateLoginPage}>
            <div className={styles.CandidateTitle}>
            <X className={styles.closeLoginBtn} onClick={closeRegisterBtn} />
            <h2 className={styles.RegisterText}>יצירת משתמש</h2>
            </div>
            <input
                type="text"
                placeholder="שם מלא"
                className={styles.inputField}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
            />

            <input
                type="tel"
                placeholder="מס' טלפון"
                className={styles.inputField}
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
            />

            <input
                type="email"
                placeholder="אימייל"
                className={styles.inputField}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                type="password"
                placeholder="סיסמה"
                className={styles.inputField}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
   <input
                type="password"
                placeholder="סיסמה פעם נוספת"
                className={styles.inputField}
                value={rePassword}
                onChange={(e) => setRePassword(e.target.value)}
            />
            {error && <p className={styles.error}>{error}</p>}

            <button className={styles.loginBtn} onClick={handleSubmit} disabled={loading}>
                {loading ? "טוען..." : "הרשמה"}
            </button>

            <p className={styles.register} onClick={closeRegisterBtn}>
                כבר יש לך חשבון? התחברי כאן
            </p>
        </div>
    );
}

export default CandidateRegister;
