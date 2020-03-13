import React, { useState, forwardRef, useEffect } from 'react'
import { v1 as uuid } from 'uuid'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import styles from './Checkbox.module.scss'

const Checkbox = forwardRef(({ children, className, partial, onChange, disabled, large, checked, ...otherProps }, ref) => {
  const [isChecked, setChecked] = useState(checked !== undefined ? checked : otherProps.defaultChecked)
  const handleChange = e => {
    setChecked(!!e.target.checked)
    if (onChange) {
      e.target.value = !!e.target.checked
      return onChange(e)
    }
  }

  useEffect(() => {
    if (checked !== undefined){
      setChecked(checked)
    }
  }, [checked])

  const classes = classNames(
    styles.root,
    { [styles.partial]: partial },
    { [styles.checked]: isChecked },
    { [styles.disabled]: disabled },
    { [styles.large]: large }
  )

  const id = otherProps.id || otherProps.key || uuid()
  return (
    <div className={`${className || ''} ${classes}`}>
      {checked !== undefined
        ? <input type="checkbox" checked={checked} disabled={disabled} onChange={handleChange} {...otherProps} ref={ref} id={id} />
        : <input type="checkbox" disabled={disabled} onChange={handleChange} {...otherProps} ref={ref} id={id} />
      }
      <label className={styles.label} htmlFor={id}>{children}</label>
    </div>
  )
})

Checkbox.propTypes = {
  /** Control whether the checkbox is checked or unchecked */
  checked: PropTypes.bool,
  /** Show a partial checked effect */
  partial: PropTypes.bool
}

Checkbox.displayName = "Checkbox"

export default Checkbox
