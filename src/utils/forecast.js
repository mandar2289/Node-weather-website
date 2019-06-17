const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'https://api.darksky.net/forecast/8ab518cc78512f62ab2c7a9453dfca96/'+ longitude + ',' + latitude +'?units=si'
    request({url, json:true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to forecast service', undefined)
        } else if (body.error) {
            callback('Invalid location!', undefined)
        } else {
            callback(undefined, 'Current temp is: '+ body.currently.temperature + ', Current weather is: ' + body.currently.summary + ', rain chance: '  + body.currently.precipProbability
            )
        }
    })
}

module.exports = forecast