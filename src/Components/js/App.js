import React, {Component} from 'react';
import TaskForm from './Form';
import logo from '../logo.svg';
import '../css/App.css';


class App extends Component {
  submit(){
    console.log("submit")
  }
  render(){
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <TaskForm />
      </div>
    )
  }
}
export default App;