import React, { useContext } from "react";

import {
  scaleLinear,
  scaleBand,
  line,
  curveMonotoneX,
  extent,
  transition,
} from "d3";

import Line from "./line/Line";
import XYAxis from "./axis/XY-Axis";
import { CoronaContext, CoronaDataType } from "../CoronaData";

function parseDate(input: string) {
  var parts = input.match(/(\d+)/g);
  if (parts != null && parts.length > 2) {
    return new Date(
      Number.parseInt(parts[2]),
      Number.parseInt(parts[1]) - 1,
      Number.parseInt(parts[0])
    );
  } else {
    throw new Error("Date was not parsable");
  }
}

function CoronaChart() {
  const data = useContext(CoronaContext);

  const chartData = data.coronaData.map((val) => {
    return {
      date: parseDate(val.Meldedatum),
      incidence: Number(val["7-Tagesinzidenz pro 100.000 Einwohner"]),
      casesPastWeek: Number(val["Fälle vergangene 7-Tage"]),
      confirmedCases: Number(val["bestätigte Fälle"]),
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

  const xScale = scaleBand<Date>()
    .domain(chartData.map((d) => d.date))
    .rangeRound([0, width])
    .padding(1);

  const incidenceScale = scaleLinear<any>()
    .domain(extent(chartData, (d) => d.incidence) as any)
    .range([height, 0])
    .nice();

  const casesPastWeekScale = scaleLinear<any>()
    .domain(extent(chartData, (d) => d.casesPastWeek) as any)
    .range([height, 0])
    .nice();

  const confirmedCasesScale = scaleLinear<any>()
    .domain(extent(chartData, (d) => d.confirmedCases) as any)
    .range([height, 0])
    .nice();


  const incidenceLineGenerator = line<{
    date: Date;
    incidence: number;
  }>()
    .x((d) => xScale(d.date) as number)
    .y((d) => incidenceScale(d.incidence))
    .curve(curveMonotoneX);

  const casesPastWeekGenerator = line<{
    date: Date;

    casesPastWeek: number;
  }>()
    .x((d) => xScale(d.date) as number)
    .y((d) => casesPastWeekScale(d.casesPastWeek))
    .curve(curveMonotoneX);

  const confirmedCasesGenerator = line<{
    date: Date;
    confirmedCases: number;
  }>()
    .x((d) => xScale(d.date) as number)
    .y((d) => confirmedCasesScale(d.confirmedCases))
    .curve(curveMonotoneX);

  const ticks = 15;
  const t = transition().duration(1000);


  return (
    <div>
     
      <svg
        className="lineChartSvg"
        width={width + margins.left + margins.right}
        height={height + margins.top + margins.bottom}
      >
        { data.coronaDataType == CoronaDataType.INCIDENCE &&
        <g transform={`translate(${margins.left}, ${margins.top})`}>
          <XYAxis {...{ xScale, yScale: incidenceScale, height, ticks, t }} />
          <Line
            data={chartData}
            xScale={xScale}
            yScale={incidenceScale}
            lineGenerator={incidenceLineGenerator}
            width={width}
            height={height}
          />
        
        </g>
        }
        { data.coronaDataType == CoronaDataType.CASES_PAST_WEEK &&
        <g transform={`translate(${margins.left}, ${margins.top})`}>
          <XYAxis {...{ xScale, yScale: casesPastWeekScale, height, ticks, t }} />
          <Line
            data={chartData}
            xScale={xScale}
            yScale={casesPastWeekScale}
            lineGenerator={casesPastWeekGenerator}
            width={width}
            height={height}
          />
        
        </g>
        }
        { data.coronaDataType == CoronaDataType.CONFIRMED_CASES &&
        <g transform={`translate(${margins.left}, ${margins.top})`}>
          <XYAxis {...{ xScale, yScale: confirmedCasesScale, height, ticks, t }} />
          <Line
            data={chartData}
            xScale={xScale}
            yScale={confirmedCasesScale}
            lineGenerator={confirmedCasesGenerator}
            width={width}
            height={height}
          />
        
        </g>
        }
      </svg>
    </div>
  );
}

export default CoronaChart;
