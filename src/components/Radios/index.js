import styles from './Radios.module.scss'
import findIndex from 'lodash/findIndex'
import classNames from 'classnames'
import React, { useState, useEffect, forwardRef } from 'react'
import PropTypes from 'prop-types'

const normalizeOptions = values => values[0] && typeof values[0] === 'string' ? values.map(value => ({ text: value, value })) : values

const Radios = forwardRef(({ className, type, disabled, options, value, onChange, ...otherProps }, ref) => {
  const nOptions = normalizeOptions(options)
  const [selected, selectItem] = useState(value ? findIndex(nOptions, { value }) : -1)

  const handleSelect = selectedValue => () => {
    if (disabled) return
    selectItem(findIndex(nOptions, selectedValue))
  }

  useEffect(() => {
    if (onChange) {
      onChange(selected > -1 ? options[selected] : null)
    }
  }, [selected, onChange, options])

  const classes = classNames(
    { [styles.radioStyle]: type === 'radio' },
    { [styles.buttonStyle]: type === 'button' },
    { [styles.disabled]: disabled }
  )

  const renderOption = option => {
    const isSelected = nOptions[selected] && nOptions[selected].value === option.value

    return (
      <label key={option.value} className={isSelected ? styles.selected : ''}>
        {option.text}
        <input style={{ display: 'none' }} type="radio" onChange={handleSelect(option)} checked={isSelected} value={option.value} ref={ref} {...otherProps} />
      </label>
    )
  }

  return (
    <div className={`${className || ''} ${classes}`}>
      {nOptions && nOptions.map(renderOption)}
    </div>
  )
})

Radios.defaultProps = {
  type: 'button'
}

Radios.propTypes = {
  /** Array of strings or objects {text, value} representing the options */
  options: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.string),
    PropTypes.arrayOf(PropTypes.object)
  ]).isRequired,
  /** The type: either traditional radio buttons or modern buttons */
  type: PropTypes.oneOf(['radio', 'button']),
  /** Control the value - should match an option */
  value: PropTypes.string
}

Radios.displayName = "Radios"

export default Radios
