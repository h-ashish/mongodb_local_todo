import React, {useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import globalMakeStyles from '../styles/makeStyles';
import {TextField, Grid, Paper, Typography, Button, } from '@material-ui/core';

export default function CreateTodo({token}){

	const history = useHistory();
	const classes = globalMakeStyles();
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const Obj = {title, description}

	const saveTodo = (e)=>{
		e.preventDefault();
		let titleBox = e.target.title;
		let detailsBox = e.target.description;

		if(titleBox.value === "" || detailsBox.value === ""){
			alert('Enter Details!')
			titleBox.focus();
		} else {
			axios.post('/crud', Obj, { 
				withCredentials: true,
				headers: {
					'Authorization': token
				}
			})
			.then((res)=>{
				alert("Todo Created!!");
				history.push('/todolist')
			})
			.catch((err)=>{
				console.log(err);
			})
		}
		
	}

	return(
		<div> 
			<Grid align="center" className={classes.todoGrid}>
			<Typography variant="h3" className={classes.todoHeading}> 
				Create Todo
			</Typography>
			<Paper elevation={5} className={classes.formPaperStyle} >
			<form onSubmit={saveTodo} noValidate autoComplete="off" >

		        <TextField 
		        	required
		      	  	id="outlined-basic" 
		      	  	label="Todo Title" 
		      	  	name="title"
		      	  	variant="outlined" 
		      	  	onInput={e=>setTitle(e.target.value)}
		      	  	className={classes.formTextFieldStyle}/><br/>

		        <TextField 
		        	required
		      	 	id="outlined-basic" 
		      	  	label="Todo Details"
		      	  	name="description" 
		      	  	variant="outlined" 
		      	  	onInput={e=>setDescription(e.target.value)}
		      	  	className={classes.formTextFieldStyle}/><br/>

		      	

		      	<Button 
		      		type="submit"
			      	className={classes.buttonStyles} 
			      	variant="contained" 
			      	color="primary">
			      	Save Todo</Button>
			    <Button 
			      	className={classes.buttonStyles} 
			      	variant="contained" 
			      	color="secondary"
			      	onClick={()=>history.push('/')}>
			      	Cancel</Button>
		    </form>
		    </Paper>
		    </Grid>
		</div>
	)
}