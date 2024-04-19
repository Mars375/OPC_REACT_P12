import * as d3 from "d3";
import React, { useEffect, useRef } from "react";
import { UserActivityProps } from "../../types/types";

interface BarChartProps {
	data: UserActivityProps;
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
	const svgRef = useRef<SVGSVGElement>(null);

	useEffect(() => {
		const svg = d3.select(svgRef.current);

		const xScale = d3
			.scaleBand()
			.domain(data.sessions.map((session) => session.day))
			.range([0, 300])
			.padding(0.2);

		const xAxis = d3.axisBottom(xScale).tickFormat(d3.timeFormat("%d"));

		svg.append("g").attr("transform", "translate(0, 150)").call(xAxis);
	}, [data]);

	return (
		<div>
			<svg ref={svgRef}></svg>
		</div>
	);
};

export default BarChart;
