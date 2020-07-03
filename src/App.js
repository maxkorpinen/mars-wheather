import React, { Component } from 'react';
import './App.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faSnowflake, faLeaf, faSeedling } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';

import CurrentWeather from './components/CurrentWeather';
import WeatherList from './components/WeatherList';

const API_KEY = process.env.REACT_APP_API_KEY;

// converting fahrenheit to celcius
function ftoc(f) {
  let c = (f - 32) * 5 / 9
  let rounded = Math.round(c * 10) / 10
  return rounded
}

// rounding upt to one decimal
function rounded(x) {
  return Math.round(x * 10) / 10
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sol: 'loading...',
      date: '...',
      background: [],
      weather: {},
      season: '',
      seasonIcon: '',
      today: {
        temp_avg: '',
        temp_min: '',
        temp_max: '',
        wind_avg: '',
        wind_min: '',
        wind_max: ''
      },
      sol_keys: [],
      weather_past: [
        {
          sol: '',
          temp: '',
          wind: ''
        },
        {
          sol: '',
          temp: '',
          wind: ''
        },
        {
          sol: '',
          temp: '',
          wind: ''
        },
        {
          sol: '',
          temp: '',
          wind: ''
        },
        {
          sol: '',
          temp: '',
          wind: ''
        },
        {
          sol: '',
          temp: '',
          wind: ''
        }
      ]
    }
  }

  componentDidMount() {

    axios.get(`https://api.nasa.gov/insight_weather/?api_key=${API_KEY}&feedtype=json&ver=1.0`)
      .then(res => {
        console.log(res)

        const sol = res.data.sol_keys[6]
        const date = res.data[sol].Last_UTC.slice(0, 10);
        const weather_today = res.data[sol];
        const seasonOriginal = weather_today.Season;
        const season = seasonOriginal.charAt(0).toUpperCase() + seasonOriginal.slice(1);
        const sol_keys = res.data.sol_keys;

        switch (seasonOriginal) {
          case 'summer':
            this.setState({ seasonIcon: faSun })
            break;
          case 'winter':
            this.setState({ seasonIcon: faSnowflake })
            break;
          case 'spring':
            this.setState({ seasonIcon: faSeedling })
            break;
          default:
            this.setState({ seasonIcon: faLeaf })
        }

        this.setState({ weather: '' })
        this.setState({ sol: res.data.sol_keys[6] })
        this.setState({ date: date })
        this.setState({
          today: {
            temp_avg: ftoc(weather_today.AT.av),
            temp_min: ftoc(weather_today.AT.mn),
            temp_max: ftoc(weather_today.AT.mx),
            wind_avg: rounded(weather_today.HWS.av),
            wind_min: rounded(weather_today.HWS.mn),
            wind_max: rounded(weather_today.HWS.mx)
          }
        })
        this.setState({ season: season })
        this.setState({ sol_keys: sol_keys })
        this.setState({
          weather_past: [
            {
              sol: sol_keys[0],
              temp: ftoc(res.data[sol_keys[0]].AT.av),
              wind: rounded(res.data[sol_keys[0]].HWS.av)
            },
            {
              sol: sol_keys[1],
              temp: ftoc(res.data[sol_keys[1]].AT.av),
              wind: rounded(res.data[sol_keys[1]].HWS.av)
            },
            {
              sol: sol_keys[2],
              temp: ftoc(res.data[sol_keys[2]].AT.av),
              wind: rounded(res.data[sol_keys[2]].HWS.av)
            },
            {
              sol: sol_keys[3],
              temp: ftoc(res.data[sol_keys[3]].AT.av),
              wind: rounded(res.data[sol_keys[3]].HWS.av)
            },
            {
              sol: sol_keys[4],
              temp: ftoc(res.data[sol_keys[4]].AT.av),
              wind: rounded(res.data[sol_keys[4]].HWS.av)
            },
            {
              sol: sol_keys[5],
              temp: ftoc(res.data[sol_keys[5]].AT.av),
              wind: rounded(res.data[sol_keys[5]].HWS.av)
            }
          ]
        })
      })

    axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos/?api_key=${API_KEY}`)
      .then(res => {
        console.log(res);
        var imageArray = [];
        res.data.latest_photos.forEach(function (element) {

          if (element.camera.name === 'NAVCAM' || element.camera.name === 'FHAZ') {
            imageArray.push(element.img_src)
          }
        })
        this.setState({ background: imageArray })
      })
  }

  render() {
    return (
      <div className="App" style={{ backgroundImage: `url(${this.state.background[Math.floor(Math.random() * this.state.background.length)]})` }}>
        <div className="container">
          <div className="titlebox">
            <div className="title">
              <h1>Mars Weather Station</h1>
              <h2>Location: Elysium Planitia</h2>
              <h2>Season: {this.state.season} <FontAwesomeIcon icon={this.state.seasonIcon} /></h2>
              <hr></hr>
              <p>NASA’s InSight Mars lander takes continuous weather measurements on the surface of Mars at Elysium Planitia, a flat, smooth plain near Mars’ equator. </p>
            </div>
            <CurrentWeather sol={this.state.sol} date={this.state.date} today={this.state.today} />
          </div>

          <WeatherList weather={this.state.weather_past} />
        </div>
      </div>
    )
  }
}

