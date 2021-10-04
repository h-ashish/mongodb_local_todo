import React from 'react';
import {AppBar, Toolbar, Typography} from '@material-ui/core';
import globalMakeStyles from '../styles/makeStyles';
import {Link} from 'react-router-dom';
export default function Navbar(){

	const classes = globalMakeStyles();

	return(
		<>
		<AppBar position="static">
	        <Toolbar>
	          <Typography variant="h6" className={classes.title}>
	            <Link className={classes.navBarTitle} to='/'>Todo App</Link>
	          </Typography>
	          
	        </Toolbar>
	      </AppBar>
		</>
	)
}