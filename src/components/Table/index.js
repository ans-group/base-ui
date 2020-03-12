import React, { useState, useEffect } from 'react'
import classNames from 'classnames'
import propTypes from 'prop-types'
import xor from 'lodash/xor'
import Checkbox from '../Checkbox'
import orderBy from 'lodash/orderBy'
import HeaderCell from './HeaderCell'
import BodyRow from './BodyRow'
import LoadingRow from './LoadingRow'
import styles from './Table.module.scss'

const Table = ({ columns, data, onSort, onSelect, sortable, loading, noContent, loadingBars, inline, defaultSortIndex, defaultSortDir, style, className, ...otherProps }) => {
  const [sortBy, setSortBy] = useState(defaultSortIndex || columns[0].dataIndex)
  const [sortDirection, setSortDirection] = useState(defaultSortDir || 'asc')
  const [selectedItems, setSelected] = useState([])
  const sortedData = orderBy(data, sortBy, sortDirection)

  useEffect(() => {
    if (onSelect) {
      onSelect(selectedItems, data.filter(item => selectedItems.includes(item.key)))
    }
  }, [selectedItems, data, onSelect])

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
      loading={loading}
      onClick={handleTableHeaderClick} />
  ))

  const rows = loading
    ? new Array(loadingBars).fill(0).map((__, i) => <LoadingRow key={i} columnCount={columns.length} />)
    : sortedData.map((row, i) => (
      <BodyRow key={row.key || row.id || row._id || row.intentName || i} row={row} columns={columns} onSelect={onSelect && handleTableRowSelect} selected={selectedItems.includes(row.key)} />
    ))

  const rootStyles = classNames(
    styles.root,
    { [styles.inline]: !!inline }
  )

  return (
    <div className={rootStyles + ' ' + className} {...otherProps} style={{ ...style, tableLayout: loading ? 'fixed' : 'auto' }}>
      {rows.length > 0
        ? (
          <React.Fragment>
            <div className={styles.headerRow}>
              <div style={{ display: 'table-row' }}>
                {!loading && onSelect && (
                  <div className={styles.headerCell}>
                    <Checkbox partial={selectedItems.length > 0} checked={selectedItems.length === data.length} onChange={handleSelectAll} />
                  </div>
                )}
                {tableHeader}
              </div>
            </div>
            <div className={styles.body}>
              {rows}
            </div>
          </React.Fragment>
        )
        : (
          <div className={styles.empty} data-empty>
            {noContent && noContent.image && <img className={styles.emptyImage} src={noContent.image} alt="No items" />}
            {noContent && noContent.title && <h2 className={styles.emptyTitle}>{noContent.title}</h2>}
            {noContent && noContent.text && <p className={styles.emptyText}>{noContent.text}</p>}
          </div>
        )
      }
    </div>
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
