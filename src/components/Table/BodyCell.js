import React from 'react'
import styles from './Table.module.scss'

const BodyCell = ({ children }) => (
  <div className={styles.cell}>
    {children}
  </div>
)

export default BodyCell
