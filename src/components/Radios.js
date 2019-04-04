import radioStyles from '../styles/radio.module.scss'
import _ from 'lodash'
import classNames from 'classnames'
import React, { useState, useEffect, forwardRef } from 'react'
import PropTypes from 'prop-types'

const Radios = forwardRef(({ className, type, disabled, options, value, onChange, ...otherProps }, ref) => {
  const [selected, selectItem] = useState(value ? { value } : (typeof options[0] === 'string' ? { value: options[0] } : options[0]))
  const handleSelect = selectedValue => () => {
    if (value || disabled) return
    selectItem(selectedValue)
    if (onChange) {
      onChange(selectedValue.value)
    }
  }

  useEffect(() => {
    if (value) {
      selectItem({ value })
    }
  }, [value])

  const classes = classNames(
    { [radioStyles.radioStyle]: type === 'radio' },
    { [radioStyles.buttonStyle]: type === 'button' },
    { [radioStyles.disabled]: disabled }
  )

  const renderOption = option => {
    option = typeof option === 'string' ? { text: option, value: option } : option
    const isSelected = selected && selected.value === option.value

    return (
      <label key={option.value} onClick={handleSelect(option)} className={isSelected ? radioStyles.selected : ''}>
        {option.text}
        <input style={{ display: 'none' }} type="radio" checked={isSelected} value={option.value} ref={ref} {...otherProps} />
      </label>
    )
  }

  return (
    <div className={`${className || ''} ${classes}`}>
      {options && options.map(renderOption)}
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

export default Radios
