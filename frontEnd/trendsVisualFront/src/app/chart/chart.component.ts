import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../data.service';
import { serverResponse, Trend } from '../../interfaces/interfaces';
import * as d3 from 'd3';
import { sliderHorizontal } from './../../..//node_modules/d3-simple-slider/dist/d3-simple-slider.js';
@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {


  constructor(private dataService: DataService) {
  }

  // * ngModel variables
  @Input() selectedTime = '5 am';


  margin = { top: 40, bottom: 40, right: 60, left: 80};
  svgHeight = 500 - this.margin.top - this.margin.bottom;
  svgWidth = 800 - this.margin.left - this.margin.right;


  // * Helper Functions

  // convert dateString to javascript date
  parseDate = (date: string) => new Date(date);
  // format Ticks
  formatTicks = (d: any) =>  d3.format('~s')(d);

  // * currently acting as entry function fetches and parses data
  //  * then passes to drawBars
  draw(): void {
    this.dataService.getData().subscribe((data: Array<serverResponse>) => {
      data.forEach((d) => d.as_of = this.parseDate(d.as_of));
      this.genSlider(data);
    });
    debugger;
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
    svg.selectAll('*').remove();

    if (data.length === 0 ) {
      svg.append('text')
          .text('Data Not Available Right Now!!')
          .attr('transform', `translate(20,20)`);
    }

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
    const Detailsvg = this.initializeSVGContainer(350, 500, '.bar-detail-container');
    d3.selectAll('.bar')
      .on('click', (bar: Trend) => {
        console.log(bar);
        this.appendBarData(bar, Detailsvg);
      });
  }

  initializeSVGContainer(containerWidth: number, containerHeight: number , selector: string) {
    return d3.select(selector)
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
    this.draw();
  }

  genSlider(data: Array<serverResponse>) {
    console.log(data);
    const svgWidth = window.innerWidth;
    const svgHeight = 100;
    const sliderWidth = svgWidth;

    const slider = sliderHorizontal()
    .min(0)
    .max(24)
    .step(1)
    .width(sliderWidth - 50)
    .tickFormat(this.formatTimeSlider)
    .ticks(24)
    .displayValue(true)
    .on('onchange', (val: number) => {
        const match = data.filter((d) => d.as_of.getHours() === val );
        console.log(match);
        if ( match.length !== 0) {
          this.drawBars(match[0].trends);
        } else {
          this.drawBars([]);
        }
      });

    d3.select('#slider')
    .append('svg')
    .attr('width', svgWidth)
    .attr('height', svgHeight)
    .append('g')
    .attr('transform', 'translate(30,30)')
    .call(slider);
  }



  // format Time Slider
    formatTimeSlider(value: number): string {
      const amORpm = value > 12 ? ' pm' : ' am';
      const hr = Math.round(value % 12) || 12;
      return hr + amORpm;
    }

}
