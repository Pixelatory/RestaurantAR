const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');
const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');
var adminApp = admin.initializeApp({
  credential: admin.credential.applicationDefault()
});
 
// parse application/json
app.use(bodyParser.json());
 
//create database connection
const conn = mysql.createConnection({
  host: 'db-mysql-tor1-14378-do-user-8706009-0.b.db.ondigitalocean.com',
  port: 25060,
  user: 'doadmin',
  password: 'ego4xs2nlweu5zjl',
  database: 'restaurantar'
});
 
//connect to database
conn.connect((err) =>{
  if(err) throw err;
  console.log('Mysql Connected...');
});

//testing verification
app.get('/api/verificationTest',(req, res) => {
  admin
  .auth()
  .verifyIdToken(req.query.id)
  .then((decodedToken) => {
    res.send(decodedToken.uid);
    // ...
  }).catch((error) => {
    // Handle error
    res.send(error);
  });
});

// add new review
app.post('/api/reviews', (req, res) => {
  // First authenticate
  admin
  .auth()
  .verifyIdToken(req.body.uid)
  .then((decodedToken) => {
    // Authentication complete, check Users table for entry
    let sql1 = "SELECT * FROM Users WHERE uid='" + decodedToken.uid+"'";
    let query1 = conn.query(sql1, (err, results) => {
      if(err) throw err;
      // Users does not have this uid, so add it for review foreign key constraint
      let userId = 0;
      if (results.length == 0) {
        let data3 = [[req.body.user_full_name, decodedToken.uid]];
        let sql3 = "INSERT INTO Users (user_full_name, uid) VALUES ?";
        userId = conn.query(sql3, [data3], (err3, results3) => {
          if(err3) throw err3;
          return results3.insertId;
        });
      } else if (results.length == 1) { // Users has this uid
        userId = results[0].user_id;
      }

      if (results.length == 1 || results.length == 0) {
        let needsUpdate = conn.query("SELECT * FROM Reviews WHERE user_id="+userId+" AND dish_id="+req.body.dish_id, (err4, results4) => {
          if(err4) throw err4;
          if(results4.length == 1) {
            return true;
          }
          return false;
        });
        
        if (needsUpdate == false) {
          let data5 = [[userId,
                        req.body.dish_id, 
                        req.body.review_date, 
                        req.body.review_rating, 
                        req.body.review_comment]];
          let sql5 = "INSERT INTO Reviews (user_id,dish_id,review_date,review_rating,review_comment) VALUES ?";
          let query5 = conn.query(sql5, [data5], (err5, results5) => {
            if(err5) throw err5;
            res.send(JSON.stringify({"status": 200, "error": null, "response": results5}));
          });
        } else {
          let data6 = [req.body.review_date,
                       Number(req.body.review_rating),
                       req.body.review_comment,
                       userId,
                       Number(req.body.dish_id)];
          let sql6 = "UPDATE Reviews SET review_date=?, review_rating=?, review_comment=? WHERE user_id=? AND dish_id=?";
          conn.query(sql6, data6, (err6, results6) => {
            if(err6) throw err6;
            res.send(JSON.stringify({"status": 200, "error": null, "response": results6}));
          });
        }
      }
    });
  }).catch((error) => {
    res.send(error);
  });
});

// show all users
app.get('/api/users',(req, res) => {
  let sql = "SELECT * FROM Users";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    //res.send(JSON.stringify({"status": 200, "error": null, "response": results.user_full_name}));
    res.send(results.length.toString());
  });
});

// show all dishes
app.get('/api/dishes/', (req, res) => {
  let sql = "SELECT * FROM Dishes";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

// show all reviews
app.get('/api/reviews/', (req, res) => {
  let sql = "SELECT * FROM Reviews";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

// show reviews based on dish ID
app.get('/api/reviews/:id', (req, res) => {
  var resp;
  var stars = [];

  let sql = "SELECT u1.user_full_name,date_format(r1.review_date,'%d/%m/%Y') as review_date,r1.review_rating,r1.review_comment FROM Reviews r1, Users u1 WHERE r1.dish_id="+req.params.id+" AND r1.user_id=u1.user_id ORDER BY review_date DESC LIMIT 20";
  conn.query(sql, (err, results) => {
    if(err) throw err;
    resp = results;
    
    for(let i=0; i < 5; i++) {
      let sql2 = "SELECT COUNT(*) AS c FROM Reviews WHERE dish_id="+req.params.id+" AND review_rating='"+i+"'";
      conn.query(sql2, (err, results) => {
        if(err) throw err;
        stars.push(results[0].c);
        if(i == 4) {
          let sql3 = "SELECT dish_description, dish_name, dish_model FROM Dishes WHERE dish_id="+req.params.id;
          conn.query(sql3, (err, results) => {
            if(err) throw err;
            res.send(JSON.stringify({"status": 200, "error": null, "response": resp, "stars": stars, "desc": results[0].dish_description, "name": results[0].dish_name, "model": results[0].dish_model}));
          });
        }
      });
    }
  });
});

// show all categories
app.get('/api/categories/', (req, res) => {
  let sql = "SELECT * FROM Categories";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

// show main info page
app.get('/', (req, res) => {res.send(`<h1>The RestaurauntAR API</h1> 
<p>Use /api/users/ to see users</p>
<p>Use /api/dishes/ to see dishes</p>
<p>Use /api/reviews/ to see reviews</p>
<p>Use /api/categories/ to see dish categories</p>`)});

//TODO: cleanup models, adding link in dishes page and then generalizing here
// get cheeseburger model
app.get('/models/cheeseburger/', (req, res) => {
  res.download(path.resolve("./models/cheeseburger.zip"));
});

// get fish model
app.get('/models/fish/', (req, res) => {
  res.download(path.resolve("./models/fish.zip"));
});

// get jalapeno model
app.get('/models/jalapeno', (req, res) => {
  res.download(path.resolve("./models/jalapeno.zip"));
});

//show single user
app.get('/api/users/:id',(req, res) => {
  let sql = "SELECT * FROM Users WHERE user_id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//add new product
app.post('/api/products',(req, res) => {
  let data = {product_name: req.body.product_name, product_price: req.body.product_price};
  let sql = "INSERT INTO product SET ?";
  let query = conn.query(sql, data,(err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//update product
app.put('/api/products/:id',(req, res) => {
  let sql = "UPDATE product SET product_name='"+req.body.product_name+"', product_price='"+req.body.product_price+"' WHERE product_id="+req.params.id;
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//Delete product
app.delete('/api/products/:id',(req, res) => {
  let sql = "DELETE FROM product WHERE product_id="+req.params.id+"";
  let query = conn.query(sql, (err, results) => {
    if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});
 
//Server listening
app.listen(57812,() =>{
  console.log('Server started on port 3000...');
});

