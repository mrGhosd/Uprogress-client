import * as d3 from 'd3';

export default function drawPie(id, data, height, width) {
  let radius = Math.min(width, height) / 2;

  if (!d3.select(`#${id}`).selectAll('*').empty()) {
    d3.select(`#${id}`).selectAll('*').remove();
  }

  const legendRectSize = 18;
  const legendSpacing = 4;


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

  var tooltip = d3.select(`#${id}`)
          .append('div')
          .attr('class', 'tooltip');

  tooltip.append('div')
    .attr('class', 'label');

  tooltip.append('div')
    .attr('class', 'count');

  tooltip.append('div')
    .attr('class', 'percent');

  let path = svg.selectAll('path')
                .data(dataSet)
                .enter().append('path')
                .attr('fill', (info) => {
                  return info.data.color;
                })
                .attr('d', arc);

  path.on('mouseover', (info) => {
    tooltip.select('.label').html(info.data.label);
    tooltip.select('.percent').html(`${info.data.value}%`);
    tooltip.style('display', 'block');
  });

  path.on('mouseout', () => {
    tooltip.style('display', 'none');
  });

  let legend = svg.selectAll('.legend')
          .data(dataSet)
          .enter()
          .append('g')
          .attr('class', 'legend')
          .attr('transform', (data, index) => {
            var height = legendRectSize + legendSpacing;
            var offset = height * 2;
            var horz = -3 * legendRectSize;
            var vert = index * height - offset;

            return `translate(${horz}, ${vert})`;
          });

  legend.append('rect')
    .attr('width', legendRectSize)
    .attr('height', legendRectSize)
    .style('fill', (data) => { return data.data.color; })
    .style('stroke', (data) => { return data.data.color; });


  legend.append('text')
    .attr('x', legendRectSize + legendSpacing)
    .attr('y', legendRectSize - legendSpacing)
    .text((info) => {
      return info.data.label;
    });
}
