import * as d3 from 'd3';

export default function drawPie(id, data, height, width) {
  let radius = Math.min(width, height) / 2;

  // let color = d3.scale.category20();

  // let pie = d3.layout.pie().sort(null);

  let arc = d3.svg.arc()
              .innerRadius(radius - 100)
              .outerRadius(radius - 50);

  let svg = d3.select(`#${id}`)
              .attr('width', width)
              .attr('height', height)
              .append('g')
              .attr('transform', `translate(${width / 2}, ${height / 2})`);
              
  var dataSet = d3.layout.pie().sort(null).value((dataValue) => {
    return dataValue.value;
  })(data);
  console.log(dataSet);
  svg.selectAll('path')
                .data(dataSet)
                .enter().append('path')
                .attr('fill', function(d, i) {
                  return d.data.color;
                })
                .attr('d', arc);
}
