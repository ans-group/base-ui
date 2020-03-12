import React from 'react'
import propTypes from 'prop-types'
import styles from './Table.module.scss'
import Checkbox from '../Checkbox'
import BodyCell from './BodyCell'

const BodyRow = ({ onSelect, columns, row, selected }) => (
  <div className={styles.row}>
    {onSelect && (
      <div className={styles.cell}>
        <Checkbox checked={selected} onClick={onSelect && onSelect(row.key)} />
      </div>
    )}
    {columns && columns.map(column => (
      <BodyCell key={row.key + column.key}>
        {column.render
          ? column.render(row)
          : row[column.dataIndex]}
      </BodyCell>
    ))}
  </div>
)

BodyRow.propTypes = {
  onSelect: propTypes.func,
  columns: propTypes.arrayOf(propTypes.shape({
    title: propTypes.any,
    dataIndex: propTypes.string,
    render: propTypes.func,
    key: propTypes.string.isRequired
  })).isRequired,
  row: propTypes.shape({
    key: propTypes.string.isRequired
  }).isRequired,
  selected: propTypes.bool
}

export default BodyRow
