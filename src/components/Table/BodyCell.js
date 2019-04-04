import React from 'react'
import tableStyles from '../../styles/table.module.scss'

const BodyCell = ({ children }) => (
  <td className={tableStyles.cell}>
    {children}
  </td>
)

export default BodyCell
