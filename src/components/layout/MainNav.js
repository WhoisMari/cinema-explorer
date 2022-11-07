import React, { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import classes from './MainNav.module.scss'

const MainNav = (props) => {
	const [toggleMovies, setToggleMovies] = useState(false)
	const [toggleTvShows, setToggleTvShows] = useState(false)
	const [toggleLanguages, setToggleLanguages] = useState(false)
	const [toggleRegions, setToggleRegions] = useState(false)
	const dropdownRef = useRef(null)

	return (
		<div className={classes['wrap-nav']}>
			<div
				ref={dropdownRef}
				className={`${classes['nav']} ${classes['wrap-movies-dropdown']}`}
				onClick={() => {
					if (toggleTvShows || toggleLanguages || toggleRegions) {
						setToggleTvShows(false)
						setToggleLanguages(false)
						setToggleRegions(false)
					}
					setToggleMovies(!toggleMovies)
				}}
			>
				Movies
				{toggleMovies === true ? (
					<div className={classes['inside-dropdown']}> 
						<div className={classes['wrap-item']}><NavLink to='/'>Popular</NavLink></div>
						<div className={classes['wrap-item']}><NavLink to='/now-playing'>Now Playing</NavLink></div>
						<div className={classes['wrap-item']}><NavLink to='/top-rated'>Top Rated</NavLink></div>
						<div className={classes['wrap-item']}><NavLink to='/upcoming'>Upcoming</NavLink></div>
					</div>
				) : null}
			</div>
			<div
				className={`${classes['nav']} ${classes['wrap-tv-shows-dropdown']}`}
				onClick={() => {
					if (toggleMovies || toggleLanguages || toggleRegions) {
						setToggleMovies(false)
						setToggleLanguages(false)
						setToggleRegions(false)
					}
					setToggleTvShows(!toggleTvShows)
				}}
			>
				TV Shows
				{toggleTvShows === true ? (
					<div className={classes['inside-dropdown']}> 
						<div className={classes['wrap-item']}><NavLink to='/tv'>Popular</NavLink></div>
						<div className={classes['wrap-item']}><NavLink to='/tv/airing-today'>Airing Today</NavLink></div>
						<div className={classes['wrap-item']}><NavLink to='/tv/on-tv'>On Tv</NavLink></div>
						<div className={classes['wrap-item']}><NavLink to='/tv/top-rated'>Top Rated</NavLink></div>
					</div>
				) : null}
			</div>
			<div>
				<NavLink activeclassname={classes['active']} to='/people'>People</NavLink>
			</div>
			{props.regions ? (
			<div
				className={`${classes['nav']} ${classes['wrap-regions-dropdown']}`}
				onClick={() => {
					if (toggleTvShows || toggleMovies || toggleLanguages) {
						setToggleTvShows(false)
						setToggleMovies(false)
						setToggleLanguages(false)
					}
					setToggleRegions(!toggleRegions)
				}}
			>
				Regions: {localStorage.getItem('region') ? localStorage.getItem('region') : 'US'}
				{toggleRegions === true ? (
					<div className={classes['inside-dropdown']}>
						{props.regions.map((region, index) => (
							<div
								key={index}
								className={classes['wrap-item']}
								onClick={() => props.handleChangeRegion(region.iso_3166_1)}
							>
								<span>{region.english_name}</span>
							</div>
						))}
					</div>
				) : null}
			</div>
			) : null}

			{props.languages ? (
				<div
					className={`${classes['nav']} ${classes['wrap-languages-dropdown']}`}
					onClick={() => {
						if (toggleTvShows || toggleMovies || toggleRegions) {
							setToggleTvShows(false)
							setToggleMovies(false)
							setToggleRegions(false)
						}
						setToggleLanguages(!toggleLanguages)
					}}
				>
				Language: {localStorage.getItem('language') ? localStorage.getItem('language') : 'en'}
				{toggleLanguages === true ? (
					<div className={classes['inside-dropdown']}>
						{props.languages.map((language) => (
							<div
								key={language.tag}
								className={classes['wrap-item']}
								onClick={() => props.handleChangeLanguage(language.tag)}
							>
								{language.name}
							</div>
						))}
					</div>
				) : null}
			</div>
			) : null}

		</div>
	)
}

export default MainNav