const express = require('express')
const path = require('path')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geoCode')
console.log(__dirname)

const app = express() 

const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))

app.get('/about',(req,res) => {
    res.render('about',{
        title: 'About creator',
        name:'Saby'
    })
})
app.get('',(req,res) => {
    res.render('index',{
        title: 'Weather',
        name:' Saby'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message:'Help page',
        name:' Saby'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return  res.send({
                error:"Search is mandatory"
            })
      }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if (error){
            return  res.send({
                error: error
            })}
        forecast(latitude, longitude, (error, foreCastData) => {
                if (error) {
                    return  res.send({
                        error: error
                    })
                }
                res.send({
                    forecast:foreCastData,
                    location:location,
                    address: req.query.address
                })
            })
    }) 
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
      return  res.send("Search is mandatory")
    }
    console.log(req.query)
    res.send({
        products:''
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        errorMessage:'Help article not found',
        name:' Saby'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        errorMessage:'Page not found',
        name:' Saby'
    })
})



app.listen(3000, ()=>{
    console.log('Server is up on port 3000')
})