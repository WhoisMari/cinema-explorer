import React from 'react'
import classes from './Loader.module.scss'

const Loader = () => {
	return (
		<div className={classes["loader"]}>
			<div className={classes["loader__filmstrip"]}></div>
			<p className={classes["loader__text"]}>loading</p>
		</div>
	);
};

export default Loader;