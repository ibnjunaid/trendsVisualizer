import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { serverResponse } from 'src/interfaces/interfaces';
import * as d3 from 'd3';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) {
  }
  getData(): any {
    return this.http.get<serverResponse>('http://localhost:4200/api');
  }
}
