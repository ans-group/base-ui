import React, { useState, useEffect } from 'react'
import propTypes from 'prop-types'
import xor from 'lodash/xor'
import Checkbox from './Checkbox'
import orderBy from 'lodash/orderBy'
import HeaderCell from './Table/HeaderCell'
import BodyRow from './Table/BodyRow'
import LoadingRow from './Table/LoadingRow'
import tableStyles from '../styles/table.module.scss'

const Table = ({ columns, data, onSort, onSelect, sortable, loading, loadingBars, defaultSortIndex, ...otherProps }) => {
  const [sortBy, setSortBy] = useState(defaultSortIndex || columns[0].dataIndex)
  const [sortDirection, setSortDirection] = useState('asc')
  const [selectedItems, setSelected] = useState([])
  const sortedData = orderBy(data, sortBy, sortDirection)

  if (onSelect) {
    useEffect(() => {
      onSelect(selectedItems, data.filter(item => selectedItems.includes(item.key)))
    }, [selectedItems])
  }

  const handleTableHeaderClick = dataIndex => () => {
    const newSortDir = sortDirection === 'asc' ? 'desc' : 'asc'
    setSortBy(dataIndex)
    setSortDirection(newSortDir)
    if (onSort) {
      onSort(dataIndex, newSortDir)
    }
  }

  const handleSelectAll = e => {
    if (selectedItems.length === data.length) {
      setSelected([])
    } else {
      setSelected(data.map(item => item.key))
    }
  }

  const handleTableRowSelect = key => () => {
    setSelected(xor(selectedItems, [key]))
  }

  const tableHeader = columns.map(column => (
    <HeaderCell
      column={column}
      key={column.key}
      currentSortIndex={sortBy}
      currentSortDirection={sortDirection}
      sortable={!loading && sortable}
      onClick={handleTableHeaderClick} />
  ))

  const rows = loading
    ? new Array(loadingBars).fill(0).map((__, i) => <LoadingRow key={i} columnCount={columns.length} />)
    : sortedData.map(row => (
      <BodyRow key={row.key || row.id || row._id || i} row={row} columns={columns} onSelect={onSelect && handleTableRowSelect} selected={selectedItems.includes(row.key)} />
    ))

  return (
    <table className={tableStyles.root} {...otherProps}>
      <thead className={tableStyles.headerRow}>
        <tr>
          {!loading && onSelect && (
            <th className={tableStyles.headerCell}>
              <Checkbox partial={selectedItems.length > 0} checked={selectedItems.length === data.length} onChange={handleSelectAll}/>
            </th>
          )}
          {tableHeader}
        </tr>
      </thead>
      <tbody className={tableStyles.body}>
        {rows}
      </tbody>
    </table>
  )
}

Table.defaultProps = {
  sortable: true,
  loadingBars: 10
}

Table.propTypes = {
  // TODO: work out why this isn't working on storybook
  /** The columns to use in the table */
  // columns: propTypes.arrayOf(propTypes.shape({
  // title: propTypes.string.isRequired
  // dataIndex: propTypes.string,
  // render: propTypes.func
  // key: propTypes.string.isRequired
  // })),
  /** The data to display in the table */
  // data: propTypes.arrayOf(propTypes.shape({
  // key: propTypes.oneOfType([propTypes.string, propTypes.number]).isRequired
  // email: propTypes.string.isRequired
  // })),
  /** whether to show the loading state */
  loading: propTypes.bool,
  /** the number of loading bars (default: 10) */
  loadingBars: propTypes.number,
  /** callback when table is sorted */
  onSort: propTypes.func,
  /** callback when row(s) are selected - enables selection when defined */
  onSelect: propTypes.func,
  /** whether to make the table sortable */
  sortable: propTypes.bool
}

export default Table
