import React from 'react'
import ReactPaginate from 'react-paginate'
import { selectFilters } from '../../redux/filters/select'
import { setCurrentPage } from '../../redux/filters/slice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import classes from './Pagination.module.scss'

export const Pagination: React.FC = () => {
	const dispatch = useAppDispatch()
	const { currentPage } = useAppSelector(selectFilters)

	const onChangePage = (index: number) => {
		dispatch(setCurrentPage(index))
	}

	return (
		<div className={classes.root}>
			<div className='container'>
				<ReactPaginate
					className={classes.pagination}
					breakLabel='...'
					nextLabel='>'
					previousLabel='<'
					onPageChange={(event) => onChangePage(event.selected + 1)}
					pageRangeDisplayed={4}
					pageCount={4}
					forcePage={currentPage - 1}
				/>
			</div>
		</div>
	)
}
