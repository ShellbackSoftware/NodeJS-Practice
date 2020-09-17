const path = require('path')
const express = require('express')
const chalk = require('chalk')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Handlebars engine & views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Matt'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Matt'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Matt',
        message: 'Help information'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (geo_error, { latitude, longitude, location } = {}) => {
        if (geo_error) {
            return res.send({
                error: geo_error
            })
        } else {
            forecast(latitude, longitude, (weather_error, { forecast } = {}) => {
                if (weather_error) {
                    return res.send({
                        error: weather_error
                    })
                } else {
                    return res.send({
                        location,
                        forecast,
                        address: req.query.address
                    })
                }
              })
        }
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        errorText: 'Help article not found.',
        name: 'Matt',
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: 'Error 404',
        errorText: 'Page not found',
        name: 'Matt',
    })})

app.listen(port, () => {
    console.log(chalk.green('Server is running on port ' + port))
})