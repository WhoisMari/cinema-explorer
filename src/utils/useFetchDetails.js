import { useState, useEffect } from 'react'
import config from '../utils/config.json'

const useFetchDetails = (url, id) => {
	const [isLoading, setIsLoading] = useState(false)
	const [apiData, setApiData] = useState([])
	const [serverError, setServerError] = useState(null)
	let data = []
	const region = localStorage.getItem('region') ? localStorage.getItem('region') : 'US'
	const language = localStorage.getItem('language') ? localStorage.getItem('language') : 'en'

	const getData = async (path) => {
		let url_to_fetch = `${config.api_url}${url}/${id}/${path}?api_key=${config.api_key}&region=${region}&language=${language}`
		const response = await fetch(url_to_fetch)
		const data = await response.json()
		return data
	}
	const fetchData = async () => {
		setIsLoading(true)
		try {
			const responses = await Promise.all([getData('credits'), getData('similar'), getData('watch/providers'), getData('videos')])
			data['credits'] = responses[0]
			data['similar'] = responses[1]
			data['providers'] = responses[2].results[region]
			data['videos'] = responses[3]
			setApiData(data)
			setIsLoading(false)
		} catch(error) {
			setServerError(error)
			setIsLoading(false)
		}
	}

	useEffect(() => {
		fetchData()
	}, [url, id])
	return { isLoading, apiData, serverError }
}

export default useFetchDetails