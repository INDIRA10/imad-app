var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');

var config ={
    user: 'indirakrajagopal',
    database: 'indirakrajagopal',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password: process.env.DB_PASSWORD
    
};  

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());


var articleOne = {
    title: 'ARTICLE ONE INDIRA RAJAGOPAL',
    heading: 'Article One',
    date: 'Sept 05,2016',
    content:`
           <p>
                 this is the content for my first article this is the content for my first article
                 this is the content for my first article
              </p>
              <p>
                  
                  this is the content for my first article. this is the content for my first article
                  is the content for my first article
                  
              </p>`

};

function createTemplate(data) {
   var title=data.title;
   var date=data.date;
   var heading=data.heading;
   var content=data.content;
   
   var htmlTemplate=`
 <html>
 <head>
     <title>
         ${title}   
     </title>
     <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <link href ="/ui/style.css" rel="stylesheet"/>
     
 </head>   
 <body>
     <div class= "container">
         <div>
             
           <c href=/>home</c>
              </div>
              <hr/>
              <h3>
                ${heading}
              </h3>
              <div>
                  ${date.toDateString()}
              </div>
              <div>
                 ${content}
                      
              </div>
              </div>
    
    </html>
`;
return htmlTemplate;
}

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash (input,salt) {
 // how do we create hash? 
 var hashed =crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
     return["pbkdf2","10000", salt, hashed.toString('hex')].join ('$');
}
    
app.get('/hash/:input',function (req, res) {
    var hashedString= hash(req.params.input,'this-is-some-random-string');
    res.send(hashedString);
});

aap.post('create user', function (req,res){
    
    var username =req.body.username;
    var password= req.body.password;
        var salt = crypto.get. RandomBytes(128).toString('hex');
    var dbString = hash(password,salt);
    pool.query ('INSERT INTO "user" (username, password) VALUES($1,$2)', [username, dbString], function (err,result){
    
     if (err) {
                   res.status(500).send(err.toString());
                 } else {    
                   res.send('user succesfully created'+ username); 
                 }
            
});
});

app.post ('/login', function (req, res) {
   var username =req.body.username;
    var password= req.body.password; 
    
    pool.query('SELECT * FROM "user" WHERE username = $1', [username],function(err,result){
    
             if(err){
             res.status(500).send(err.toString());
    } else {
        
         if (result.rows.length ===0) {
            res.send (403).send ('username/password is invalid');
         } else {
             // match the password
             var dbString = result.rows[0].password;
          var salt = dbString.split ('$')[2];
          var hashedPassword = hash(Password, salt);//creating a hash based on the  password submitted and the orginal salt
          if (hashedPassword === dbString) {
              res.send('credentials correct');
          }else{
              res.send(403).send('username is invalid') ;
              
            }
              
         }
    
     }
    
     });

});
 
 var counter= 0;
 app.get('/counter',function(req, res){
     counter= counter+1;
      res.send(counter.toString());

  
 });
 var pool = new Pool(config);

app.get('/test-db', function(req, res){
    //make a select request
    // return respone with a requests
    pool.query('SELECT * FROM test', function (err, result){
        if (err) {
                   res.status(500).send(err.toString());
                 } else {    
                   res.send(json.stringify(result.rows)); 
                 }
    });
});

 
app.get('/articles/:articleName', function(req, res) {
    //articleName == article-one
    //articles{articleName} == {} content object for article-one
    //SELECT*FROM article WHERE title = 'article-one'
   
    pool.query("SELECT * FROM article WHERE title = '" + req.params.articleName + "'", function(err, result){
       if (err){
       res.status(500).send(err.toString());
       } else {
           
         if(result.rows.length ===0) {
             res.status(404).send('Article not found');
         } else {
             var articleData = result.rows[0];
         
           res.send(createTemplate(articleData));  
          } 
    }
            
});
});

app.get("/article-two",function(req, res){
 res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});


app.get("/article-three",function(req, res){
    res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
    });

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});


app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
