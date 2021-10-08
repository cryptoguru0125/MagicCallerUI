import React from 'react'
import ReactPaginate from 'react-paginate'

type Props = {
  page: number
  pageCount: number
  onChange(page: number): void
}

const Pagination: React.FC<Props> = props => {
  const { page, pageCount, onChange } = props

  if (!pageCount) {
    return null
  }

  return (
    <ReactPaginate
      initialPage={page}
      pageCount={pageCount}
      containerClassName="pagination mt-2 justify-content-center"
      pageClassName="page-item"
      pageLinkClassName="page-link"
      activeClassName="active"
      disabledClassName="disabled"
      previousClassName="page-item"
      nextClassName="page-item"
      previousLinkClassName="page-link"
      nextLinkClassName="page-link"
      onPageChange={({ selected }) => {
        onChange(selected)
      }}
      disableInitialCallback
    />
  )
}

export default Pagination
