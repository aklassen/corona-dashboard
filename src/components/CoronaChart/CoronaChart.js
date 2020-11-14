import React from 'react';

import { scaleLinear, scaleBand } from 'd3-scale';
import { line, curveMonotoneX } from 'd3-shape';
import { extent } from 'd3-array';
import { transition } from 'd3-transition';

import Line from './line/Line';
import XYAxis from './axis/XY-Axis';

export default class CoronaChart extends React.Component {
  componentDidMount() {}

  parseDate(input) {
    var parts = input.match(/(\d+)/g);
    return new Date(parts[2], parts[1] - 1, parts[0]);
  }

  render() {
    const chartData = this.props.data.map((val) => {
      return {
        date: this.parseDate(val.Meldedatum),
        incidence: parseFloat(val['7-Tagesinzidenz pro 100.000 Einwohner'])
      };
    });

    
    const parentWidth = 960;
    
    const margins = {
      top: 20,
      right: 20,
      bottom: 50,
      left: 25,
    };

    const width = parentWidth - margins.left - margins.right;
    const height = 540 - margins.top - margins.bottom;

    const ticks = 5;
    const t = transition().duration(1000);

    const xScale = scaleBand()
      .domain(chartData.map((d) => d.date))
      .rangeRound([0, width])
      .padding(1);

    const yScale = scaleLinear()
      .domain(extent(chartData, (d) => d.incidence))
      .range([height, 0])
      .nice();

    const lineGenerator = line()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.incidence))
      .curve(curveMonotoneX);

    return (
      <div>
        <svg
          className="lineChartSvg"
          width={width + margins.left + margins.right}
          height={height + margins.top + margins.bottom}
        >
          <g transform={`translate(${margins.left}, ${margins.top})`}>
            <XYAxis {...{ xScale, yScale, height, ticks, t }} />
            <Line data={chartData} xScale={xScale} yScale={yScale} lineGenerator={lineGenerator} width={width} height={height} />
          </g>
        </svg>
      </div>
    );
  }
}
