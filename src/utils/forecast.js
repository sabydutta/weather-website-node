
const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=14580d0a26ca1f7bf31f0634aa789a2d&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude) + '&units=m'
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Service unavialable', undefined)
        }
        else if (body.error) {
            callback('Error : ' + response.body.error.info)
        }
        else {
           callback(undefined, body.current.weather_descriptions[0] + ". It is currently : " + body.current.temperature + ". It feels like : " + body.current.feelslike)
        }
    }


    )
}


module.exports = forecast