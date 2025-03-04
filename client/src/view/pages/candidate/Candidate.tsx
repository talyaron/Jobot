import React from 'react'
import styles from "./candidate.module.scss"
import { Outlet } from 'react-router'

const Candidate = () => {
  return (
    <div>
      <h1 className={styles.main}>Initialize Candidate</h1>
      <Outlet />
    </div>
  )
}

export default Candidate
