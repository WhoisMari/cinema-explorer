import React, { Fragment, useState, useEffect } from 'react'
import ItemCard from './ItemCard'
import Loader from '../UI/Loader'
import useFetch from '../../utils/useFetch'
import Error from '../UI/Error'
import InfiniteScroll from 'react-infinite-scroll-component'
import config from '../../utils/config.json'
import 'animate.css'

const ItemsContainer = (props) => {
	const { isLoading, serverError, apiData, totalPages } = useFetch(props.url, 1, '', props.genres)
	const [currentPage, setCurrentPage] = useState(1)
	const [items, setItems] = useState([])
	const region = localStorage.getItem('region') ? localStorage.getItem('region') : 'US'
	const language = localStorage.getItem('language') ? localStorage.getItem('language') : 'en'

	const infiniteScrollLoader = ( <h4 className='loader'>Loading...</h4> )

	const infiniteScrollEndMessage = (
		<div className='infinite-scroll-end-message'>
			<h4>You have seen it all.</h4>
		</div>
	)

	const handleLoadMore = () => {
		fetch(`${config.api_url}${props.url}?with_genres=${props.genres}&api_key=${config.api_key}&page=${currentPage+1}&language=${language}&region=${region}`)
		.then(res => res.json())
		.then(data => {
			setItems(prevData => [...prevData, ...data.results]);
			setCurrentPage(currentPage+1)
		})
	}

	useEffect(() => {
		if (apiData) {
			setItems(apiData.results)
			setCurrentPage(1)
		}
	}, [apiData])

	return (
		<Fragment>
			{!isLoading ? (
				<div className='animate__animated animate__fadeIn'>
						{items &&
							<Fragment>
								{items.length > 0 ? (
									<InfiniteScroll
										refreshFunction={() => window.location.reload()}
										pullDownToRefresh
										pullDownToRefreshThreshold={80}
										pullDownToRefreshContent={<h5 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h5>}
										releaseToRefreshContent={<h5 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h5>}
										dataLength={items.length}
										hasMore={apiData.page === totalPages ? false : true}
										loader={infiniteScrollLoader}
										next={handleLoadMore}
										endMessage={infiniteScrollEndMessage}
									>
										<div className='wrap-items'>
											{items.map((item) => 
												<ItemCard
													key={item.id}
													item={item}
													url={props.path}
												/>
											)}
										</div>
									</InfiniteScroll>
								) : <Error /> }
							</Fragment>
						}
				</div>
			) : <Loader /> }
			{serverError && <span>Sorry, something went wrong!</span>}
		</Fragment>
	)
}

export default ItemsContainer