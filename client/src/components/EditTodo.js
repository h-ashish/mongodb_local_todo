import React, {useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import globalMakeStyles from '../styles/makeStyles';
import {TextField, Grid, Paper, Typography, Button} from '@material-ui/core';

export default function EditTodo({setData, editData, token}){

	const history = useHistory();
	const classes = globalMakeStyles();
	const [title, setTitle] = useState(editData.title);
	const [description, setDescription] = useState(editData.description);


	const editObj = {title, description};

	const updateTodo = (e)=>{
		e.preventDefault();
		axios.put(`/crud/${editData._id}`, editObj,{ 
				withCredentials: true,
				headers: {
					'Authorization': token
				}
			})
		.then((res)=>{
			alert('Edited todo saved!');
			history.push('/todolist');
		})
		.catch((err)=>{
			console.log(err);
		})
	}

	return(
		<div> 
			<Grid align="center" className={classes.todoGrid}>
			<Typography variant="h3" className={classes.todoHeading}> 
				Edit Todo
			</Typography>
			<Paper elevation={5} className={classes.formPaperStyle} >
			<form onSubmit={updateTodo} noValidate autoComplete="off" >

		        <TextField 
		        	required
		      	  	id="outlined-basic" 
		      	  	label="Todo Title" 
		      	  	name="todoTitle"
		      	  	variant="outlined"
		      	  	value = {title} 
		      	  	onInput={e=>{setTitle(e.target.value)}}
		      	  	className={classes.formTextFieldStyle}/><br/>

		        <TextField 
		        	required
		      	 	id="outlined-basic" 
		      	  	label="Todo Details"
		      	  	name="todoDetails" 
		      	  	variant="outlined"
		      	  	value = {description} 
		      	  	onInput={e=>{setDescription(e.target.value)}}
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
			      	onClick={()=>history.push('/todolist')}>
			      	Cancel</Button>
		    </form>
		    </Paper>
		    </Grid>
		</div>
	)
}