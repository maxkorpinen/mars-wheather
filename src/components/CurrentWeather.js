import React, { Component } from 'react';
import './CurrentWeather.css';

export default class CurrentWeather extends Component {

    render() {
        return (
            <div className="currentcard">
                <h2>Sol {this.props.sol}</h2>
                <p>{this.props.date}</p>
                <p>Latest Observation</p>
                <hr></hr>
                <p><b>Avg. temperature: {this.props.today.temp_avg} °C</b></p>
                <p>Max. temperature: {this.props.today.temp_max} °C</p>
                <p>Min. temperature: {this.props.today.temp_min} °C</p>
                <p><b>Avg. wind speed: {this.props.today.wind_avg} m/s</b></p>
                <p>Max. wind speed: {this.props.today.wind_max} m/s</p>
                <p>Min. wind speed: {this.props.today.wind_min} m/s</p>
            </div>
        )
    }
}
