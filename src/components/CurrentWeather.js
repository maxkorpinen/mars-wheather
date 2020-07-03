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
                <p>Avg. temperature: {this.props.today.temp_avg} °C</p>
                <p>Max. temperature: {this.props.today.temp_max} °C</p>
                <p>Min. temperature: {this.props.today.temp_min} °C</p>
                <p>Avg. wind speed: {this.props.today.wind_avg} m/s</p>
                <p>Max. wind speed: {this.props.today.wind_max} m/s</p>
                <p>Min. wind speed: {this.props.today.wind_min} m/s</p>
            </div>
        )
    }
}
