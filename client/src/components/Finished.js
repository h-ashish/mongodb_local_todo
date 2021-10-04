import React,{ useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import globalMakeStyles from '../styles/makeStyles'
import {Typography, ListItem, ListItemText, List, Button, Paper, Grid, Divider, FormControlLabel, Checkbox} from '@material-ui/core';

export default function TodoList({data, setData, token}){

	const classes = globalMakeStyles();

	useEffect(()=>{
		axios.get('/crud/finished',{ 
			withCredentials: true,
			headers: {
				'Authorization': token
			} 
		})
		.then((res)=>{
			setData(res.data.todos);
		})
		.catch((err)=>{
			console.log(err)
		})
		// eslint-disable-next-line react-hooks/exhaustive-deps
	},[])

	const removeTodo = (idToRemove)=>{
		axios.delete(`/crud/${idToRemove}`)
		.then((res)=>{
			const newData = data.filter(todo=>todo._id !== idToRemove)
			setData(newData)
		})
		.catch((err)=>{
			console.log(err)
		})
	}

	return(
		<div >
		<Grid align='center' className={classes.todoGrid} >
		<Typography variant="h3" className={classes.todoHeading}> 
			Finished Tasks
		</Typography>
		<div >
			<Link 
                to='/todolist' 
                className={classes.navBarStyle}> 
            <Button 
                className={classes.createTodoButtonStyles} 
                variant="contained" 
                color="primary">
                Go Back
            </Button>
            </Link>

		</div>
		<Paper elevation={5} >
		{!data? 
			<Typography variant="h5" color="secondary" className={classes.todoHeading}> 
			No finished Tasks yet! <br/>
			</Typography> :	data.map((val)=>{
				return(
					<div key={val._id}>
					<List color="default">
		                <ListItem>
		                  	<ListItemText
			                    primary={val.title}
			                    secondary={val.description} />
		                  	
		                  	<FormControlLabel
						        control={
						    <Checkbox
						    	checked = {val.finished}
						        name="checkbox"
						        color="primary"
						          />
						        }
						        label="Task Complete"/>

		                  	<Button 
		                  		variant="contained" 
		                  		color="secondary"
		                  		onClick={()=>{removeTodo(val._id)}}>
		                  	Delete</Button>
		                </ListItem>
		            </List>
		            <Divider/>
		            </div>
				)
			})
		}

        </Paper>
        
        </Grid>
        </div>
	)
}