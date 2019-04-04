import React from 'react'
import labelStyles from '../styles/label.module.scss'

const Label = ({ children, className, ...otherProps }) => (
  <label className={[labelStyles.root, className].join(' ')} {...otherProps}>
    {children}
  </label>
)

export default Label
