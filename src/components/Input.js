import inputStyles from '../styles/input.module.scss'
import classNames from 'classnames'
import * as icons from 'react-icons/fi'
import React from 'react'
import PropTypes from 'prop-types'

const allowedIcons = Object.keys(icons).map(icon => icon.substr(2))

const Input = ({ className, icon, type, tabBefore, tabAfter, loading, ...otherProps }) => {
  const Icon = icon && icons[`Fi${icon}`]
  const classes = classNames(
    inputStyles.root,
    { [inputStyles.loading]: loading },
    { [inputStyles.inputWithIcon]: !!icon }
  )
  return (
    <div className={`${className || ''} ${classes}`}>
      {Icon && <Icon />}
      {tabBefore && (
        <div className={inputStyles.tabBefore}>{tabBefore}</div>
      )}
      {tabAfter && (
        <div className={inputStyles.tabAfter}>{tabAfter}</div>
      )}
      <input {...otherProps} type={type} />
      {loading && <div className={inputStyles.loadingIcon} /> }
    </div>
  )
}

Input.defaultProps = {
  type: 'text'
}

Input.propTypes = {
  /** The input type (must be text-based, not submit, checkbox etc) */
  type: PropTypes.oneOf(['text', 'tel', 'email', 'password', 'color', 'number', 'search', 'url', 'time']),
  /** Whether to show an icon - see https://goo.gl/3wa4RG (ignore Fi prefix) */
  icon: PropTypes.oneOf(allowedIcons),
  /** Content to be displayed before the input */
  tabBefore: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  /** Content to be displayed after the input */
  tabAfter: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
  /** Whether to show a loading spinner */
  loading: PropTypes.bool
}

export default Input
