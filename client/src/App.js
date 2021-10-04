import React,{useState} from 'react';
import './styles/styles.css';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Login from './components/Login';
import TodoList from './components/TodoList';
import CreateTodo from './components/CreateTodo';
import EditTodo from './components/EditTodo';
import Finished from './components/Finished';
import {BrowserRouter, Switch, Route} from 'react-router-dom';

function App() {

  const [editData, setEditData] = useState('');
  const [data, setData] = useState([]);
  const [token, setToken] = useState('');

  return (
    <div className="App">
     <BrowserRouter>
      <Navbar/>
        <Switch>
          <Route exact path='/' component={Register} />
          <Route exact path='/login' render={props=><Login  setToken={setToken}  />} />
          <Route exact path='/todolist' render={props=><TodoList token = {token} setEditData = {setEditData} data={data} setData={setData}  />} />
          <Route exact path='/createtodo' render={props=><CreateTodo  token = {token}  />}/>
          <Route exact path='/edittodo' render={props=><EditTodo editData = {editData} setData={setData} token = {token} />}  />
          <Route exact path='/finishedtasks' render={props=><Finished token = {token} data={data} setData={setData}  />} />
        </Switch>
     </BrowserRouter>
    </div>
  );
}

export default App;
