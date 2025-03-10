import { EmployerLoginVM } from './EmployerLoginVM'
import styles from "./employerLogin.module.scss"

const EmployerLogin = () => {
    const {handleChange, handleSubmit, isLogin, formData, setIsLogin} = EmployerLoginVM();
  return (
    <div className={styles.pageWrapper}>
      <h1>Employer Login</h1>
      <div className={styles.authContainer}>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit} className={styles.authForm}>
        {!isLogin && (
          <>
            <input
              type="text"
              name="userName"
              placeholder="Username"
              value={formData.userName}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </>
        )}
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        {!isLogin && (
          <input
            type="password"
            name="rePassword"
            placeholder="Confirm Password"
            value={formData.rePassword}
            onChange={handleChange}
            required
          />
        )}
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)} className={styles.toggleText}>
        {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
      </button>
    </div>
    </div>
  )
}

export default EmployerLogin
