import checkboxStyles from '../styles/checkbox.module.scss'
import classNames from 'classnames'
import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

const Checkbox = ({ children, className, onChange, disabled, checked, ...otherProps }) => {
  const [isChecked, setChecked] = useState(!!checked)

  useEffect(() => {
    setChecked(checked)
  }, [checked])

  const handleChange = e => {
    setChecked(e.target.checked)
    if (onChange) {
      return onChange(e)
    }
  }

  const classes = classNames(
    checkboxStyles.root,
    { [checkboxStyles.checked]: isChecked },
    { [checkboxStyles.disabled]: disabled }
  )

  return (
    <label className={`${className || ''} ${classes}`}>
      <input type="checkbox" checked={isChecked} disabled={disabled} onChange={handleChange} {...otherProps} />
      <span className={checkboxStyles.label}>{children}</span>
    </label>
  )
}

Checkbox.propTypes = {
  /** Control whether the checkbox is checked or unchecked */
  checked: PropTypes.bool
}

export default Checkbox
