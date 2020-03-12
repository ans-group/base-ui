import styles from './Drawer.module.scss'
import { Transition } from 'react-transition-group'
import { FiX } from 'react-icons/fi'
import React from 'react'
import propTypes from 'prop-types'

const duration = 250

const defaultStyle = {
  transition: `transform ${duration}ms ease-in-out`,
  transform: 'translateX(100%)'
}

const transitionStyles = {
  entering: { transform: 'translateX(100%)' },
  entered: { transform: 'translateX(0)' },
  exiting: { transform: 'translateX(100%)' },
  exited: { transform: 'translateX(100%)' }
}

const Drawer = ({ visible, onHide, closeIcon, children, actions, ...otherProps }) => {
  return (
    <Transition in={visible} timeout={duration} mountOnEnter unmountOnExit>
      {state => (
        <div className={styles.overlay} onClick={onHide}>
          <div className={styles.root} style={{ ...defaultStyle, ...transitionStyles[state] }} onClick={function(e) { e.stopPropagation() }} {...otherProps}>
            {closeIcon && <FiX className={styles.close} onClick={onHide} />}
            <div className={styles.inner}>
              {children}
            </div>
            {actions && <div className={styles.actions}>
              {actions}
            </div>}
          </div>
        </div>
      )}
    </Transition>
  )
}

Drawer.propTypes = {
  /** Whether the modal is visible or not */
  visible: propTypes.bool,
  /** Handle the hide event */
  onHide: propTypes.func.isRequired,
  /** Whether to show an X in the corner */
  closeIcon: propTypes.bool,
  /** Any content to show at the bottom of the modal */
  actions: propTypes.oneOfType([propTypes.node, propTypes.array])
}

export default Drawer
