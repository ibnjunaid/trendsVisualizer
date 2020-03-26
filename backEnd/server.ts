import express from 'express';


const app = express();

app.get('/data',(req,res)=>{
    res.send("Hello");
});

app.get('/loc/:woeid',(req,res)=>{
    res.send("Specific City based Search under construction");
})

app.listen(8080,()=>{
    console.log("App listening on ");
})