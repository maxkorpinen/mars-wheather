import React, { Component } from 'react';
import './WeatherCard.css';

export default class WeatherCard extends Component {

    componentDidMount() {
        // console.log(props);
    }

    render() {
        return (
            <div className="card">
                <h3>Title</h3>
                <p>Text</p>
            </div>
        )
    }
}
