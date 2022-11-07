import React from 'react'
import config from '../../utils/config.json'
import { Link } from 'react-router-dom'
import classes from './PersonCard.module.scss'

const PersonCard = (props) => {
	const person = props.person
	return (
		<Link
			to={`/people/${person.id}`}
			className={`${classes['wrap-person-card']} ${props.styling === 'small' ? classes['small-card'] : classes['default-card']}`}
		>
			<img
				className={classes['person-img']}
				src={person.profile_path ? `${config.image_api_url}/${person.profile_path}` : 'https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg'}
				alt={person.name}
			/>
			<div className={classes['person-info']}>
				<div className={classes['name']}>{person.name}</div>
				<div>{person.character ? person.character : null}</div>
			</div>
		</Link>
	)
}

export default PersonCard