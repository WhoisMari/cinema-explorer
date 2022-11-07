import React, { Fragment } from 'react'
import AsyncSelect from 'react-select/async'
import config from '../utils/config.json'
import { useNavigate } from 'react-router-dom'
import PeopleContainer from '../components/people/PeopleContainer'
import 'animate.css'
import './pages.scss'

const PeoplePage = () => {
	const navigate = useNavigate()
	const language = localStorage.getItem('language') ? localStorage.getItem('language') : 'en'
	const region = localStorage.getItem('region') ? localStorage.getItem('region') : 'US'
	const url = 'person/popular'

	const loadOptions = async (inputValue, callback) => {
		const options_list = []
		const response = await fetch(`${config.api_url}search/person?&query=${inputValue}&api_key=${config.api_key}&language=${language}&region=${region}`)
		const data = await response.json()
		data.results.map((person) => {
			return options_list.push({value: person.id, label: person.name})
		})
		callback(options_list)
	}

	const onChangeSearch = (item) => {
		navigate(`/people/${item.value}`);
	}

	return (
		<Fragment>
			<div className='wrap-filters'>
				<AsyncSelect
					className='search-input'
					placeholder='Looking for someone?'
					onChange={onChangeSearch}
					loadOptions={loadOptions}
					noOptionsMessage={() => 'Person not found'} 
				/>
			</div>
			<PeopleContainer url={url} />
		</Fragment>
	)
}

export default PeoplePage