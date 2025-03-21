import { EmployerLoginVM } from "./EmployerLoginVM";
import styles from "./employerLogin.module.scss";

const EmployerLogin = () => {
  const { handleChange, handleSubmit, isLogin, formData, setIsLogin } =
    EmployerLoginVM();
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.authContainer}>
      <h1>התחברות מעסיקים</h1>
        <h2>{isLogin ? "התחברות" : "הרשמה"}</h2>
        <form onSubmit={handleSubmit} className={styles.authForm}>
          {!isLogin && (
            <>
              <p>שם מלא</p>
              <input
                type="text"
                name="userName"
                placeholder="...הקלד שם מלא"
                value={formData.userName}
                onChange={handleChange}
                required
              />
              <p>טלפון</p>

              <input
                type="tel"
                name="phoneNumber"
                placeholder="...הקלד טלפון"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
            </>
          )}
          <p>אימייל</p>

          <input
            type="email"
            name="email"
            placeholder="...הקלד אימייל"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <p>סיסמה</p>

          <input
            type="password"
            name="password"
            placeholder="...הקלד סיסמה"
            value={formData.password}
            onChange={handleChange}
            required
          />

          {!isLogin && (
            <>
                      <p>סיסמה בשנית</p>
            <input
              type="password"
              name="rePassword"
              placeholder="...הקלד סיסמה בשנית"
              value={formData.rePassword}
              onChange={handleChange}
              required
            />
          </>)}
          <button type="submit">{isLogin ? "התחברות" : "הרשמה"}</button>
        </form>
        <button
          onClick={() => setIsLogin(!isLogin)}
          className={styles.toggleText}
        >
          {isLogin
             ? "אין לך חשבון? הירשם"
             : "כבר יש לך חשבון? התחבר"}
        </button>
      </div>
    </div>
  );
};

export default EmployerLogin;
