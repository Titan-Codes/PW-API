const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.set('views', './views/');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

const url = "https://api.penpencil.xyz";

// my access token dont use uwu
let access_token = "";

app.get("/", (req,res)=>{
    res.render("home")
})

app.post("/", (req,res)=>{
    access_token = req.body.access;
    console.log(access_token)
    // res.redirect("/data")
})

app.get("/:token/data", (req, res) => {
    const aToken = req.params.token;
    let config = {
        headers: {
            authorization: `Bearer ${aToken}`
        },
        params: {
            mode: 1
        }
    }
    axios.get(`${url}/v3/batches/my-batches`, config)
    .then(response => {
        res.send(response.data.data);
    })
});

app.listen(process.env.PORT || 6969, ()=>{
    console.log("Running on port 6969")
})