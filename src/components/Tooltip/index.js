import React from 'react'
import styles from './Tooltip.module.scss'

const Tooltip = ({ children, title, content }) => (
  <span className={styles.root}>
    {children}
    <div className={styles.tooltip}>
      {title && <h6 className={styles.title}>{title}</h6>}
      {content && <p className={styles.content}>{content}</p>}
    </div>
  </span>
)

export default Tooltip
