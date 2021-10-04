import {makeStyles} from "@material-ui/core";

const globalMakeStyles = makeStyles({
	title: {
 	   flexGrow: 1,
  	},
  	navBarTitle:{
  		textDecoration:'none',
  		color:'#fff'
  	},
  	navBarStyle:{
  		textDecoration: "none",
  		color: "#000"
  	},
  	todoHeading:{
  		padding:'10px',
  		margin:'10px'
  	},
  	todoGrid:{
  		padding:'10px',
  		margin:'50px 30px 0 30px'
  	},
  	buttonStyles:{
  		margin:'0 20px 0 20px'
  	},
  	createTodoButtonStyles:{
  		margin:'0px 20px 20px 20px'
  	},
  	formGridStyle:{
  		margin:"20px",
  	},
  	formPaperStyle: {
  		padding:"20px"
  	},
  	formTextFieldStyle:{
  		width:"70%",
  		margin:'10px'
  	},

})

export default globalMakeStyles;