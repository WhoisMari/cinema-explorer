import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../utils/useFetch'
import Item from '../components/items/Item'
import Loader from '../components/UI/Loader'
import 'animate.css'

const ItemPage = (props) => {
	let { id } = useParams()
	const { isLoading, serverError, apiData } = useFetch(`${props.url}/${id}`, 1)
	const item = apiData
	return (
		<Fragment>
		{!isLoading ? (
			<div className='animate__animated animate__fadeIn'>
				{item && <Item item={item} url={props.url} />}
			</div>
		) : (<Loader />)}
		{serverError && <span>Sorry, something went wrong!</span>}
		</Fragment>
	)
}

export default ItemPage