const path = require('path');
const express = require('express');
const app = express();
const hbs = require('hbs');
const {geocode, geocodeLocation} = require('./utils/geocode');
const forecast = require('./utils/forecast');

const port = process.env.PORT || 3000;

//Define paths for Express config
const publicDirectory = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars view engine and location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static direcotry to serve
app.use(express.static(publicDirectory));


app.get('/', (req, res) => {
    res.render('index', {
        name: 'Diego',
        title: 'Xeneize Weather'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Diego',
        title: 'About'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is a help message',
        title: 'Help',
        name: 'Diego'
    });
});


app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            message: 'You must provide an adress'
        });
    }
    geocodeLocation(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({error});
        }
       
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({error});
            }
            res.send({
                addres: req.query.address,
                location,
                forecast: forecastData
            })
        })
    });
});

app.get('/weatherbutton', (req, res) => {
    geocodeLocation(req.query.longitude, req.query.latitude, (error, location) => {
        if(error) {
            return res.send({error})
        }
        forecast(req.query.latitude, req.query.longitude, (error, forecastData) => {
            res.send({
                forecast: forecastData,
                location
            })
        })
    })
   
//     if(!req.query.latitude && !req.query.longitude) {
//         return res.send({
//             message: 'Something went wrong with the GPS services'
//         });
//     }
//     geocode(req.query.longitude, req.query.latitude, (error, {latitude, longitude, location} = {}) => {
//         if(error) {
//             return res.send({error});
//         }
       
//         forecast(req.query.latitude, req.query.longitude, (error, forecastData) => {
//             if(error) {
//                 return res.send({error});
//             }
//             res.send({
//                 addres: req.query.address,
//                 location,
//                 forecast: forecastData
//             })
//         })
//     });
// });

// app.get('/products', (req, res) => {
//     if(!req.query.search) {
//         return res.send({
//             message: 'You must provide a search criteria'
//         })
//     };
//     console.log(req.query.search);
//     res.send({
//         products: []
//     });
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        message: "Help article not found",
        title: "Error 404",
        name: 'Diego'
    });
});

app.get('*', (req, res) => {
    res.render('error', {
        message: "Page not foud",
        title: "Error 404",
        name: 'Diego'
    });
});


app.listen(port, ()=> {
    console.log("Server is up and running on port 3000");
})

