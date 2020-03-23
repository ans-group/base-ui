import React, { useState } from 'react'
import { createPortal } from 'react-dom';
import classNames from 'classnames'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import ToastContext from './context';
import Toast from './Toast';
import styles from './Toast.module.scss';

function generateUEID() {
  let first = (Math.random() * 46656) | 0;
  let second = (Math.random() * 46656) | 0;
  first = ('000' + first.toString(36)).slice(-3);
  second = ('000' + second.toString(36)).slice(-3);

  return first + second;
}

function withToastProvider(Component, position = 'bottomRight', duration = 4000) {
  const classes = classNames(
    styles.root,
    { [styles.topLeft]: position === 'topLeft' },
    { [styles.topRight]: position === 'topRight' },
    { [styles.topCenter]: position === 'topCenter' },
    { [styles.bottomLeft]: position === 'bottomLeft' },
    { [styles.bottomRight]: position === 'bottomRight' },
    { [styles.bottomCenter]: position === 'bottomCenter' }
  )
  function WithToastProvider(props) {
    const [toasts, setToasts] = useState([]);
    const add = message => {
      const id = generateUEID();
      const toastsCopy = [...toasts];
      
      if (toastsCopy.length > 5) {
        toastsCopy.shift();
      }

      setToasts([...toastsCopy, { id, message }]);
    };
    const remove = id => setToasts(toasts.filter(t => t.id !== id));
    const Toasts = () => createPortal((
      <div className={styles.toastsContainer}>
          <TransitionGroup className={classes}>
              { toasts.map(t => (
                <CSSTransition key={t.id} timeout={300} classNames={styles}>
                    <Toast message={t.message} remove={() => remove(t.id)} duration={duration} />
                  </CSSTransition>
                )) }
              </TransitionGroup>
            </div>
    ), document.body )

    return (
      <ToastContext.Provider value={{ add, remove }}>
        <Component {...props} />
        <Toasts />
      </ToastContext.Provider>
    )
  }

  return WithToastProvider
}


export default withToastProvider;
