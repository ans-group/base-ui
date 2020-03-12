import React from 'react'
import { Redirect } from 'react-router-dom'
import Button from '../Button'
import styles from './LoginForm.module.scss'
import LoginPaneBorder from '../../assets/LoginPaneBorder'
import Windows from '../../assets/Windows'

const LoginForm = ({ handleLogin, loggingIn, loggedIn, location }) => loggingIn ? '' : (
  <div className={styles.root}>
    <div className={styles.container}>
      <LoginPaneBorder className={styles.paneBorder} />
      <div className={styles.logo}>
        <img src="/images/logo.png" alt="Coventry University Logo" />
      </div>
      <h1 className={styles.heading}>Please sign in</h1>
      <Button type="button" loading={loggingIn} icon={() => <Windows />} onClick={handleLogin}>
        {loggingIn ? 'Logging in...' : 'Log in with Microsoft'}
      </Button>
    </div>
    {loggedIn && <Redirect to={location.state && location.state.from && location.state.from.pathname ? location.state.from.pathname : '/'} />}
  </div>
)

export default LoginForm
