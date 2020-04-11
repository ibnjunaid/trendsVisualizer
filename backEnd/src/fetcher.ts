import axios from 'axios';

//Add a Bearer token 
axios.defaults.headers.common['Authorization'] = "Bearer AAAAAAAAAAAAAAAAAAAAABmeBQEAAAAAmzrYEOjmTefDQ342sQtNLO2eWkI%3DnLjh6by8TpUF6Jx492oP7220NedIGMFlwXno2NRVnIsT1908FL";

import {twitterResponse} from './interfaces';
import {trendModel} from './Trend.Model'


import mongoose = require("mongoose");

//mongodb connection uri 
//here im connecting to a local db 
//generally in production i connect to  mongo atlas cluster 
const uri = "mongodb://127.0.0.1:27017/TwitterVisual";
let connection = mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology: true});


function start() {
    connection.then((db) => {
        getTrends().then((data) => {
            if (!data) {
                throw "No data returned";
            }
            else {
                let trendData = new trendModel({
                    trends: data.trends,
                    as_of: data.as_of,
                    created_at: data.created_at,
                    locations: data.locations
                });
                trendData.save()
                    .then((msg) => {
                        console.log(msg.id);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        });
    });
}

async function getTrends(){
    try {
        const response = await axios.get('https://api.twitter.com/1.1/trends/place.json?id=1');
        return parseTrends(response.data);
    }
    catch (err) {
        console.log(err);
    }
}

function parseTrends(data:any){
    let twitterResponse : twitterResponse={
        trends : data[0].trends,
        as_of : data[0].as_of,
        created_at : data[0].created_at,
        locations:data[0].locations
    }
    return twitterResponse;
}

const millisec = 1000;

let intervalTimer = setInterval(start,millisec);
