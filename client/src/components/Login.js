import React, {useState} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import globalUseStyles from '../styles/makeStyles';
import {Grid, Paper, TextField, Button, Typography } from '@material-ui/core';

function Login({setToken}){

    const classes = globalUseStyles();
    let history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState(false);
    let Obj = {email, password}
    
    const onLogin = (e) =>{
        e.preventDefault();
        let emailVal = e.target.email.value;
        let passwordVal = e.target.password.value;

        if(emailVal === "" && passwordVal === ""){
            setErrors(!errors);
            e.target.email.focus();
        } else {
            setErrors(false);
            axios.post('/crud/auth/login',Obj)
            .then((res)=>{
                setToken(res.data.token);
                history.push('/todolist');
            })
            .catch((err)=>{
                alert('Invalid Credentials');
                emailVal ='';
                passwordVal ='';
                e.target.email.focus();
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
                        Login
                        </Button>

                        <Button 
                        className={classes.buttonStyles} 
                        variant="contained" 
                        color="secondary"
                        onClick={()=>history.push('/')}>
                        Cancel
                        </Button>

                    </form>
                </Paper>
            </Grid>   
        </>
    )
}
export default Login;