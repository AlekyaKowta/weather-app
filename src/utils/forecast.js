const { builtinModules } = require('module')
const request = require('request')

const forecast = (longitude, latitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=30dd9b017e638d56366ec2bc3f951517&query='+ longitude +','+ latitude + '&units=m'

    request({url:url, json:true}, (error, response)=>{
        if(error){
            callback("Unable to connect", undefined)
        }
        else if(response.body.error){
            callback("Unable to find location")
        }
        else{
            callback(undefined, response.body.current.weather_descriptions[0] + ". It is currently "+ response.body.current.temperature + ". It feels like " + response.body.current.feelslike)
        }
    })
}


module.exports = forecast