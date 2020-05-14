const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();
const db = require('../db/index.js');
const cart = require('../helpers/cart.js');
const session = require('express-session')


router.get('/',(req,res)=>{
  // console.log(fdata);
  // console.log(req.session.message);
  var datap = { 
    Products:
    [ { cartID: 2,
      Pname: 'Apple',
      productAmount: 6,
      totalPrice: 9,
      email: 'd@d',
      PID: '1' },
    { cartID: 2,
      Pname: 'Grapefruit',
      productAmount: 2,
      totalPrice: 2,
      email: 'd@d',
      PID: '2' } ],
      UserInfo:{
      userType:"gosha"}}

    
  var fdata= cart.DateModified(cart.Summery(datap));
  req.session.message = fdata;
  // console.log(req.session.message);

  res.render('shoppingcart',{data:req.session.message});
});

router.post('/topayment',(req,res)=>{
  res.redirect("/payment");
});

router.post('/removeprod',(req,res)=>{
  var lessdata = cart.RemoveProduct(req.session.message, req.body.removeid);
  console.log(lessdata);
  res.render('shoppingcart',{data:lessdata});
});


// var myCallback = function(data) {
//   router.get('/',(req,res)=>{
//     res.render('shoppingcart',{data:data});
//   });
// };
// db.request("SELECT * FROM cart;",myCallback);


module.exports = router;




