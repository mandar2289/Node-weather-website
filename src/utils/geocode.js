const request = require('request')

const geocode = (address, callback) => {
    const geoCodeURL = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoibWFuZGFyMjI4OSIsImEiOiJjandjMHdobWMwbGM1M3ltZ28yMXlldmhxIn0.Sbw-O0PTylJkKbept3GQcg&limit=1'
    request({url: geoCodeURL, json: true}, (error, {body} ={}) => {
        
        if (error) {
                callback('Unable to connect to location app', undefined)
            } else if (body.features.length === 0) {
                callback('No location found', undefined)
                }  else {
                callback(undefined, {
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name
                })
            }
        
        })
}



module.exports = geocode