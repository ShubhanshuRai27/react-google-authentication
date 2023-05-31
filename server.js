const express = require("express");
const {OAuth2Client} = require("google-auth-library");

require('dotenv').config()

const client = new OAuth2Client(process.env.REACT_APP_GOOGLE_CLIENT_ID);

const app = express();
app.use(express.json());

const users = [];

function updateInsert(arr,item) {
    const i  = arr.findIndex((_item) => _item.email === item.email);
    if(i > -1) arr[i] = item;
    else arr.push(item);
}

app.post('/api/google-login',async(req,res)=>{
    const {token} = req.body
    const ticket = await client.verifyIdToken({
        idToken : token,
        audience : process.env.CLIENT_ID
    })
    const {name, email, picture} = ticket.getPayload();
    updateInsert(users, {name, email, picture});
    res.status(201);
    res.json({name, email, picture});
})


app.listen(process.env.PORT || 5000 , () => {
    console.log(`Server listening on ${process.env.PORT || 5000}`);
});