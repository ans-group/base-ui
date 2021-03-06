import React, { useState, useRef, useEffect } from 'react'
import classNames from 'classnames'
import styles from './Popup.module.scss'

export const Item = ({ children, disabled, ...otherProps }) => {
  const classes = classNames(
    styles.item,
    { [styles.disabledItem]: disabled }
  )
  return (
    <div className={classes} {...otherProps}>
      {children}
    </div>
  )
}

const Popup = ({ children, content, ...otherProps }) => {
  const [active, setActive] = useState(false)
  const node = useRef()

  const hide = ({ target }) => {
    if (node.current && node.current.contains(target)) return
    setActive(false)
  }

  const show = () => {
    setActive(true)
  }

  useEffect(() => {
    if (active) {
      document.addEventListener('click', hide)
    }
    return () => {
      document.removeEventListener('click', hide)
    }
  }, [active])

  return (
    <div className={styles.root} onClick={show} {...otherProps}>
      {children}
      {active && (
        <div className={styles.content} ref={node}>
          {content}
          <span className={styles.arrow} />
        </div>
      )}
    </div>
  )
}

export default Popup
