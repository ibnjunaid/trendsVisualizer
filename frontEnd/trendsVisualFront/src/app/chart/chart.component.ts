import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { serverResponse, Trend } from '../../interfaces/interfaces';
import * as d3 from 'd3';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  svgHeight = 400;
  svgWidth = 600;
  margin = { top: 20, bottom: 20, right: 20, left: 20};

  constructor(private dataService: DataService) {
    this.draw();
  }

  draw(): void {
    this.dataService.getData().subscribe((data: Array<serverResponse>) => {
        this.drawer(data[0].trends);
    });
  }

  drawer(data: Array<Trend>): void {
    const yExtent = d3.extent(data, (d) => d.tweet_volume);
    const yScale = d3.scaleLinear()
                      .domain([0 , yExtent[1]])
                      .range([0 , this.svgHeight]);
    const svg = d3.select('svg')
                  .attr('height', this.svgHeight)
                  .attr('width', this.svgWidth)
                  .style('margin', '20px');
    let barHeightScale: number;
    svg
       .append('g')
       .selectAll('.bar')
       .data(data)
       .enter()
       .append('rect')
       .attr('x', (d, i) => i * 20 )
       .attr('y', (d) => {
          barHeightScale = yScale(d.tweet_volume) + 10;           // added 10 to normalise the null
          return this.svgHeight - barHeightScale;
       })
       .attr('height', (d, i) => yScale(d.tweet_volume) + 10)
       .attr('width', '16px');
      }
  ngOnInit() {
  }

}
