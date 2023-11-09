require('./models/db')
const jwt = require('jsonwebtoken')
const env = require('dotenv')
env.config()
const port = process.env.PORT || 4041
const express = require('express');
const morgan = require('morgan')
const path = require('path');
const handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const studentController = require('./controllers/studentController')
const loginController = require('./controllers/loginController')
const bookingController = require('./controllers/bookingController')

const app = express()

//midlewares 
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/login', loginController)
app.use('/student', studentController)
app.use('/item', bookingController)

app.get('/', (req, res) => {
    res.render('./dashboard.hbs');
});

app.set("views", path.join(__dirname, "/views/"));

app.engine("hbs",
    exphbs({
        handlebars: allowInsecurePrototypeAccess(handlebars),
        extname: 'hbs',
        defaultLayout: 'MainLayout',
        layoutsDir: path.join(__dirname,'/views/layouts/') 
    })
);



app.set('view engine', 'hbs')

app.listen(port, (req, res) => console.log(`Server is running at port : ${port}`))