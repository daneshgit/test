import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import User from './components/usercomponent';
import axios from 'axios';

class App extends Component {

constructor(props){
super(props);

 // this.delete=this.delete.bind(this);
}


delete(id){

  console.log(id);
}

componentDidMount(){

axios.get('/api/users').then((res)=>console.log(res));

}


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={() => this.delete("id")} class="btn btn-danger">Delete</button>
      </div>
    );
  }
}

export default App;
