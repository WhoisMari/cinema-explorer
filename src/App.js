import React, { useState, useEffect } from 'react'
import { Routes, BrowserRouter, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import CatalogPage from './pages/CatalogPage'
import ItemPage from './pages/ItemPage'
import PeoplePage from './pages/PeoplePage'
import PersonPage from './pages/PersonPage'
import config from './utils/config.json'
import './global.scss'

function App() {
	const [regions, setRegions] = useState([])

	const fetchRegions = async () => {
		const response = await fetch(`${config.api_url}watch/providers/regions?api_key=${config.api_key}`)
		const data = await response.json()
		setRegions(data.results)
	}
	useEffect(() => {
		fetchRegions()
	}, [])

	return (
		<div className='App'>
			<BrowserRouter>
				<Header regions={regions} languages={config.language_options} />
				<div className='container'>
					<Routes>
						<Route path='/' exact element={<CatalogPage key='movies' category='popular' url='movie' />} />
						<Route path='/now-playing' exact element={<CatalogPage key='now-playing' category='now_playing' url='movie' />} />
						<Route path='/top-rated' exact element={<CatalogPage key='top-rated' category='top_rated' url='movie' />} />
						<Route path='/upcoming' exact element={<CatalogPage key='upcoming' category='upcoming' url='movie' />} />
							<Route path='/movie/:id' exact element={<ItemPage url='movie' />} />

						<Route path='/tv' exact element={<CatalogPage key='tv' category='popular' url='tv' />} />
						<Route path='/tv/airing-today' exact element={<CatalogPage key='tv-airing-today' category='airing_today' url='tv' />} />
						<Route path='/tv/on-tv' exact element={<CatalogPage key='tv-on-the-air' category='on_the_air' url='tv' />} />
						<Route path='/tv/top-rated' exact element={<CatalogPage key='tv-top-rated' category='top_rated' url='tv' />} />
							<Route path='/tv/:id' exact element={<ItemPage url='tv' />} />

						<Route path='/people' exact element={<PeoplePage />} />
							<Route path='/people/:id' exact element={<PersonPage />} />
					</Routes>
				</div>
			</BrowserRouter>
		</div>
	)
}

export default App