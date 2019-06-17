const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

console.log(__dirname)
const app = express()
// define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')
// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)
// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mandar Pandit'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Mandar Pandit',
        title: 'About me'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        message: 'Help is in process',
        name: 'Mandar Pandit'
    })
})
app.get('/weather', (req, res) => {
    
    if (!req.query.address) {
        
        return res.send({
            error: 'Address is must to have a weather conditions!'})
    }
    console.log(req.query.address)
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({error})
        }
       forecast(latitude , longitude, (error, forecastData) => {
            if (error) {
               return res.send({error})
            }
            
            res.send({
                forecast: forecastData,
                location, 
                address: req.query.address
                
            })
            
            
          })
    })
    
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Mandar Pandit',
        error: 'Help page not found'
        
    })
})
app.get('*',(req, res) => {
    res.render('404', {
        title: 404,
        name: 'Mandar Pandit',
        error: 'Page not found'
    })
})
app.listen(3000, () => {
    console.log('Server is up on port 3000')
})

