import React, { Component } from 'react';
import Card from './WeatherCard';
import './WeatherList.css';

export default class WeatherList extends Component {

    render() {
        return (
            <div className="weatherList">
                <Card data={this.props.weather[0]}></Card>
                <Card data={this.props.weather[1]}></Card>
                <Card data={this.props.weather[2]}></Card>
                <Card data={this.props.weather[3]}></Card>
                <Card data={this.props.weather[4]}></Card>
                <Card data={this.props.weather[5]}></Card>
            </div>
        )
    }
}
