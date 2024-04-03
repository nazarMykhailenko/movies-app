import React from 'react'
import debounce from 'lodash.debounce'
import { AiOutlineSearch } from 'react-icons/ai'
import { selectFilters } from '../../redux/filters/select'
import { setSearchValue } from '../../redux/filters/slice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import classes from './Search.module.scss'

export const Search: React.FC = () => {
	const dispatch = useAppDispatch()
	const [value, setValue] = React.useState<string>(``)
	const inputRef = React.useRef<HTMLInputElement>(null)

	const updateValue = React.useCallback(
		debounce((value: string) => {
			dispatch(setSearchValue(value))
		}, 250),
		[]
	)

	const changeInput = (event: React.FormEvent<HTMLInputElement>) => {
		setValue(event.currentTarget.value)
		updateValue(event.currentTarget.value)
	}

	const focusOnInput = () => {
		if (inputRef.current) {
			inputRef.current.focus()
		}
	}
	return (
		<div className={classes.root}>
			<AiOutlineSearch onClick={focusOnInput} className={classes.icon} />
			<input
				onChange={changeInput}
				value={value}
				ref={inputRef}
				placeholder='Search Movie...'
			/>
		</div>
	)
}
