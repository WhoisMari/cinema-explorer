import React from 'react'
import Container from 'react-bootstrap/Container'
import MainNav from './MainNav'
import { Link, NavLink } from 'react-router-dom'
import classes from './Header.module.scss'

const Header = (props) => {
	const handleChangeRegion = (region) => {
		localStorage.setItem('region', region)
		window.location.reload()
	}
	const handleChangeLanguage = (language) => {
		localStorage.setItem('language', language)
		window.location.reload()
	}

	return (
		<header>
			<Container>
				<nav className='d-lg-none navbar navbar-expand-lg'>
					<div className='container-fluid'>
						<Link className='navbar-brand' to='/'>Cinema Explorer</Link>
						<button className={`${classes['toggler']} navbar-toggler`} type='button' data-bs-toggle='collapse' data-bs-target='#navbarSupportedContent' aria-controls='navbarSupportedContent' aria-expanded='false' aria-label='Toggle navigation'>
							<span className='navbar-toggler-icon'></span>
						</button>
						<div className='collapse navbar-collapse' id='navbarSupportedContent'>
							<ul className='navbar-nav me-auto mb-2 mb-lg-0'>
								<li className='nav-item dropdown'>
									<span className={`${classes['nav-link']} nav-link dropdown-toggle`} role='button' data-bs-toggle='dropdown' aria-expanded='false'>Movies</span>
									<ul className='dropdown-menu'>
										<li><NavLink className='dropdown-item' to='/'>Popular</NavLink></li>
										<li><NavLink className='dropdown-item' to='/now-playing'>Now Playing</NavLink></li>
										<li><NavLink className='dropdown-item' to='/top-rated'>Top Rated</NavLink></li>
										<li><NavLink className='dropdown-item' to='/upcoming'>Upcoming</NavLink></li>
									</ul>
								</li>
								<li className='nav-item dropdown'>
									<span className={`${classes['nav-link']} nav-link dropdown-toggle`} role='button' data-bs-toggle='dropdown' aria-expanded='false'>TV Shows</span>
									<ul className='dropdown-menu'>
										<li><NavLink className={`${classes['dropdown-item']} dropdown-item`} to='/tv'>Popular</NavLink></li>
										<li><NavLink className='dropdown-item' to='/tv/airing-today'>Airing Today</NavLink></li>
										<li><NavLink className='dropdown-item' to='/tv/on-tv'>On TV</NavLink></li>
										<li><NavLink className='dropdown-item' to='/tv/top-rated'>Top Rated</NavLink></li>
									</ul>
								</li>
								<li className='nav-item'><NavLink className={`${classes['nav-link']} nav-link`} to='/people'>People</NavLink></li>
								<li className='nav-item dropdown'>
									<span className={`${classes['nav-link']} nav-link dropdown-toggle`} role='button' data-bs-toggle='dropdown' aria-expanded='false'>Regions</span>
									<ul className='dropdown-menu'>
										{props.regions.map((region) => (
											<li key={region.iso_3166_1} onClick={() => handleChangeLanguage(region.iso_3166_1)}>
												<span className='dropdown-item'>{region.english_name}</span>
											</li>
										))}
									</ul>
								</li>
								<li className='nav-item dropdown'>
									<span className={`${classes['nav-link']} nav-link dropdown-toggle`} role='button' data-bs-toggle='dropdown' aria-expanded='false'>Languages</span>
									<ul className='dropdown-menu'>
									{props.languages.map((language) => (
										<li key={language.tag} onClick={() => handleChangeLanguage(language.tag)}>
											<span className='dropdown-item'>{language.name}</span>
										</li>
									))}
									</ul>
								</li>
							</ul>
						</div>
					</div>
				</nav>
				<div className={classes['wrap-main-nav']}>
					<div className='row'>
						<div className='col-12'>
							<div className={classes['wrap-header']}>
								<div className={classes['logo']}>
									<Link to='/'>
										Cinema Explorer
									</Link>
								</div>
								<div>
									<MainNav
										regions={props.regions}
										languages={props.languages}
										handleChangeLanguage={handleChangeLanguage}
										handleChangeRegion={handleChangeRegion}
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Container>
		</header>
	)
}

export default Header