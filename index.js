//to run : node filename.js
const express = require('express')
var bodyParser = require('body-parser')
const app = express()
const port = 3000
const btoa = require('btoa')
var fetch = require('node-fetch');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/getEmotionalData', (req, res) => {
    tweet = req.body.tweet
    text = JSON.parse(`{"text": "${tweet}"}`)
    

    

    fetch('https://api.eu-gb.tone-analyzer.watson.cloud.ibm.com/instances/98be2471-dd42-463a-8816-4f10eb07cb0b/v3/tone?version=2017-09-21', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Basic ' + btoa('apikey:oGnoFJ_HKfa_TNpTHDKcyzgCmNCwtNLIWR9Xw1EgVBcz')
        },
        body: JSON.stringify(text)
    }).then(response => response.json())
    .then(response => res.send(response.document_tone))
    })

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

//visit localhost:3000
// assuming you have done 1) npm init 2) npm install express