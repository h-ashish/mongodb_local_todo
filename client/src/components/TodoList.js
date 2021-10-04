import React,{ useEffect} from 'react';
import axios from 'axios';
import {Link, useHistory} from 'react-router-dom';
import globalMakeStyles from '../styles/makeStyles'
import {Typography, ListItem, ListItemText, List, Button, Paper, Grid, Divider, FormControlLabel, Checkbox} from '@material-ui/core';

export default function TodoList({data, setData, setEditData, token}){

	const classes = globalMakeStyles();
	const history = useHistory();

	useEffect(()=>{
		axios.get('/crud',{ 
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

	const taskComplete =(val)=> {
		const finishObj = {finished:"true"}
		axios.put(`/crud/${val._id}`, finishObj,{ 
				withCredentials: true,
				headers: {
					'Authorization': token
				}
			})
		.then((res)=>{
			history.push('/finishedtasks');
		})
		.catch((err)=>{
			console.log(err);
		})
	}

	return(
		<div >
		<Grid align='center' className={classes.todoGrid} >
		<Typography variant="h3" className={classes.todoHeading}> 
			Todo List
		</Typography>
		<div >
			<Link 
                to='/finishedtasks' 
                className={classes.navBarStyle}> 
            <Button 
                className={classes.createTodoButtonStyles} 
                variant="contained" 
                color="primary">
                Finished Tasks
            </Button>
            </Link>

			<Link 
                to='/createtodo' 
                className={classes.navBarStyle}> 
            <Button 
                className={classes.createTodoButtonStyles} 
                variant="contained" 
                color="primary">
                Create Todo
            </Button>
            </Link>
		</div>
		<Paper elevation={5} >
		{!data? 
			<Typography variant="h5" color="secondary" className={classes.todoHeading}> 
			No Todos Created! <br/>
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
						        name="checkbox"
						        color="primary"
						        onChange={()=>{taskComplete(val)}}
						          />
						        }
						        label="Task Complete"/>

		                  	<Link 
		                  		to='/edittodo' 
		                  		className={classes.navBarStyle} 
		                  		onClick={()=>{setEditData(val)}} >
		                  	<Button 
		                  		className={classes.buttonStyles} 
		                  		variant="contained" 
		                  		color="primary">
		                  	Edit</Button>
		                  	</Link>
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