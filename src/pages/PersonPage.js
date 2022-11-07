import React, { Fragment } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../utils/useFetch'
import Person from '../components/people/Person'
import Loader from '../components/UI/Loader'
import 'animate.css'

const PersonPage = () => {
	let { id } = useParams()
	const { isLoading, serverError, apiData } = useFetch(`person/${id}`, 1)
	const person = apiData
	return (
		<Fragment>
			{!isLoading ? (
				<div className='animate__animated animate__fadeIn'>
					{person && <Person person={person} credits='' />}
				</div>
			) : (<Loader />)}
			{serverError && <span>Sorry, something went wrong!</span>}
		</Fragment>
	)
}

export default PersonPage