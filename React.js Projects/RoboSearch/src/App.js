import React, { Component } from 'react';
import 'tachyons';
import './App.css';
import CardList from './components/CardList.js';
import SearchBox from './components/SearchBox.js';


class App extends Component {
  constructor(){
    super()
    this.state={
      robots : [],
      searchfield:''
    }
  }
  componentDidMount(){
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(Response=>Response.json())
    .then(users=>{this.setState({robots:users})})
  }

  onSearch=(event)=>{
    this.setState({ searchfield : event.target.value})
  }
  render(){
    const filteredRobots = this.state.robots.filter(robots=>{
        return robots.name.toLowerCase().includes(this.state.searchfield.toLowerCase());
      })
      if(this.state.robots.length===0){
        return <h1 className='tc'>HANG ON...</h1>
      }else{
        return (
          <div className='tc'>
          <h1 className='f1'>ROBOTS</h1>
          <SearchBox searchChange={this.onSearch}/>
 
          <CardList robots={filteredRobots}/>

          </div>
        );
      }
  
}
}

export default App;
