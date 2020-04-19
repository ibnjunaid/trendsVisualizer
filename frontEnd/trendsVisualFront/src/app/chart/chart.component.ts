import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { serverResponse, Trend } from '../../interfaces/interfaces';
import * as d3 from 'd3';
import { style } from '@angular/animations';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {

  margin = { top: 40, bottom: 40, right: 60, left: 80};
  svgHeight = 500 - this.margin.top - this.margin.bottom;
  svgWidth = 800 - this.margin.left - this.margin.right;

  constructor(private dataService: DataService) {
    this.draw();
  }

  // convert dateString to javascript date
  parseDate = (date: string) => new Date(date);

  // format Ticks
  formatTicks = (d: any) =>  d3.format('~s')(d);

  // * currently acting as entry function fetches and parses data 
  //  * then passes to drawBars
  draw(): void {
    this.dataService.getData().subscribe((data: Array<serverResponse>) => {
      data.forEach((d) => {
        d.as_of = this.parseDate(d.as_of);
      });
      this.drawBars(data[26].trends);
      console.log(data);
    });
  }

  // Draw
  drawBars(data: Array<Trend>): void {
    data = data.filter((d) => d.index <= 20);
    console.log(data);

    const yExtent = d3.extent(data, (d) => d.tweet_volume);
    const xExtent = d3.extent(data, (d) => d.index);

    const xScale = d3.scaleBand()
                      .domain(data.map((d) => String(d.index)))
                      .rangeRound([0, this.svgWidth])
                      .paddingInner(0.25);
    const yScale = d3.scaleLinear()
                      .domain([0 , yExtent[1]])
                      .range([this.svgHeight, 0]);
    const svg = d3.select('svg')
                  .attr('height', this.svgHeight + this.margin.top + this.margin.bottom)
                  .attr('width', this.svgWidth + this.margin.left + this.margin.right);
    svg
       .append('g')
       .classed('bar-container', true)
       .style('margin-left', this.margin.left)
       .selectAll('.bar')
       .data(data)
       .enter()
       .append('rect')
       .attr('x', (d, i) => xScale(String(d.index)) )
       .attr('y', (d) => yScale(d.tweet_volume) )         // added 10 to normalise the null
       .attr('height', (d, i) => this.svgHeight - yScale(d.tweet_volume) + 10)
       .attr('width', '16px')
       .classed('bar', true)
       .style('fill', 'dodgerblue')
       .attr('transform', `translate(${this.margin.left},${this.margin.top})`);

    const xAxis = d3.axisBottom(xScale)
                    .ticks(20, 's');
    const yAxis = d3.axisLeft(yScale)
                    .tickFormat(this.formatTicks);

    const xAxisDraw = svg
                    .append('g')
                    .attr('transform', `translate(${this.margin.left},${this.svgHeight + this.margin.bottom + 10})`)
                    .call(xAxis);
    const yAxisDraw = svg
                    .append('g')
                    .attr('transform', `translate(${this.margin.left},${this.margin.bottom})`)
                    .call(yAxis);
    this.listeners();

  }

  listeners() {
    const Detailsvg = this.initializeBarDetailContainer();
    d3.selectAll('.bar')
      .on('click', (bar: Trend) => {
        console.log(bar);
        this.appendBarData(bar, Detailsvg);
      });
  }

  initializeBarDetailContainer() {
    const containerHeight = 500;
    const containerWidth = 350;
    return d3.select('.bar-detail-container')
      .attr('height', containerHeight)
      .attr('width', containerWidth);
  }

  appendBarData( bar: Trend , svg) {
    svg.selectAll('*').remove();
    svg.append('text')
      .text(bar.name)
      .attr('fill', 'black')
      .attr('transform', 'translate(20,20)');
  }

  ngOnInit() {
  }

  // format Time Slider
    formatTimeSlider(value: number) {
      const amORpm = value > 12 ? ' pm' : ' am';
      const hr = (value % 12) || 12;
      console.log(hr);
      const min = hr - (value / 24);
      console.log(min);
      return (hr + min) + amORpm;
    }

}
