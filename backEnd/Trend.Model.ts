// import { Mongoose,Mongoose,Schema,Types,Model } from "mongoose";
import mongoose = require("mongoose");

let trendSchema = new mongoose.Schema({
    name : String,
    url : String,
    promoted_content : Boolean,
    query : String,
    tweet_volume : Number
})

let locationSchema = new mongoose.Schema({
    name : String,
    woeid : Number,
})

let responseSchema = new mongoose.Schema({
    trends : [trendSchema],
    as_of : Date,
    created_at : Date,
    locations: [locationSchema]
})

export let trendModel = mongoose.model('trends',responseSchema);
