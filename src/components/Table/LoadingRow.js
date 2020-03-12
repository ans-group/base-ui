import React from 'react'
import BodyCell from './BodyCell'
import styles from './Table.module.scss'
import LoadingBlock from '../Loadingblock'

const LoadingRow = ({ columnCount, width }) => (
  <div className={styles.row}>
    {new Array(columnCount).fill(0).map((__, i) => (
      <BodyCell key={i}>
        <LoadingBlock style={{ height: '1.8em', width }} />
      </BodyCell>
    ))}
  </div>
)

LoadingRow.defaultProps = {
  width: '100%'
}

export default LoadingRow
