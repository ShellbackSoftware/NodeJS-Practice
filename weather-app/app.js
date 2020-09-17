const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const chalk = require('chalk')

const location = process.argv[2]
if (!location) {
    return console.log(chalk.red('A name of a location is required.'))
}

geocode(location, (geo_error, { latitude, longitude, location } = {}) => {
    if (geo_error) {
        return console.log(chalk.red(error))
    } else {
        forecast(latitude, longitude, (weather_error, { forecast } = {}) => {
            if (weather_error) {
                return console.log(chalk.red(weather_error))
            } else {
                console.log(location + '\n' + forecast)
            }
          })
    }
})

