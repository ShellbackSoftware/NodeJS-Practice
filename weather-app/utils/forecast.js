const request = require('request')
const config = require('./config.js')

const forecast = (lat, lon, callback) => {
    const url = config.weatherurl + "current?access_key=" + config.weatherkey + "&query=" + lat + "," + lon + "&units=f"

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            // Leaving second option blank results in undefined data
            callback('Unable to connect to weather services.')
        } else if (body.error) {
            callback('Unable to find weather information for the given location. Try another search.')
        } else {
            const cur = body.current
            callback(undefined, {
                forecast: cur.weather_descriptions[0] + ". It is currently " + cur.temperature + " degrees out. It feels like " + cur.feelslike + " degrees out."
            })
        }
    })
}

module.exports = forecast