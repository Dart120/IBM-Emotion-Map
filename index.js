//to run : node filename.js
const { json, text } = require('express')
const express = require('express')
const app = express()
const port = 3000
const btoa = require('btoa')


app.get('/', (req, res) => {
    tex = JSON.parse('{"text": "Team, I know that times are tough! Product sales have been disappointing for the past three quarters. We have a competitive product, but we need to do a better job of selling it!"}')
    

    var fetch = require('node-fetch');

fetch('https://api.eu-gb.tone-analyzer.watson.cloud.ibm.com/instances/98be2471-dd42-463a-8816-4f10eb07cb0b/v3/tone?version=2017-09-21', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('apikey:oGnoFJ_HKfa_TNpTHDKcyzgCmNCwtNLIWR9Xw1EgVBcz')
    },
    body: JSON.stringify(tex)
}).then(response => response.json())
.then(response=> console.log(response))
})

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

//visit localhost:3000
// assuming you have done 1) npm init 2) npm install express