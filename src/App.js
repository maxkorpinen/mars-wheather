import React, { Component } from 'react';
import './App.css';

import axios from 'axios';

const API_KEY = process.env.REACT_APP_API_KEY;

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sol: '...',
      date: '...',
      background: []
    }
  }


  componentDidMount() {
    // console.log(api_key);

    axios.get(`https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity/?api_key=${API_KEY}`)
      .then(res => {
        this.setState({ date: res.data.photo_manifest.max_date })
        this.setState({ sol: res.data.photo_manifest.max_sol })
      })
      .then(
        axios.get(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/latest_photos/?api_key=${API_KEY}`)
          .then(res => {
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
        </div>
      </div>
    )
  }
}

