const express = require("express");
const {OAuth2Client} = require("google-auth-library");

require('dotenv').config()

const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

const app = express();
app.use(express.json());

const users = [];

app.post('/api/google-login',async(req,res)=>{
    const {token} = req.body
})