const express = require('express')
const { categoryRouter } = require('./router/categoryRouter')
const { projectRouter } = require('./router/projectsRouter')
const { imagesRouter } = require('./router/imagesRouter')
require('dotenv').config('./config/.env')
const cors = require('cors')
const jsonServer = require('json-server')

const router = jsonServer.router( 'db.json')
const middlewares = jsonServer.defaults()

 
const app = express()
const port = process.env.PORT || 8000


app.use(cors())
app.use(express.json())
app.use(middlewares)




app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});


app.use('/api/category',categoryRouter)
app.use('/api/project',projectRouter) 

// "63d281d9e809dd54b0c4b9be"

// allow cross-origin requests
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", 
      "Origin, X-Requested-With, Content-Type, Accept");

    next();
  });


app.use('/api/imagekit',imagesRouter)

// JSON server
app.use('/api/v3',router)
 


app.listen(port, ()=>console.log(`listening on port ${port}`)
)