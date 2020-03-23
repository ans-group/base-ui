import React, { useEffect, useRef } from 'react'
import classNames from 'classnames'
import propTypes from 'prop-types'
import styles from './Toast.module.scss'

const messageSchema = propTypes.shape({
  status: propTypes.oneOf(['success', 'warning', 'error']),
  title: propTypes.string,
  text: propTypes.string
})

const Toast = ({ message, remove, duration }) => {
  const { status, title, text } = message
  const removeRef = useRef()
  removeRef.current = remove

  const classes = classNames(
    styles.toastRoot,
    { [styles.success]: status === 'success' },
    { [styles.warning]: status === 'warning' },
    { [styles.error]: status === 'error' }
  )

  useEffect(() => {
    const timeout = setTimeout(removeRef.current, duration)
    return  () => clearTimeout(timeout)
  }, [])

  return (
    <div className={classes}>
      <h6 className={styles.title}>{title}</h6>
      {text && <p className={styles.text}>
        {text}
      </p>}
    </div>
  )
}

Toast.propTypes = {
  message: messageSchema,
  remove: propTypes.func,
  duration: propTypes.number
}

Toast.defaultProps = {
  duration: 4000
}

export default Toast
