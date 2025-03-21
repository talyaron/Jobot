import { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./CandidateLogin.module.scss";
import { X } from "lucide-react";
import { loginCandidate } from "./CandidateLoginVM";
import CandidateRegister from "../candidateRegister/CandidateRegister";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/user/userSlice";



function CandidateLogin() {
    const navigate = useNavigate(); 
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [isRegister, setIsRegister] = useState(false); 

    const handleLogin = async () => {
        setError(null);
        setLoading(true);

        const {success,message, user} = await loginCandidate({ email, password });

        if (!success) {
            setError(message);
        } else {
            dispatch(setUser(user));
            navigate("/candidate/my-jobs");
        }

        setLoading(false);
    };

    return (
        <div className={styles.CandidateLoginPage}>
            
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
