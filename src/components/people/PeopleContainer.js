import React, { Fragment, useState, useEffect } from 'react'
import useFetch from '../../utils/useFetch'
import Loader from '../UI/Loader'
import PersonCard from './PersonCard'
import config from '../../utils/config.json'
import InfiniteScroll from 'react-infinite-scroll-component'
import 'animate.css'

const PeopleContainer = (props) => {
	const { isLoading, serverError, apiData, totalPages } = useFetch(props.url, 1)
	const [currentPage, setCurrentPage] = useState(1)
	const [people, setPeople] = useState([])
	const region = localStorage.getItem('region') ? localStorage.getItem('region') : 'US'
	const language = localStorage.getItem('language') ? localStorage.getItem('language') : 'en'

	const infiniteScrollLoader = (
		<h4 className='loader'>Loading...</h4>
	)

	const infiniteScrollEndMessage = (
		<div className='infinite-scroll-end-message'>
			<h4>You have seen it all.</h4>
		</div>
	)

	const handleLoadMore = () => {
		fetch(`${config.api_url}${props.url}?with_genres=${props.genres}&api_key=${config.api_key}&page=${currentPage+1}&language=${language}&region=${region}`)
		.then(res => res.json())
		.then(data => {
			setPeople(prevData => [...prevData, ...data.results]);
			setCurrentPage(currentPage+1)
		})
	}

	useEffect(() => {
		if (apiData) {
			setPeople(apiData.results)
			setCurrentPage(1)
		}
	}, [apiData])

	return (
		<Fragment>
			{!isLoading ? (
				<div className='animate__animated animate__fadeIn'>
					{people.length > 0 &&
						<InfiniteScroll
							refreshFunction={() => window.location.reload()}
							pullDownToRefresh
							pullDownToRefreshThreshold={80}
							pullDownToRefreshContent={<h5 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h5>}
							releaseToRefreshContent={<h5 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h5>}
							dataLength={people.length}
							hasMore={apiData.page === totalPages ? false : true}
							loader={infiniteScrollLoader}
							next={handleLoadMore}
							endMessage={infiniteScrollEndMessage}
						>
							<div className='wrap-items'>
								{people.map((person) => 
									<PersonCard
										key={person.id}
										person={person}
									/>
								)}
							</div>
						</InfiniteScroll>
					}
				</div>
			) : <Loader />}
			{serverError && <span>Sorry, something went wrong!</span>}
		</Fragment>
	)
}

export default PeopleContainer