import checkboxStyles from '../styles/checkbox.module.scss'
import classNames from 'classnames'
import React, { useState, useEffect, forwardRef } from 'react'
import PropTypes from 'prop-types'

const Checkbox = forwardRef(({ children, className, partial, onChange, disabled, checked, ...otherProps }, ref) => {
  const [isChecked, setChecked] = useState(!!checked)

  useEffect(() => {
    setChecked(checked)
  }, [checked])

  const handleChange = e => {
    if (checked === undefined) {
      setChecked(e.target.checked)
    }
    if (onChange) {
      return onChange(e)
    }
  }

  const classes = classNames(
    checkboxStyles.root,
    { [checkboxStyles.partial]: partial },
    { [checkboxStyles.checked]: isChecked },
    { [checkboxStyles.disabled]: disabled }
  )
  return (
    <label className={`${className || ''} ${classes}`}>
      <input type="checkbox" checked={isChecked} disabled={disabled} onChange={handleChange} {...otherProps} ref={ref} />
      {children && <span className={checkboxStyles.label}>{children}</span>}
    </label>
  )
})

Checkbox.propTypes = {
  /** Control whether the checkbox is checked or unchecked */
  checked: PropTypes.bool,
  /** Show a partial checked effect */
  partial: PropTypes.bool
}

export default Checkbox
