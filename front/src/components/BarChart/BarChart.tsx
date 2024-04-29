import * as d3 from "d3";
import React, { useEffect, useRef } from "react";
import { UserActivityProps } from "../../types/types";

interface BarChartProps {
	data: UserActivityProps;
}
const BarChart: React.FC<BarChartProps> = ({ data }) => {
	const svgRef = useRef<SVGSVGElement>(null);

	useEffect(() => {}, [data]);

	return (
		<div>
			<svg ref={svgRef}></svg>
		</div>
	);
};

export default BarChart;
