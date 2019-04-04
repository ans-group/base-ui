import React from 'react'
import propTypes from 'prop-types'
import tableStyles from '../../styles/table.module.scss'
import Checkbox from '../Checkbox'
import BodyCell from './BodyCell'

const BodyRow = ({ onSelect, columns, row, selected }) => (
  <tr className={tableStyles.row} onClick={onSelect && onSelect(row.key)}>
    {onSelect && (
      <td className={tableStyles.cell}>
        <Checkbox checked={selected} />
      </td>
    )}
    {columns.map(column => (
      <BodyCell key={row.key + column.key}>
        {column.render
          ? column.render(row)
          : row[column.dataIndex]}
      </BodyCell>
    ))}
  </tr>
)

BodyRow.propTypes = {
  onSelect: propTypes.func,
  columns: propTypes.arrayOf(propTypes.shape({
    title: propTypes.string.isRequired,
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
