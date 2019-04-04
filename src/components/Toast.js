import React, { useEffect } from 'react'
import classNames from 'classnames'
import propTypes from 'prop-types'
import toastStyles from '../styles/toast.module.scss'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const messageSchema = propTypes.shape({
  status: propTypes.oneOf(['success', 'warning', 'error']),
  title: propTypes.string.isRequired,
  text: propTypes.string
})

const Toast = ({ message }) => {
  const { status, title, text } = message
  const classes = classNames(
    toastStyles.toastRoot,
    { [toastStyles.success]: status === 'success' },
    { [toastStyles.warning]: status === 'warning' },
    { [toastStyles.error]: status === 'error' }
  )
  return (
    <div className={classes}>
      <h6 className={toastStyles.title}>{title}</h6>
      {text && <p className={toastStyles.text}>
        {text}
      </p>}
    </div>
  )
}

Toast.propTypes = {
  message: messageSchema
}

const ToastContainer = ({ position, messages, remove, duration }) => {
  const queue = []

  const removeItem = id => () => {
    remove(id)
    const index = queue.indexOf(id)
    if (index > -1) {
      queue.splice(index, 1)
    }
  }

  const addToQueue = ({ id }) => {
    if (remove && !queue[id]) {
      queue.push(id)
      setTimeout(removeItem(id), duration)
    }
  }

  useEffect(() => {
    messages.forEach(addToQueue)
  }, [messages])

  const classes = classNames(
    toastStyles.root,
    { [toastStyles.topLeft]: position === 'topLeft' },
    { [toastStyles.topRight]: position === 'topRight' },
    { [toastStyles.topCenter]: position === 'topCenter' },
    { [toastStyles.bottomLeft]: position === 'bottomLeft' },
    { [toastStyles.bottomRight]: position === 'bottomRight' },
    { [toastStyles.bottomCenter]: position === 'bottomCenter' }
  )
  return (
    <div className={classes}>
      <ReactCSSTransitionGroup transitionName={toastStyles} transitionEnterTimeout={300} transitionLeaveTimeout={300}>
        {messages.map((message, i) => <Toast key={i} message={message} />)}
      </ReactCSSTransitionGroup>
    </div>
  )
}

ToastContainer.defaultProps = {
  position: 'topCenter',
  duration: 4000,
  messages: []
}

ToastContainer.propTypes = {
  position: propTypes.oneOf(['topLeft', 'topRight', 'topCenter', 'bottomRight', 'bottomLeft', 'bottomCenter']),
  duration: propTypes.number,
  messages: propTypes.arrayOf(messageSchema),
  remove: propTypes.func
}

export default ToastContainer
