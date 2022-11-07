import React, { Fragment, useState } from 'react'
import Genres from '../components/filter/Genres'
import config from '../utils/config.json'
import AsyncSelect from 'react-select/async'
import { useNavigate, useLocation } from 'react-router-dom'
import ItemsContainer from '../components/items/ItemsContainer'
import './pages.scss'

const CatalogPage = (props) => {
	const search = useLocation().search
	const filtering_genre = new URLSearchParams(search).get('genre')

	const navigate = useNavigate()
	const [url, setUrl] = useState(`${props.url}/${props.category}`)
	const [genres, setGenres] = useState('')
	const region = localStorage.getItem('region') ? localStorage.getItem('region') : 'US'
	const language = localStorage.getItem('language') ? localStorage.getItem('language') : 'en'

	const loadOptions = async (inputValue, callback) => {
		const options_list = []
		const response = await fetch(`${config.api_url}search/${props.url}?&query=${inputValue}&api_key=${config.api_key}&language=${language}&region=${region}`)
		const data = await response.json()
		data.results.map((item) => {
			return options_list.push({value: item.id, label: props.url === 'movie' ? item.title : item.name})
		})
		callback(options_list)
	}

	const onChangeSearch = (item) => {
		navigate(`/${props.url}/${item.value}`)
	}

	const handleFilterGenres = (genres_list) => {
		setUrl(`discover/${props.url}`)
		setGenres(genres_list)
	}

	return (
		<Fragment>
			<div className='wrap-filters'>
				<AsyncSelect
					className='search-input'
					placeholder={props.url === 'movie' ? 'Looking for a movie?' : 'Looking for a TV Show?'}
					onChange={onChangeSearch}
					loadOptions={loadOptions}
					noOptionsMessage={() => props.url === 'movie' ? 'Type a valid Movie title' : 'Type a valid TV Show title'} 
				/>
				<Genres
					filtering_genre={filtering_genre}
					url={props.url}
					handleFilterGenres={handleFilterGenres}
				/>
			</div>

			<ItemsContainer 
				genres={genres}
				url={url}
				path={props.url}
			/>
		</Fragment>
	)
}

export default CatalogPage