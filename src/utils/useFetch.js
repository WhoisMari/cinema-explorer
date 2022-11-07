import { useState, useEffect } from 'react'
import config from '../utils/config.json';

const useFetch = (url, page_number = '', query = '', genres = '') => {
	const [isLoading, setIsLoading] = useState(false)
	const [apiData, setApiData] = useState(null)
	const [serverError, setServerError] = useState(null)
	const [totalPages, setTotalPages] = useState(false)
	const region = localStorage.getItem('region') ? localStorage.getItem('region') : 'US'
	const language = localStorage.getItem('language') ? localStorage.getItem('language') : 'en'

	useEffect(() => {
		setIsLoading(true)
		const fetchMovie = async () => {
			try {
				const response = await fetch(`${config.api_url}${url}?with_genres=${genres}&query=${query}&api_key=${config.api_key}&page=${page_number}&language=${language}&region=${region}`)
				const data = await response.json()
				setApiData(data)
				setTotalPages(data.total_pages)
				setIsLoading(false)
			} catch (error) {
				setServerError(error)
				setIsLoading(false)
			}
		}
		fetchMovie()
	}, [url, page_number, query, region, language, genres])
	return { isLoading, apiData, serverError, totalPages}
}

export default useFetch