"use strict";
exports.__esModule = true;
// import { Mongoose,Mongoose,Schema,Types,Model } from "mongoose";
var mongoose = require("mongoose");
var trendSchema = new mongoose.Schema({
    name: String,
    url: String,
    promoted_content: Boolean,
    query: String,
    tweet_volume: Number
});
var locationSchema = new mongoose.Schema({
    name: String,
    woeid: Number
});
var responseSchema = new mongoose.Schema({
    trends: [trendSchema],
    as_of: Date,
    created_at: Date,
    locations: [locationSchema]
});
exports.trendModel = mongoose.model('trends', responseSchema);
