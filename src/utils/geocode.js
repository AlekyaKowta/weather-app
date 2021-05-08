const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYWtvd3RhIiwiYSI6ImNrb2NuM3AwazJqenIyb21sYWhjOTRvYXgifQ.oU8jMeLM1oG8q3VVjAvWtQ&limit=1'

    request({url:url, json:true},(error, response)=>{
        if(error){
            callback('Unable to connect to location services', undefined)
        }
        else if(response.body.features.length === 0){
            callback('Unable to find location. Try another search')
        }
        else{
            callback(undefined, {
                longitude: response.body.features[0].center[1],
                latitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name,
            })
        }
    })
}

module.exports = geocode