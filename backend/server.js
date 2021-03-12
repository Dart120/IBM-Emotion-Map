const express = require('express')
const fetch = require('node-fetch')
const btoa = require('btoa')
const app = express()
const fs = require('fs')
const { MongoClient } = require('mongodb')
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const uri = "mongodb+srv://dbUser:oEN8wfsUMgPmQkut@cluster0.7xljy.mongodb.net/emotional-map?retryWrites=true&w=majority"
const client = new MongoClient(uri, { useUnifiedTopology: true });

require('dotenv').config()

app.use(express.json());

let data_list = []

const regions_list = JSON.parse(fs.readFileSync('regions.json'))

async function get_tweets(region) {

    const headers = { 'Authorization': `Bearer ${process.env.TWITTER_BEARER_TOKEN}` }

    location = `${region.lat},${region.lng},${region.r}mi`
    console.log(location)

    tweet_json = {
        "region_name": region.name,
        "tweets": []
    }

    for(let j = 0; j < 3; j++){

        let res = await fetch(`https://api.twitter.com/1.1/search/tweets.json?q=&geocode=${location}&count=100&tweet_mode=extended`, { method: 'GET', headers: headers })

        const city_json = await res.json()

        for (let i = 0; i < await city_json.statuses.length; i++) {
            if (typeof city_json.statuses[i].retweeted_status === "undefined") {
                tweet_json.tweets.push(await city_json.statuses[i].full_text)
            }

        }
    }   

    console.log(tweet_json.tweets.length)
    data_list.push(tweet_json)

    return

}

async function get_region_tweets() {

    for (let i = 0; i < regions_list.length; i++) {

        await get_tweets(regions_list[i])

    }

}

async function get_trend(woeid) {

    const headers = { 'Authorization': `Bearer ${process.env.TWITTER_BEARER_TOKEN}` }

    let res = await fetch(`https://api.twitter.com/1.1/trends/place.json?id=${woeid}`, { method: 'GET', headers: headers })

    const trend_json = await res.json()

    let trend_list = [];

    for (let i = 0; i < trend_json[0].trends.length; i++) {

        if (trend_list.length < 5) {

            trend_list.push(trend_json[0].trends[i].name)

        }

    }

    return trend_list
}

function get_happiest(region_scores) {

    let copy = region_scores.slice(0);
    copy.sort(function (x, y) {
        if (x['joy'] == y["joy"]) return 0;
        else if (parseInt(x["joy"]) < parseInt(y["joy"])) return 1;
        else return -1;
    })

    return copy.slice(0, 5 || 1);

}

