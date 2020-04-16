import express from 'express';
import { MongoClient } from 'mongodb';
import * as path from 'path';
import { frontEndResponse,Trend ,twitterResponse,trend} from './interfaces';
import { parseDbData,erLog } from './utils'
const cors = require('cors');


//URI  DB Setup and create Mongo Client 
const URI = "mongodb://127.0.0.1:27017";
const dbName = "TwitterVisual";
const client = new MongoClient(URI);

let dataToSend = Array<frontEndResponse>();

    //Connect to db and and wrangle data 
    client.connect()
    .then((conn)=>{
        let db = conn.db(dbName);
        db.collection('trends').find({}).toArray()
        .then((d) => {
            dataToSend = parseDbData(d); 
            serve();
        })
        .catch(err => erLog(err));

    })
    .catch((err) => erLog(err));


//Serve data 

function serve() {

    const app = express();

    app.use('/static', express.static(path.join(__dirname, 'public')))

    app.get('/data', cors(),(req, res) => {
        res.send(JSON.stringify(dataToSend));
    });
    app.get('/loc/:woeid', (req, res) => {
        res.send("Specific City based Search under construction");
    });
    app.get('/debug',(req,res)=>{

    })
    app.listen(8080, () => console.log('\nListening on http://localhost:8080'));
}
