const env = require('dotenv')
env.config()
const uri = process.env.MONGO_URI

const mongoose = require('mongoose')
mongoose.connect(uri, { useNewUrlParser: true, })
    .then(() => console.log('Db connected.'))

mongoose.connection.on('error', err => {
    console.log(`db connection has some error: ${err.message}`)
})

require('./student.model')
require('./item.model')