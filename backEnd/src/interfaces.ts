export interface trend{
    name : string,
    url : string,
    promoted_content : boolean | null,
    query : string,
    tweet_volume : number
}

export interface location{
    name : String,
    woeid : Number,
}

export interface twitterResponse{
    trends : Array<trend>,
    as_of : Date ,
    created_at : Date,
    locations : Array<location>
}

//Server Interfaces 

export interface Trend{
    name : String,
    tweet_volume : number
}

export interface frontEndResponse{
    as_of : Date | any,
    location : String,
    trends : Array<Trend>
}