const express  = require('express')
const bodyParser = require("body-parser");
const app_port = process.env.PORT || 3000;
const app = express()
const path = require('path');
const session = require('express-session')
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+ '/public'));
app.use(express.static("public"));
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))


const url = require('url');   
var querystring = require('querystring');

const db = require('./db/index.js');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));


//Routes
const shoppingcartRoute = require('./routes/shoppingcart.js');
const ReportRoute = require('./routes/Reports');
const paymentRoute = require('./routes/payment.js');


//Middleware - Import routers;

//Middleware - Import routers;
app.use('/shoppingcart', shoppingcartRoute);
app.use('/Reports', ReportRoute);
app.use('/payment', paymentRoute);


app.get('/', (req, res) => {
  res.send('Digital Store SCE');
});


// var datal = [ { cartID: 2,
//   Pname: 'Apple',
//   productAmount: 6,
//   totalPrice: 9,
//   email: 'd@d',
//   PID: '1' },
// { cartID: 2,
//   Pname: 'Grapefruit',
//   productAmount: 2,
//   totalPrice: 2,
//   email: 'd@d',
//   PID: '2' } ]

   
// app.get('/', function(req, res) {
//     req.session.message = datal; 
//     res.redirect("/shoppingcart");
//  });



app.listen(app_port, () => {
  console.log(`app is running. port: ${app_port}`);
});
