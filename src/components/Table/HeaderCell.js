import React, { useRef } from 'react'
import styles from './Table.module.scss'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import propTypes from 'prop-types'
import classNames from 'classnames'

const sortIcon = direction => direction === 'asc' ? <FiChevronUp /> : <FiChevronDown />

const HeaderCell = ({ column, onClick, sortable, currentSortIndex, currentSortDirection, loading }) => {
  const headerRef = useRef(0)
  const measureRef = useRef(0)
  const canSort = sortable && column.dataIndex
  const className = classNames(
    { [styles.sortable]: canSort },
    { [styles.sorted]: currentSortIndex === column.dataIndex }
  )
  if (headerRef.current && measureRef.current && !loading) {
    // hack: temporarily lock column widths when loading new pages
    setTimeout(() => {
      if (headerRef.current)
        {headerRef.current.style.width = measureRef.current.clientWidth + 'px'}
    }, 1)
  }
  return (
    <div className={styles.headerCell} ref={headerRef}>
      <div ref={measureRef} style={{ display: 'block', width: '100%' }}>
        <span onClick={canSort ? onClick(column.dataIndex) : undefined} className={className}>{column.title} {sortable && currentSortIndex === column.dataIndex && sortIcon(currentSortDirection)}</span>
      </div>
    </div >
  )
}

HeaderCell.propTypes = {
  column: propTypes.shape({
    title: propTypes.any,
    dataIndex: propTypes.string
  }).isRequired,
  sortable: propTypes.bool,
  onClick: propTypes.func,
  currentSortIndex: propTypes.string,
  currentSortDirection: propTypes.oneOf(['asc', 'desc'])
}

export default HeaderCell
