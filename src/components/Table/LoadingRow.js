import React from 'react'
import BodyCell from './BodyCell'
import tableStyles from '../../styles/table.module.scss'

const LoadingRow = ({ columnCount }) => (
  <tr className={tableStyles.row}>
    {new Array(columnCount).fill(0).map((__, i) => (
      <BodyCell key={i}>
        <span className={tableStyles.loadingBlock} />
      </BodyCell>
    ))}
  </tr>
)

export default LoadingRow
