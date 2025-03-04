import { useState } from "react";
import styles from "./CandidateLogin.module.scss";
import { X } from "lucide-react";
import { loginCandidate } from "./CandidateLoginVM";
import CandidateRegister from "../candidateRegister/CandidateRegister";

interface Props {
    closeLoginBtn: () => void;
}

function CandidateLogin({ closeLoginBtn }: Props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [isRegister, setIsRegister] = useState(false); 

    const handleLogin = async () => {
        setError(null);
        setLoading(true);

        const response = await loginCandidate({ email, password });

        if (!response.success) {
            setError(response.message);
        } else {
            alert("Login successful!");
            closeLoginBtn();
        }

        setLoading(false);
    };

    return (
        <div className={styles.CandidateLoginPage}>
            <X className={styles.closeLoginBtn} onClick={closeLoginBtn} />

            {isRegister ? (
                <CandidateRegister closeRegisterBtn={() => setIsRegister(false)} />
            ) : (
                <>
                    <h2 className={styles.loginText}>התחברות</h2>

                    <input
                        type="email"
                        placeholder="Email"
                        className={styles.inputField}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className={styles.inputField}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {error && <p className={styles.error}>{error}</p>}

                    <button className={styles.loginBtn} onClick={handleLogin} disabled={loading}>
                        {loading ? "מתחבר..." : "התחברות"}
                    </button>

                    <p className={styles.forgotPassword}>שכחת את הססמא? לחצי כאן</p>

                    <p className={styles.register} onClick={() => setIsRegister(true)}>
                        פעם ראשונה כאן? לחצי כאן ליצירת משתמש
                    </p>
                </>
            )}
        </div>
    );
}

export default CandidateLogin;
