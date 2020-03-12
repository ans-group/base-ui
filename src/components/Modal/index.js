import styles from './Modal.module.scss'
import { Transition } from 'react-transition-group'
import { FiX } from 'react-icons/fi'
import React from 'react'
import propTypes from 'prop-types'

const duration = 190

const defaultStyle = {
  transition: `transform ${duration}ms ease-in, opacity ${duration}ms`,
  transform: 'scale(0.9)',
  opacity: 0
}

const transitionStyles = {
  entering: { transform: 'scale(0.9)', opacity: 0 },
  entered: { transform: 'scale(1)', opacity: 1 },
  exiting: { transform: 'scale(1.2)', opacity: 0 },
  exited: { transform: 'scale(1.2)', opacity: 0 }
}

const overlayTransitionStyles = {
  entering: { opacity: 0 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 }
}

const Modal = ({ visible, onHide, children, actions, hideCloseButton, ...otherProps }) => {
  return (
    <Transition in={visible} timeout={duration} mountOnEnter unmountOnExit>
      {state => (
        <div className={styles.overlay} onClick={onHide} style={overlayTransitionStyles[state]}>
          <div className={styles.root} style={{ ...defaultStyle, ...transitionStyles[state] }} onClick={function(e) { e.stopPropagation() }} {...otherProps}>
            {!hideCloseButton && <FiX className={styles.close} onClick={onHide} />}
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

Modal.propTypes = {
  /** Whether the modal is visible or not */
  visible: propTypes.bool,
  /** Handle the hide event */
  onHide: propTypes.func.isRequired,
  /** Any content to show at the bottom of the modal */
  actions: propTypes.oneOfType([propTypes.node, propTypes.array])
}

export default Modal
