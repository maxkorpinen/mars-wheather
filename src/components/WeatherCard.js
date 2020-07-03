import React, { Component } from 'react';
import './WeatherCard.css';

export default class WeatherCard extends Component {

    componentDidMount() {
        // console.log(props);
    }

    render() {
        return (
            <div className="card">
                <h3>Sol {this.props.data.sol}</h3>
                <hr></hr>
                <p>{this.props.data.temp} °C</p>
                <p>{this.props.data.wind} m/s</p>
            </div>
        )
    }
}
