const request = require('request')
const config = require('./config.js')

const geocode = (address, callback) => {
    const url = config.mapurl + encodeURIComponent(address) + ".json?access_token=" + config.mapkey + "&limit=1"

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            // Leaving second option blank results in undefined data
            callback('Unable to connect to location services.')
        } else if (body.features.length == 0) {
            callback('Unable to find location. Try another search.')
        } else {
            const info = body.features[0]
            callback(undefined, {
                latitude: info.center[1],
                longitude: info.center[0],
                location: info.place_name
            })
        }
    })
}

module.exports = geocode