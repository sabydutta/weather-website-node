const request = require('request')

const geocode = (address,callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiZHV0dGFzYWJ5IiwiYSI6ImNrbGd6cDZ2YTBlazEycm4yYnVscjVwczUifQ.vCEbBZRcuy1at2tyCucREA'
    request({url,json:true},(error,{body}) =>{
        if(error){
        callback('service unavilable',undefined)}
        else if(body.features.length===0){
            callback('Nothing found',undefined)
        }
        else(
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        )
    }

    )
}

module.exports = geocode