import React, { Component } from 'react';
import './App.css';

import axios from 'axios';

import CurrentWeather from './components/CurrentWeather';
import WeatherList from './components/WeatherList';

const API_KEY = process.env.REACT_APP_API_KEY;

// converting fahrenheit to celcius
function ftoc(f) {
  return (f - 32) * 5 / 9
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sol: '...',
      date: '...',
      background: [],
      weather: {},
      today: {
        average_temp: '',
      }
    }
  }

  componentDidMount() {

    axios.get(`https://api.nasa.gov/insight_weather/?api_key=${API_KEY}&feedtype=json&ver=1.0`)
      .then(res => {

        const weather = res.data;
        const sol = weather.sol_keys[6]
        const date = weather[sol].Last_UTC;
        const weather_today = weather[sol];

        //console.log(weather);

        this.setState({ weather: weather })
        this.setState({ sol: sol })
        this.setState({ date: date })
        this.setState({
          today: {
            average_temp: ftoc(weather_today.AT.av)
          }
        })

        //console.log(weather_today.AT.av)
      })
      .then(
        axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos/?api_key=${API_KEY}`)
          .then(res => {
            // console.log(res);
            var imageArray = [];
            res.data.latest_photos.forEach(function (element) {

              if (element.camera.name === 'NAVCAM' || element.camera.name === 'FHAZ') {
                imageArray.push(element.img_src)
              }
            })
            this.setState({ background: imageArray })
          }))
  }

  render() {
    return (
      <div className="App" style={{ backgroundImage: `url(${this.state.background[Math.floor(Math.random() * this.state.background.length)]})` }}>
        <div className="container">
          <div className="title">
            <h1>Mars Weather Station</h1>
            <h2>Location: Elysium Planitia</h2>
            <h2>Latest date: Sol {this.state.sol} ({this.state.date})</h2>
          </div>
          <CurrentWeather sol={this.state.sol} today={this.state.today} />
          <WeatherList weather={this.state.weather} />
        </div>
      </div>
    )
  }
}

