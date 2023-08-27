var express = require("express");
var mongoClient = require("mongodb").MongoClient;
var cors = require("cors");

var connectionString = "mongodb://127.0.0.1:27017";

var app = express();

app.use(cors());

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.get("/getusers", function(req, res){
    mongoClient.connect(connectionString, function(err, clientObject){
        if(!err){
            var dbo = clientObject.db("ishopdb");
            dbo.collection("tblusers").find({}).toArray(function(err, documents){
                if(!err){
                    res.send(documents);
                }
            })
        }
    })
});

app.post("/registeruser", function(req, res){
    mongoClient.connect(connectionString, function(err, clientObject){
        if(!err){
            var dbo = clientObject.db("ishopdb");
            var data = {
                "UserId": req.body.UserId,
                "UserName": req.body.UserName,
                "Password": req.body.Password, 
                "Email": req.body.Email,
                "Mobile": req.body.Mobile
            };
            dbo.collection("tblusers").insertOne(data,function(err, result){
                if(!err){ 
                    console.log("Record Inserted");
                }
            })
        }
    })
});
app.listen(8080);
console.log("Server Started : http://localhost:8080");