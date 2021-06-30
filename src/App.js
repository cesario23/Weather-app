import React, { Component } from 'react'
import axios from "axios";
import ShowWeather from './components/showWeather/showWeather'
import ShowLocation from './components/showLocation/showLocation'


export class App extends Component {
state ={
  input: "",
  targetName:"",
  targetCountry: "",
  info: null,
  haveInfo: false,
  errorMessage: "",
  locationArray: [],
}

handleOnChange = (event) =>{
  this.setState ({
    input: event.target.value
  })
};

async componentDidMount (){
  try{
 let allLocation = await axios.get ("http://localhost:8080/api/weather/get-all-location")
 this.setState({
   locationArray: allLocation.data.payload,
 })
  }catch (e){
  this.setState({
    errorMessage: e.response.data.message
  })
  }
}

handleSearchSubmit = async () => {
if (this.state.input.length === 0){
  this.setState({
    errorMessage: "You mush enter a place",
  })
}else {
try{
let result = await axios.get(
  `http://api.openweathermap.org/data/2.5/weather?q=${this.state.input}&appid=`
);
let savedLocation = await axios.post ("http://localhost:8080/api/weather/create-location",{
  city: result.data.name,
  country: result.data.sys.country,
})

this.setState({
  targetName: result.data.name,
  targetCountry: result.data.sys.country,
  info: result.data.main,
  haveInfo: true,
  errorMessage: "",
  locationArray: [
    ...this.state.locationArray,
    savedLocation.data.payload,
  ]
})
}catch (e){
this.setState({
  errorMessage: e.response.data.message,
})
}
}
};

  render() {
    return (
      <div style={{textAlign: "center", marginTop: "8v"}}>
        <h1>Weather App</h1>
      <input 
      onChange={this.handleOnChange} 
      type= "text" 
      value ={this.state.input}
       name ="input"
       />
      <button onClick={this.handleSearchSubmit}>Submit</button> 
      <div>{this.state.errorMessage && this.state.errorMessage}</div> 
      <div>
       <ShowWeather 
       targetName = {this.state.targetName}
       targetCountry = {this.state.targetCountry}
       info = {this.state.info}
       haveInfo ={this.state.haveInfo}
       />
      </div>
      <div>
        <ShowLocation 
        locationArray ={this.state.locationArray}
        />
      </div>
      </div>
    )
  }
}

export default App
