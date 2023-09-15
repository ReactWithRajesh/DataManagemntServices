require('./models/db')
const jwt = require('jsonwebtoken')
const env = require('dotenv')
env.config()
const port = process.env.PORT || 4041
const express = require('express');
const path = require('path');
const handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const studentController = require('./controllers/studentController')

const app = express()

//get token by login


//midlewares 
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/student', studentController)

app.get('/', (req, res) => {
    res.send(`
    <h1>Welcome to server</h1>
    <h3>click here to get access to the <b> <a href="/student/list">Database</a></h3>
`)
})

app.set("views", path.join(__dirname, "/views/"));

app.engine("hbs",
    exphbs({
        handlebars: allowInsecurePrototypeAccess(handlebars),
        extname: 'hbs',
        defaultLayout: 'MainLayout',
        layoutsDir: __dirname + '/views/layouts/'
    })
);



app.set('view engine', 'hbs')

app.listen(port, (req, res) => console.log(`Server is running at port : ${port}`))