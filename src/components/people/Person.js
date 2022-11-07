import React, { useEffect, useState } from 'react'
import config from '../../utils/config.json'
import ItemCard from '../items/ItemCard'
import classes from  './Person.module.scss'

const Person = (props) => {
	const person = props.person
	const [movies, setMovies] = useState([])
	const [tv, setTv] = useState([])

	const fetchMovies = async () => {
		const response = await fetch(`${config.api_url}/person/${person.id}/movie_credits?api_key=${config.api_key}&language=${localStorage.getItem('language')}`)
		const data = await response.json()
		setMovies(data.cast)
	}
	const fetchTv = async () => {
		const response = await fetch(`${config.api_url}/person/${person.id}/tv_credits?api_key=${config.api_key}&language=${localStorage.getItem('language')}`)
		const data = await response.json()
		setTv(data.cast)
	}
	useEffect(() => {
		fetchMovies()
		fetchTv()
	})

	return (
		<div className={`row ${classes['person-container']}`}>
			<div className={`${classes['img-container']} col-12 col-md-6`}>
				<img 
					alt={`${person.name} profile`}
					src={person.profile_path ? `${config.image_api_url}/${person.profile_path}` : 'https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg'}
				/>
			</div>
			<div className='col-12 col-md-6'>
				<h1>{person.name}</h1>
				<div>{person.place_of_birth} {person.deathday ? <span>{person.birthday} - {person.deathday}</span> : person.birthday}</div>
				<hr/>
				<div className={classes['wrap-bio']}>
					<div>Biography</div>
					{person.biography ? <div dangerouslySetInnerHTML={{ __html: person.biography }} /> : <div>Sorry, there is no biography information available.</div>}
				</div>
			</div>
			{tv.length > 0 ? (
				<div className={classes['wrap-tv']}>
					<div className={classes['category']}>TV Shows</div>
					<div className={classes['slider']}>
						{tv.map((item) => (
							<ItemCard key={item.id} item={item} url={'tv'} styling={'small'} />
						))}
					</div>
				</div>
			) : null }
			{movies.length > 0 ? (
				<div className={classes['wrap-movies']}>
					<div className={classes['category']}>Movies</div>
					<div className={classes['slider']}>
						{movies.map((item) => (
							<ItemCard key={item.id} item={item} url={'movie'} styling={'small'} />
						))}
					</div>
				</div>
			) : null }
		</div>
	)
}

export default Person