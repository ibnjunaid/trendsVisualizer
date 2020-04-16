import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-main',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {

  constructor(public dataService: DataService) { }

  ngOnInit() {
  }
}
