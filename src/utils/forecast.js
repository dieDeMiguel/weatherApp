const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/1c53a89ca54b8b02331541394b638d5a/'+latitude+','+longitude+'?lang=en&si';
    request({url, json: true}, (error, {body})=> {
        if(error) {
            callback('Unable to conect with weather services', undefined);
        } else if (body.error){
            callback({
                error: body.code,
                message:  body.error
            }, undefined);
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out, there is a ' + body.currently.precipProbability + '% chance of rain');
        }
    })
}

module.exports = forecast;