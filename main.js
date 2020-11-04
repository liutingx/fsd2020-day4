//load libraries
const express = require('express')
const handlebars = require('express-handlebars')

//configure port
const PORT = parseInt(process.argv[2]) || parseInt(process.env.PORT) || 3000

//create instance
const app = express()

//setup handlebars
app.engine('hbs',
    handlebars({defaultLayout: 'default.hbs'})
)

app.set('view engine','hbs')

//configure express to parse the payload for application/x-www-form-urlencoded, application/json
//only applicable for POST
//converts input to json, form data is in req.body
app.use(express.urlencoded({extended: true}))
//app.use(express.json())

//configure routes
app.post('/register',
    //express.urlencoded({extended: true}) - can be done this way also
    (req, resp) => {
        console.info('body: ', req.body)

        resp.status(201) //201 - created, 202 - accepted
        resp.type('text/html')
        resp.render('response', {
            name: req.body.name,
            date: req.body['available-date']
        })
    })


app.use(express.static(__dirname + '/public'))



//start the server
app.listen(PORT,
    () => {
        console.info(`Application start on PORT ${PORT} at ${new Date}`)
    }
)
