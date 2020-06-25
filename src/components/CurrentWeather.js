import React, { Component } from 'react'

export default class CurrentWeather extends Component {

    render() {

        console.log(this.props.today)

        // const weather_today = this.props.weather_today;
        // const average_temp = weather_today.AT;

        // //console.log(average_temp);
        // // console.log(typeof average_temp)

        // // (X°F − 32) × 5/9 = -10°C
        // function ftoc(f) {
        //     return (f - 32) * 5 / 9
        // }

        //const average_temperature = ftoc(weather_today.AT.av)

        return (
            <div>
                <h3>Today</h3>
                <p>Average temperature: {this.props.today.average_temp}</p>
            </div>
        )
    }
}
