import React from 'react'
import { Link } from 'react-router-dom'
import config from '../../utils/config.json'
import classes from './ItemCard.module.scss'

const ItemCard = (props) => {
	const { item } = props
	return (
		<Link
			to={`/${props.url}/${item.id}`}
			className={`${classes['item-card']} ${props.styling === 'small' ? classes['small-card'] : classes['default-card']}`}
		>
			<img
				className={classes['item-img']}
				src={item.poster_path ? (`${config.image_api_url}/${item.poster_path}`) : 'https://t4.ftcdn.net/jpg/04/00/24/31/360_F_400243185_BOxON3h9avMUX10RsDkt3pJ8iQx72kS3.jpg'}
				alt={item.title ? item.title : item.name}
			/>
			<div className={classes['item-vote']}>
				<div className='text-center text-amber-500 p-2'>Rate: {Math.round(item.vote_average * 10) / 10}</div>
			</div>
		</Link>
	)
}

export default ItemCard