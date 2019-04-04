import modalStyles from '../styles/modal.module.scss'
import classNames from 'classnames'
import { FiX } from 'react-icons/fi'
import React from 'react'
import propTypes from 'prop-types'

const Modal = ({ visible, onHide, closeIcon, children, actions, ...otherProps }) => {
  const className = classNames(
    modalStyles.overlay,
    { [modalStyles.visible]: visible }
  )
  return (visible &&
    <div className={className} onClick={onHide}>
      <div className={modalStyles.root} onClick={function(e) { e.stopPropagation() }} {...otherProps}>
        {closeIcon && <FiX className={modalStyles.close} onClick={onHide} />}
        <div className={modalStyles.inner}>
          {children}
        </div>
        {actions && <div className={modalStyles.actions}>
          {actions}
        </div>}
      </div>
    </div>
  )
}

Modal.propTypes = {
  /** Whether the modal is visible or not */
  visible: propTypes.bool,
  /** Handle the hide event */
  onHide: propTypes.func.isRequired,
  /** Whether to show an X in the corner */
  closeIcon: propTypes.bool,
  /** Any content to show at the bottom of the modal */
  actions: propTypes.oneOfType([propTypes.node, propTypes.array])
}

export default Modal
