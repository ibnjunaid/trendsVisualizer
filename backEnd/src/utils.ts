import * as mongo from 'mongodb';
import {utcParse} from 'd3-time-format'
import {twitterResponse,frontEndResponse,trend,Trend,location} from './interfaces';


//Utility Function for parseDbData


function parseTrends( data:Array<trend> ){
    return data.map( d => { 
        let trend : Trend = {
            name : d.name,
            tweet_volume : d.tweet_volume
        }
        return trend;
    });
}


export function parseDbData (data:Array<twitterResponse>) {
     return data.map( d => {
        let trendPiece : frontEndResponse = {
            as_of : d.as_of,
            location : d.locations[0].name,
            trends : parseTrends(d.trends)
        }
        return trendPiece;
    })
}

export function erLog(err:Error){
    console.log("message : " + err.message);
    console.log("Name : "+ err.name);
    console.log("Stck : " + err.stack)
}