import css from './ElementDonut.styl';

import CN from 'classnames';

import React, { Component } from 'react';
import * as d3 from 'd3';
import Donut3D from './3DDonut.js';

const salesData=[
  { label:"Basic", color:"#3366CC" },
  { label:"Plus", color:"#DC3912" },
  { label:"Lite", color:"#FF9900" },
  { label:"Elite", color:"#109618" },
  { label:"Delux", color:"#990099" }
];

export default class ElementDonut extends Component {

  randomData() {
  	return salesData.map(function(d){
  		return {label:d.label, value:1000*Math.random(), color:d.color};
    });
  }

  componentDidMount() {
    Donut3D.draw("salesDonut", this.randomData(), 150, 150, 130, 100, 30, 0.4);
    // Donut3D.draw("quotesDonut", this.randomData(), 450, 150, 130, 100, 30, 0);
  }

  render() {
    // let svg = d3.select(css.elementDonut).append("svg").attr("width",700).attr("height",300);
    // svg.append("g").attr("id","salesDonut");
    // svg.append("g").attr("id","quotesDonut");

    return (
      <div className={CN(css.elementDonut)}>
        ChartComponent
        <svg width="700" height="300">
          <g id="salesDonut"></g>
          <g id="quotesDonut"></g>
        </svg>
      </div>
    );
  }
}
