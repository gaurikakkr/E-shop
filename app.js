const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongose = require('mongoose');
const cors = require('cors');

require('dotenv/config');
const authJwt = require('./helpers/jwt'); 



app.use(cors());
app.options('*', cors())



//midleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(authJwt());

//routers
const categoriesRoutes = require('./routers/category');
const productsRouter = require('./routers/product');
const usersRoutes = require('./routers/user');
const ordersRoutes = require('./routers/order');

const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRouter);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);



//Database
mongose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'eshop-database'
})
.then(()=>{
    console.log('Database Connection is ready...')
})
.catch((err)=> {
    console.log(err);
})


app.listen(3000, ()=>{

    console.log('server is running http://localhost:3000');
})
