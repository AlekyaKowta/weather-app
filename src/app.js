//Geocode 

const geocode = require('./utils/geocode')

const forecast = require('./utils/forecast')

//Handlebars - Template Engine.
const hbs = require('hbs')

const path = require('path')

const express = require('express')

const app = express()

const port = process.env.PORT || 3000

//console.log(path.join(__dirname,'../public'))
// console.log(__dirname)
// console.log(path.join(__dirname,'templates/views'))

//setup static directory to server
app.use(express.static(path.join(__dirname,'../public')))





//Partials path
const partialsPath = path.join(__dirname,'templates/partials')


app.set('view engine', 'hbs')
//Setup views path
app.set('views', path.join(__dirname,'templates/views') )
hbs.registerPartials(partialsPath)

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Weather App',
        name: "AK",
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        name: "AK",
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message: "This is the help page",
        title:"Help",
        name:"AK"
    })
})

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"You have to give an address",
        })
    }

    geocode(req.query.address,(error,{longitude, latitude, location}= {})=>{
        if(error){
            return res.send({error: error})
        }

        forecast(longitude, latitude, (error, forecastData)=>{
            if(error){
                return res.send({error:error})
            }

            res.send({
                forecast: forecastData,
                location: location,
                address: req.query.address
            })

        })
    })

    // res.send({
    //     location: 'Kukatpally',
    //     temparature:35,
    //     forecast: 'It is sunny.',
    //     address: req.query.address,
    // })
})

//Example for learning

app.get('/products', (req,res)=>{
    if(!req.query.search){
        return res.send({
            error:"You must provide a search term",
        })
    }
    res.send({
        products:[],
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        errorMessage:"Help article not found",
        title: "404 Page",
        name:"AK",
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        errorMessage:"404 page not found",
        title: "404 Page",
        name:"AK",
    })
})

app.listen(port,()=>{
    console.log("Server is up on port " + port )
})