import React from 'react'
import classes from './Providers.module.scss'

const Providers = (props) => {
	const keys = ['buy', 'flatrate', 'rent', 'free']
	return keys.map((key) => (
		<div key={key} className={classes['providers-container']}>
			{props.providers.hasOwnProperty(key) ? (
				<div className={classes['wrap-provider']}>
					<div className={classes['title']}>{key === 'flatrate' ? 'Stream' : key}</div>
					{props.providers[key].map((provider) => (
						<img
							className={classes['provider']}
							key={provider.provider_id}
							src={`https://image.tmdb.org/t/p/original${provider.logo_path}`}
							alt={provider.provider_name}
						/>
					))}
				</div>
			) : null}
		</div>
	))
}

export default Providers