import React, { useState, useEffect, useCallback } from 'react'
import config from '../../utils/config.json'
import Select from 'react-select'
import makeAnimated from 'react-select/animated'
import classes from './Filters.module.scss'

const Genres = (props) => {
	const animatedComponents = makeAnimated()
	const [genres, setGenres] = useState([])
	const [defaultGenre, setDefaultGenre] = useState([])
	const [error, setError] = useState([])
	const language = localStorage.getItem('language') ? localStorage.getItem('language') : null

	const onChange = (items) => {
		let selected_genres = []
		items.forEach((item) => { selected_genres.push(item.value) })
		props.handleFilterGenres(selected_genres)
	}

	const fetchGenresList = useCallback(async () => {
		try {
			const response = await fetch(`${config.api_url}genre/${props.url}/list?&api_key=${config.api_key}&language=${language}`, {
				method: 'GET',
			})
			if (!response.ok) {
				throw new Error('Something went wrong!')
			}
			const data = await response.json()
			let genres_list = []
			data.genres.forEach(genre => {
				genres_list.push({'value': genre.id, 'label': genre.name})
			})
			if (props.filtering_genre) {
				props.handleFilterGenres(props.filtering_genre)
				setDefaultGenre(genres_list.find((genre) => genre.value === parseInt(props.filtering_genre)))
			}
			setGenres(genres_list)
		} catch(error) {
			setError(error)
		}
	}, [language, props])

	useEffect(() => {
		fetchGenresList()
	}, [fetchGenresList])

	return (
		<div className={classes['genres']}>
			{genres.length > 0 &&
				<Select
					placeholder='Select a genre...'
					options={genres}
					isMulti
					defaultValue={defaultGenre}
					onChange={(e) => onChange(e)}
					components={animatedComponents}
				/>
			}
			{error && <span>{error}</span>}
		</div>
	)
}

export default Genres