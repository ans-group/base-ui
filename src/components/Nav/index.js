import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import Responses from '../../assets/Responses'
import Logo from '../../assets/Logo'
import LogOut from '../../assets/LogOut'
import Analytics from '../../assets/Analytics'
import ActivityLog from '../../assets/ActivityLog'
import styles from './Nav.module.scss'

const Nav = ({ logout }) => (
  <nav className={styles.root}>
    <Link to="/">
      <Logo className={styles.logo} />
    </Link>
    <div className={styles.links}>
      <NavLink exact to="/" activeClassName={styles.activeLink}>
        <div className={styles.link}>
          <Responses /> <span>Manage Responses</span>
        </div>
      </NavLink>
      <NavLink exact to="/analytics" activeClassName={styles.activeLink}>
        <div className={styles.link}>
          <Analytics /> <span>Analytics</span>
        </div>
      </NavLink>
      <NavLink exact to="/activity" activeClassName={styles.activeLink}>
        <div className={styles.link}>
          <ActivityLog /> <span>Activity Log</span>
        </div>
      </NavLink>
      <div className={styles.link} onClick={logout}>
        <LogOut /> <span>Log out</span>
      </div>
    </div>
  </nav>
)

export default Nav
