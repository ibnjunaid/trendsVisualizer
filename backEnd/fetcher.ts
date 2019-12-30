import axios from 'axios';
axios.defaults.headers.common['Authorization'] = "Bearer AAAAAAAAAAAAAAAAAAAAABmeBQEAAAAAmzrYEOjmTefDQ342sQtNLO2eWkI%3DnLjh6by8TpUF6Jx492oP7220NedIGMFlwXno2NRVnIsT1908FL";

import {twitterResponse} from './interfaces';
import {trendModel} from './Trend.Model'


import mongoose from 'mongoose';
const uri = "mongodb+srv://osama:Osamah786@cluster0-ozijn.mongodb.net/TwitterVisualTool?retryWrites=true&w=majority";
let connection = mongoose.connect(uri,{useNewUrlParser:true,useUnifiedTopology: true});

connection.then((db)=>{ 
    getTrends().then((data)=>{
        if(!data){
            throw "No data returned"
        }
        else{
            let trendData = new trendModel({
                trends : data.trends,
                as_of : data.as_of,
                created_at : data.created_at,
                locations : data.locations 
            });

            trendData.save()
            .then((msg)=>{
                console.log(msg);
            })
            .catch((err)=>{
                console.log(err);
            })
        }
    })
})


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
