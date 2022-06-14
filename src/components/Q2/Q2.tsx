import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

import data from './wordLikes.json';

const Q2 = () => {
  const svg = useRef(null);
  const height = 500
  const width = 1000
  const margin = { top: 20, right: 30, bottom: 30, left: 80 }

  const renderChart = (svg:any) => {
    const xscale = d3
      .scaleBand()
      .domain(data.map(d => d.word))
      .rangeRound([margin.left, width - margin.right])
      .padding(0.125)

    const yscale = d3
      .scaleLinear()
      .domain([
        d3.min(data, ({ avgLikes }) => (avgLikes ? avgLikes - 50000 : 0)) as number,
        d3.max(data, ({ avgLikes }) => (avgLikes ? avgLikes + 50000 : 0)) as number
      ])
      .range([height - margin.bottom, margin.top])

    const xAxis = d3.axisBottom(xscale)
    const yAxis = d3.axisLeft(yscale)

    svg
      .select('.x-axis')
      .attr('transform', `translate(0, ${height - margin.bottom})`)
      .call(xAxis)

    svg
      .select('.y-axis')
      .attr('transform', `translate(${margin.left}, 0)`)
      .call(yAxis)

    svg
      .select('.plot-area')
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', (d:any) => xscale(d.word))
      .attr('width', xscale.bandwidth())
      .attr('y', (d:any) => yscale(d.avgLikes))
      .attr('height', (d:any) => height - yscale(d.avgLikes) - margin.bottom)
      .attr('fill', '#69b3a2')
  }

  useEffect(() => {
    renderChart(d3.select(svg.current));
  }, [data])

  return (
    <svg
      ref={svg}
      style={{
        height: 500,
        width: "100%",
        marginRight: "0px",
        marginLeft: "0px",
      }}
    >
      <g className="plot-area" />
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  );
}

export default Q2;
