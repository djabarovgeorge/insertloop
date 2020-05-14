const { Connection, Request, TYPES } = require("tedious");
const async = require("async");

const config = {
  authentication: {
    options: {
      userName: "scemarket", 
      password: "Pmic1234"
    },
    type: "default"
  },
  server: "scemarket.database.windows.net", 
  options: {
    database: "SCEMarket",
    encrypt: true,
    enableArithAbort: true,
    rowCollectionOnRequestCompletion:true,
    trustServerCertificate: true,
  }
};


var connection = new Connection(config);
connection.on('connect', function(err) {
  if(err) {
    console.log(err);
    return;
  }
});

function StudentDiscount(data){
  var fullprice = data.Total;
  return { 
    Products : data.products,
    Total : data.Total * 0.9,
    UserInfo : data.UserInfo,
    UserCache : {
      fullPrice : fullprice,
      openDiscount : false
     }
  };
}

function CardValidation(data){
  if(data.cardName.length != 18 || data.CVC.length!=3 || data.year<20){
    return false 
  }
}

async function UpdateCartTable(data)
{

  for(var i=1; i<data.Products.length; i++)
  {
    const user = await new Promise((resolve, reject) => {
        (function(err, data) {
        if (err) return reject(err);

        var insert =  new Request('INSERT INTO [dbo].[Cart] (cartID, productAmount, totalPrice, cDate, email, PID) VALUES (@cartID, @productAmount, @totalPrice, @cDate, @email, @PID)', 
        function(err, rows, rowCount) {
          if(err)
          throw err;
        });
        insert.addParameter('cartID', TYPES.VarChar, Math.floor(Math.pow(10, 8) + Math.random() * 9 * Math.pow(10, 8)));
        insert.addParameter('productAmount', TYPES.Int, product.productAmount);
        insert.addParameter('totalPrice', TYPES.Float, product.totalPrice);
        insert.addParameter('cDate', TYPES.DateTime, new Date(Date.now()));
        insert.addParameter('email', TYPES.VarChar, product.email);
        insert.addParameter('PID', TYPES.VarChar, product.PID);
        connection.execSql(insert); 
        resolve(user)
        })();
      });
  }
    

}



  // for(var i=1; i<data.Products.length; i++){
  //   callbackClosure( data.Products[i], function(i) {
  //     var insert =  new Request('INSERT INTO [dbo].[Cart] (cartID, productAmount, totalPrice, cDate, email, PID) VALUES (@cartID, @productAmount, @totalPrice, @cDate, @email, @PID)', 
  //     function(err, rows, rowCount) {
  //       if(err)
  //       throw err;
  //     });
  //     insert.addParameter('cartID', TYPES.VarChar, Math.floor(Math.pow(10, 8) + Math.random() * 9 * Math.pow(10, 8)));
  //     insert.addParameter('productAmount', TYPES.Int, Product.productAmount);
  //     insert.addParameter('totalPrice', TYPES.Float, Product.totalPrice);
  //     insert.addParameter('cDate', TYPES.DateTime, new Date(Date.now()));
  //     insert.addParameter('email', TYPES.VarChar, Product.email);
  //     insert.addParameter('PID', TYPES.VarChar, Product.PID);
  //     connection.execSql(insert);  
  //     })();
  // };



// function callbackClosure(i, callback) {
//   return function() {
//     return callback(i);
//   }
// }

// function UpdateCartTableHelpFunc(Product)
var UpdateCartTableHelpFunc = function(Product) 
{

  console.log('1  ..');
  console.log(data.Products[i]);

  console.log('for(var i=1; i<5; i++){  '+Products.PID);

  var insert =  new Request('INSERT INTO [dbo].[Cart] (cartID, productAmount, totalPrice, cDate, email, PID) VALUES (@cartID, @productAmount, @totalPrice, @cDate, @email, @PID)', 
  function(err, rows, rowCount) {
    if(err)
    throw err;
    console.log(err);
  });
    
  insert.addParameter('cartID', TYPES.VarChar, Math.floor(Math.pow(10, 8) + Math.random() * 9 * Math.pow(10, 8)));
  insert.addParameter('productAmount', TYPES.Int, Product.productAmount);
  insert.addParameter('totalPrice', TYPES.Float, Product.totalPrice);
  insert.addParameter('cDate', TYPES.DateTime, new Date(Date.now()));
  insert.addParameter('email', TYPES.VarChar, Product.email);
  insert.addParameter('PID', TYPES.VarChar, Product.PID);
  
  console.log('execSql before    ');
  connection.execSql(insert);
  console.log('execSql after    ');
}




function UpdateProductsTable(data){
}

module.exports = { StudentDiscount, CardValidation, UpdateCartTable, UpdateProductsTable }


// console.log('UpdateCartTable  '+data.Products);




// var insert =  new Request('INSERT INTO [dbo].[Cart] (cartID, productAmount, totalPrice, cDate, email, PID) VALUES (@cartID, @productAmount, @totalPrice, @cDate, @email, @PID)', 
// function(err, rows, rowCount) {
//   if(err)
//   throw err;
  
//   console.log("rows "+rows);
//   console.log("rowCount "+rowCount);


//   // console.log("error  :"+err.message + "\n" + err.stack);
//   // res.json(ret);
// });
// insert.addParameter('cartID', TYPES.VarChar, Math.floor(Math.pow(10, 8) + Math.random() * 9 * Math.pow(10, 8)));
// insert.addParameter('productAmount', TYPES.Int,   data.Products[0].productAmount);
// insert.addParameter('totalPrice', TYPES.Float,   data.Products[0].totalPrice);
// insert.addParameter('cDate', TYPES.DateTime, new Date(Date.now()));
// insert.addParameter('email', TYPES.VarChar,   data.Products[0].email);
// insert.addParameter('PID', TYPES.VarChar,   data.Products[0].PID);

// connection.execSql(insert);








// async.each(data.Products, function(product, callback) {
  
//   // Perform operation on file here.
//   var insert =  new Request('INSERT INTO [dbo].[Cart] (cartID, productAmount, totalPrice, cDate, email, PID) VALUES (@cartID, @productAmount, @totalPrice, @cDate, @email, @PID)', 
//   function(err, rows, rowCount) {
//     if(err)
//     throw err;
//   });
//   insert.addParameter('cartID', TYPES.VarChar, Math.floor(Math.pow(10, 8) + Math.random() * 9 * Math.pow(10, 8)));
//   insert.addParameter('productAmount', TYPES.Int, product.productAmount);
//   insert.addParameter('totalPrice', TYPES.Float, product.totalPrice);
//   insert.addParameter('cDate', TYPES.DateTime, new Date(Date.now()));
//   insert.addParameter('email', TYPES.VarChar, product.email);
//   insert.addParameter('PID', TYPES.VarChar, product.PID);
// //   connection.execSql(insert);  


//   // if( file.length > 32 ) {
//   //   console.log('This file name is too long');
//   //   callback('File name too long');
//   // } else {
//     // Do work to process file here
//     console.log('File processed');
//     callback();
//   // }
// }, function(err) {
//   // if any of the file processing produced an error, err would equal that error
//   if( err ) {
//     // One of the iterations produced an error.
//     // All processing will now stop.
//     console.log('A file failed to process');
//   } else {
//     console.log('All files have been processed successfully');
//   }
// });