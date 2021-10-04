import React, {useState} from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import globalUseStyles from '../styles/makeStyles';
import {Grid, Paper, TextField, Button, Typography } from '@material-ui/core';

function Login(){

    const classes = globalUseStyles();
    let history = useHistory();
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(false);
    let Obj = {username, email, password}
    const onLogin = (e) =>{
        e.preventDefault();
        let nameVal = e.target.username.value;
        let emailVal = e.target.email.value;
        let passwordVal = e.target.password.value;

        if(nameVal === "" || emailVal === "" || passwordVal === ""){
            setErrors(!errors);
            e.target.username.focus();
        } else {
            setErrors(false);
            axios.post('/crud/auth/register',Obj)
            .then((res)=>{
                // console.log(res.data);
                history.push('/login');
            })
            .catch((err)=>{
                alert('Invalid Credentials');
                nameVal = '';
                emailVal ='';
                passwordVal ='';
                e.target.username.focus();
            })
        }
        
    }
    
    return(
        <>
            <Grid align='center' className={classes.formPaperStyle}>

                <Typography variant="h3" fontWeight='bold' className={classes.todoHeading}>
                    Welcome to Crud App
                </Typography>

                <Paper elevation={5} className={classes.formPaperStyle}>
                    <form onSubmit={onLogin} noValidate autoComplete="off">

                        <TextField 
                        id="outlined-basic-1" 
                        label="Name" 
                        variant="outlined" 
                        type="text"
                        name="username"
                        onInput={e=>setUsername(e.target.value)}
                        error = {errors}
                        helperText = {errors?'Name is required':''}
                        className={classes.formTextFieldStyle}/><br/>

                        <TextField 
                        id="outlined-basic-2" 
                        label="Email ID" 
                        variant="outlined" 
                        type="email"
                        name="email"
                        onInput={e=>setEmail(e.target.value)}
                        error = {errors}
                        helperText = {errors?'Email is required':''}
                        className={classes.formTextFieldStyle}/><br/>

                        <TextField 
                        id="outlined-basic-3" 
                        label="Password" 
                        variant="outlined" 
                        type="password"
                        name="password"
                        onInput={e=>setPassword(e.target.value)}
                        error = {errors}
                        helperText = {errors?'Password is required':''}
                        className={classes.formTextFieldStyle} /><br/>

                        <Button 
                        type="submit"
                        variant="contained" 
                        color="primary"
                        className={classes.buttonStyles} >
                        Create Account
                        </Button>

                        <Link 
                            to='/login' 
                            className={classes.navBarStyle}> 
                        <Button 
                            className={classes.buttonStyles} 
                            variant="contained" 
                            color="primary">
                        Already have an account? Log In</Button>
                        </Link>

                    </form>
                </Paper>
            </Grid>   
        </>
    )
}
export default Login;