async function analyse_tweets() {

    uk_score = region_score = {
        name: 'United Kingdom',
        joy: 0,
        anger: 0,
        fear: 0,
        sadness: 0,
        confident: 0,
        trend1: '',
        trend2: '',
        trend3: '',
        trend4: '',
        trend5: '',
        happiest1: '',
        happiest2: '',
        happiest3: '',
        happiest4: '',
        happiest5: '',
        sample_size: 0
    }
    uk_joy_count = 0
    uk_anger_count = 0
    uk_fear_count = 0
    uk_sadness_count = 0
    uk_confident_count = 0

    region_analysis = []

    for (let i = 0; i < data_list.length; i++) {

        region_score = {
            name: data_list[i].region_name,
            joy: 0,
            anger: 0,
            fear: 0,
            sadness: 0,
            confident: 0,
            trend1: '',
            trend2: '',
            trend3: '',
            sample_size: 0
        }

        joy_count = 0
        anger_count = 0
        fear_count = 0
        sadness_count = 0
        confident_count = 0

        text = { "text": data_list[i].tweets.join() }
        console.log(process.env.WATSON_TONE_URL)
        console.log(process.env.WATSON_TONE_API_KEY)

        let res = await fetch(`${process.env.WATSON_TONE_URL}/v3/tone?version=2017-09-21`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa(`apikey:${process.env.WATSON_TONE_API_KEY}`)
            },
            body: JSON.stringify(text)
        })

        let analysis = await res.json()

        console.log(analysis)

        if (typeof (analysis.sentences_tone) !== 'undefined') {
            for (let j = 0; j < analysis.sentences_tone.length; j++) {
                if ((analysis.sentences_tone[j].tones.length > 0) && (typeof (analysis.sentences_tone[j]) !== 'undefined')) {
                    for (let k = 0; k < analysis.sentences_tone[j].tones.length; k++) {

                        if (analysis.sentences_tone[j].tones[k].tone_name === 'Joy') {

                            joy_count += analysis.sentences_tone[j].tones[k].score
                            uk_joy_count += analysis.sentences_tone[j].tones[k].score

                        } else if (analysis.sentences_tone[j].tones[k].tone_name === 'Anger') {

                            anger_count += analysis.sentences_tone[j].tones[k].score
                            uk_anger_count += analysis.sentences_tone[j].tones[k].score

                        } else if (analysis.sentences_tone[j].tones[k].tone_name === 'Fear') {

                            fear_count += analysis.sentences_tone[j].tones[k].score
                            uk_fear_count += analysis.sentences_tone[j].tones[k].score

                        } else if (analysis.sentences_tone[j].tones[k].tone_name === 'Sadness') {

                            sadness_count += analysis.sentences_tone[j].tones[k].score
                            uk_sadness_count += analysis.sentences_tone[j].tones[k].score

                        } else if (analysis.sentences_tone[j].tones[k].tone_name === 'Confident') {

                            confident_count += analysis.sentences_tone[j].tones[k].score
                            uk_confident_count += analysis.sentences_tone[j].tones[k].score

                        }

                    }
                }

            }
        

        region_score.sample_size += analysis.sentences_tone.length
        uk_score.sample_size += analysis.sentences_tone.length
        }

        region_score.joy = (joy_count) / (joy_count + anger_count + fear_count + sadness_count + confident_count) * 100
        region_score.anger = (anger_count) / (joy_count + anger_count + fear_count + sadness_count + confident_count) * 100
        region_score.fear = (fear_count) / (joy_count + anger_count + fear_count + sadness_count + confident_count) * 100
        region_score.sadness = (sadness_count) / (joy_count + anger_count + fear_count + sadness_count + confident_count) * 100
        region_score.confident = (confident_count) / (joy_count + anger_count + fear_count + sadness_count + confident_count) * 100

        trend_list = await get_trend(regions_list[i].woeid)

        region_score.trend1 = trend_list[0]
        region_score.trend2 = trend_list[1]
        region_score.trend3 = trend_list[2]

        region_analysis.push(region_score)

    }

    uk_score.joy = (uk_joy_count) / (uk_joy_count + uk_anger_count + uk_fear_count + uk_sadness_count + uk_confident_count) * 100
    uk_score.anger = (uk_anger_count) / (uk_joy_count + uk_anger_count + uk_fear_count + uk_sadness_count + uk_confident_count) * 100
    uk_score.fear = (uk_fear_count) / (uk_joy_count + uk_anger_count + uk_fear_count + uk_sadness_count + uk_confident_count) * 100
    uk_score.sadness = (uk_sadness_count) / (uk_joy_count + uk_anger_count + uk_fear_count + uk_sadness_count + uk_confident_count) * 100
    uk_score.confident = (uk_confident_count) / (uk_joy_count + uk_anger_count + uk_fear_count + uk_sadness_count + uk_confident_count) * 100

    trend_list = await get_trend(23424975)

    uk_score.trend1 = trend_list[0]
    uk_score.trend2 = trend_list[1]
    uk_score.trend3 = trend_list[2]
    uk_score.trend4 = trend_list[3]
    uk_score.trend5 = trend_list[4]


    happiest_cities = get_happiest(region_analysis)

    uk_score.happiest1 = happiest_cities[0].name
    uk_score.happiest2 = happiest_cities[1].name
    uk_score.happiest3 = happiest_cities[2].name
    uk_score.happiest4 = happiest_cities[3].name
    uk_score.happiest5 = happiest_cities[4].name

    region_analysis.push(uk_score)

    return region_analysis

}

async function upload_analysis(db_upload) {

    try {
        // Establish and verify connection
        await client.db("admin").command({ ping: 1 });
        console.log("Connected successfully to server");
        const database = client.db("emotional-map");
        const collection = database.collection("emotion-data");
        // create a document to be inserted
        //const result = await collection.insertOne(example_json);
        const result = await collection.insertOne({ _id: Date.now(), db_upload });

        console.log(
            `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
        );
    } finally {
        // Ensures that the client will close when you finish/error
        return
    }

}

async function main() {

    data_list = []
    await get_region_tweets()
    await analyse_tweets()

    console.log(region_analysis)

    db_upload = { "anlysis": region_analysis }

    console.log(db_upload)
    await upload_analysis(db_upload)
}


app.get('/api/recent', async (req, res) => {

    const database = client.db("emotional-map");
    const collection = database.collection("emotion-data");
    // finds most recent database entry
    collection.find().sort({ "_id": -1 }).limit(1).next()
    .then(results => {
        // returns data stored in entry
        res.status(200).send(results.db_upload)
    }).catch(error => {
        console.error(error)
        res.status(500).send(`Server Error: Can't access most recent data`)
    })
})

client.connect();
// main()
// setInterval(function(){main()}, process.env.DATA_REFRESH_INTERVAL)

const port = process.env.PORT || 8020
const server = app.listen(port, () => console.log(`Listening on port ${port}...`))