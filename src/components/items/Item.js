import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import useFetchDetails from '../../utils/useFetchDetails'
import ItemCard from './ItemCard'
import Providers from './Providers'
import PersonCard from '../people/PersonCard'
import Moment from 'moment'
import config from '../../utils/config.json'
import classes from './Item.module.scss'
import Loader from '../UI/Loader'

const Item = (props) => {
	const { item } = props
	const { isLoading, serverError, apiData } = useFetchDetails(props.url, item.id)
	const { credits, similar, providers, videos } = apiData
	const region = localStorage.getItem('region')
	Moment.locale(localStorage.getItem('language') ? localStorage.getItem('language') : 'en')

	return (
		<div className={classes['item-container']}>
			{!isLoading && apiData ? (
				<Fragment>
					<div className='row'>
						<div className='col-12 col-md-6'>
							<img className={classes['item-poster']} alt={props.url === 'movie' ? 'Movie poster' : 'TV Show poster'} src={item.poster_path ? 
								`${config.image_api_url}/${item.poster_path}` : 
								'https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg'
							} />
						</div>
						<div className={`col-12 col-md-6 ${classes['wrap-item']}`}>
							<div className={classes['wrap-item-header']}>
								<h1>{item.title ? item.title : item.name} ({Moment(item.release_date).format('YYYY')})</h1>
								<div className={classes['wrap-tagline']}><em>{item.tagline}</em></div>
								<div className={classes['wrap-basic-info']}>
									<div className={classes['date']}>{Moment(item.release_date).format('DD/MM/YYYY')}</div>
									<div className={classes['genres']}>
										<span>●</span>
										{item.genres.map((genre) => <Link to={`/?genre=${genre.id}`} key={genre.id}>{genre.name}</Link>	)}
									</div>
									{item.runtime ? (
										<div className={classes['runtime']}>
											<span>●</span>
											<span>{item.runtime} min</span>
										</div>
									) :  null}
								</div>
							</div>

							<div className={classes['wrap-sub-heading']}>
								<div className={classes['wrap-rating']}>
									<div>{Math.round(item.vote_average * 10) / 10}</div>
								</div>
								{videos &&
									<div className={classes['wrap-trailers']}>
										{videos.results.map((video) => (
											<Fragment key={video.id}>
												{video.type === 'Trailer' &&
													<a href={`https://www.youtube.com/watch?v=${video.key}`}>{video.name}</a>
												}
											</Fragment>
										))}
									</div>
								}
							</div>

							{item.overview ? (
							<div className={classes['wrap-overview']}>
								<div>Overview:</div>
								<div className={classes['overview-body']}>{item.overview}</div>
							</div>
							) : null}

							<div className={classes['wrap-watch']}>
								<div>Where to watch:</div>
								{providers? (
									<div className={classes['wrap-providers']}>
										<Providers providers={providers} />
									</div>	
								) : (
									<span>Sorry, there is no providers information available.</span>
								)}
							</div>

						</div>
					</div>

					{credits &&
						<div className={classes['wrap-cast']}>
							{credits.cast.slice(0, 10).map((person) => (
								<PersonCard key={person.id} person={person} styling={'small'} />
							))}
						</div>
					}

					{similar &&
						<div className={classes['wrap-similar']}>
							{similar.results.map((item) => (
								<ItemCard key={item.id} item={item} url={props.url} styling={'small'} />
							))}
						</div>
					}
				</Fragment>
			) : (<Loader />)}
			{serverError && <span>{serverError}</span>}
		</div>
	)
}

export default Item