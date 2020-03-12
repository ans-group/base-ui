import React from 'react'
import propTypes from 'prop-types'
import classNames from 'classnames'
import { FiChevronRight, FiChevronLeft } from 'react-icons/fi'
import paginationStyles from './Pagination.module.scss'

const IndexSelector = ({ index, active, onClick }) => {
  const className = classNames(
    paginationStyles.button,
    { [paginationStyles.active]: active }
  )
  return (
    <div onClick={active ? undefined : onClick} className={className}>
      {index}
    </div>
  )
}

const DirectionSelector = ({ direction, disabled, onClick }) => {
  const className = classNames(
    paginationStyles.button,
    { [paginationStyles.disabled]: disabled }
  )
  return (
    <div onClick={disabled ? undefined : onClick} className={className}>
      {direction === 'prev' ? <FiChevronLeft /> : <FiChevronRight />}
    </div>
  )
}

const Pagination = ({ total, current, onChange, ...otherProps }) => {
  const multiplePages = total > 1
  const changePage = page => () => onChange(page)

  return multiplePages && (
    <div className={paginationStyles.root} {...otherProps}>
      <IndexSelector index={1} active={current === 1} onClick={changePage(1)} />
      <DirectionSelector direction="prev" disabled={current === 1} onClick={changePage(current - 1)} />
      <div className={paginationStyles.current}>Page {current}</div>
      <DirectionSelector direction="next" disabled={current === total} onClick={changePage(current + 1)} />
      <IndexSelector index={total} active={current === total} onClick={changePage(total)} />
    </div>
  )
}

Pagination.defaultProps = {
  total: 0
}

Pagination.propTypes = {
  total: propTypes.number.isRequired,
  current: propTypes.number.isRequired,
  onChange: propTypes.func.isRequired
}

export default Pagination
