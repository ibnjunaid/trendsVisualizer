export interface Trend {
    index: number;
    name: string;
    tweet_volume: number;
}

// tslint:disable-next-line: class-name
export interface serverResponse {
    as_of: Date | any;
    location: string;
    trends: Array<Trend>;
}
