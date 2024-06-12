
require("dotenv").config();
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const https = require('https');

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function (req, res) {
res.sendFile(__dirname + "/index.html")

});

app.post("/", function (req, res) {

const firstname = req.body.Fname;
const lastname = req.body.Lname;
const email = req.body.Email;


const data = {
  members: [{
    email_address: email,
    status: "subscribed",
    merge_fields:{
    FNAME: firstname,
    LNAME: lastname,
    }
  }]
}

const jsonData = JSON.stringify(data);
console.log(jsonData);

const url =process.env.URL;
const options = {

    method: "POST",
    headers:{
    authorization:process.env.AUTHORIZATION
    }

}

const request = https.request(url, options, function (response) {
  response.on("data", function (data) {
console.log(JSON.parse(data));
  })

})
request.write(jsonData);
request.end();
});



app.listen(port, function () { console.log("server is running on port 3000");

});

