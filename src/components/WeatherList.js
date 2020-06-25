import React, { Component } from 'react';
import Card from './WeatherCard';

export default class WeatherList extends Component {

    render() {
        // console.log(this.props.weather);
        return (
            <div>
                <p></p>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
                <Card></Card>
            </div>
        )
    }
}
