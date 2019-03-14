import buttonStyles from '../styles/button.module.scss'
import classNames from 'classnames'
import { ReactComponent as Loading } from '../assets/loadingRipple.svg'
import * as icons from 'react-icons/fi'
import React from 'react'
import PropTypes from 'prop-types'

const allowedIcons = Object.keys(icons).map(icon => icon.substr(2))

const Button = ({ children, className, icon, size, outline, loading, ...otherProps }) => {
  const classes = classNames(
    buttonStyles.root,
    { [buttonStyles.loading]: !!loading },
    { [buttonStyles.iconOnly]: !children },
    { [buttonStyles.small]: size === 'small' },
    { [buttonStyles.large]: size === 'large' },
    { [buttonStyles.xlarge]: size === 'xlarge' },
    { [buttonStyles.outline]: !!outline }
  )
  const Icon = icon && icons[`Fi${icon}`]
  return (
    <button type="button" {...otherProps} className={`${className || ''} ${classes}`}>
      {loading && (
        <div className={buttonStyles.loadingOverlay}>
          <Loading />
        </div>
      )
      }
      {Icon && <Icon />}
      {children}
    </button>
  )
}

Button.propTypes = {
  /** Whether to show an icon - see https://goo.gl/3wa4RG (ignore Fi prefix) */
  icon: PropTypes.oneOf(allowedIcons),
  /** The size of the button */
  size: PropTypes.oneOf(['small', 'default', 'large', 'xlarge']),
  /** Whether to use the outline style */
  outline: PropTypes.bool,
  /** Whether to mask the button with a loading indicator */
  loading: PropTypes.bool
}

export default Button
