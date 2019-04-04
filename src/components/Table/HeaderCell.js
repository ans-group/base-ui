import React from 'react'
import tableStyles from '../../styles/table.module.scss'
import { FiChevronDown, FiChevronUp } from 'react-icons/fi'
import propTypes from 'prop-types'
import classNames from 'classnames'

const sortIcon = direction => direction === 'asc' ? <FiChevronUp /> : <FiChevronDown />

const HeaderCell = ({ column, onClick, sortable, currentSortIndex, currentSortDirection }) => {
  const className = classNames(
    { [tableStyles.sortable]: sortable },
    { [tableStyles.sorted]: currentSortIndex === column.dataIndex }
  )
  return (
    <th className={tableStyles.headerCell}>
      <span onClick={sortable ? onClick(column.dataIndex) : undefined} className={className}>{column.title} {sortable && currentSortIndex === column.dataIndex && sortIcon(currentSortDirection)}</span>
    </th>
  )
}

HeaderCell.propTypes = {
  column: propTypes.shape({
    title: propTypes.string.isRequired,
    dataIndex: propTypes.string.isRequired
  }).isRequired,
  sortable: propTypes.bool,
  onClick: propTypes.func,
  currentSortIndex: propTypes.string,
  currentSortDirection: propTypes.oneOf(['asc', 'desc'])
}

export default HeaderCell
