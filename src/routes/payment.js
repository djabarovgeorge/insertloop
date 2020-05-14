const express = require('express');
const path = require('path');
const app = express();
const router = express.Router();
// const db = require('../db/index.js');
// var session = require('express-session')
const payment = require('../helpers/payment.js');
const {check,validationResult} = require('express-validator');



router.get('/',(req,res)=>{
if(req.session.message.UserCache.fullPrice == null){
  if(req.session.message.UserInfo.userType == "student"){
    req.session.message = payment.StudentDiscount(req.session.message);
  }
}
  res.render('payment',{data:req.session.message});
});

router.post('/checkstudentdiscount',(req,res)=>{
  req.session.message.UserCache.openDiscount=true;
  res.render('payment',{data:req.session.message});
});


// router.post('/requirevalidation',(req,res)=>{
//   console.log(req.body);
//   res.render('payment',{data:req.session.message});
// });


//define router
router.post('/requirevalidation', [
  check('nameOnCard', 'Name on Card is required').not().isEmpty(),
  check('cardNumber', 'Card Number is required').not().isEmpty(),
  check('CVC', 'CVC is required').not().isEmpty(),
  check('emonth', 'Expiration month is required').not().isEmpty(),
  check('eyear', 'Expiration Year is required').not().isEmpty(),
], function(req, res, next) { 
    //check validate data
    const result= validationResult(req);
    var errors = result.errors;
    // console.log("errors  --------  " + errors[0].msg);

    for (var key in errors) {
          console.log(errors[key].value);
    }
    errors.forEach(function(error){
      console.log(error.msg); 
        });

    if (!result.isEmpty()) {
    //response validate data to register.ejs
       res.render('payment', {
        errors: errors,
        data:req.session.message
      })
    }
    else {
      //update cart   
      payment.UpdateCartTable(req.session.message);
      
      // console.log(req.session.message.Products.)

      //update products
      //
      // if(true){
      //   res.render('ordermade', {data:req.session.message});
      // }
      // else
      // {
      //   res.render('orderfail', {data:req.session.message});

      // }
    }
  });
    
module.exports = router;

