import { useEffect, useRef } from "react";
import * as d3 from "d3";
import {
	UserPerformanceProps,
	PerformanceDataProps,
} from "../../../types/types";

const RadarChart = ({ data }: { data: UserPerformanceProps }) => {
	const svgRef = useRef<SVGSVGElement>(null);

	useEffect(() => {
		if (!svgRef.current || !data) return;

		const margin = { top: 30, left: 40, right: 40, bottom: 35 };

		const updateChart = () => {
			// Calculate the dimensions of the chart area
			const width =
				parseInt(d3.select(svgRef.current).style("width")) -
				margin.left -
				margin.right;
			const height = 198;
			const radius = Math.min(width, height) / 2;

			// Create an SVG container
			const svg = d3
				.select(svgRef.current)
				.classed("radar-chart-svg", true)
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom);

			// Clear any existing elements in the SVG
			svg.selectAll("*").remove();

			// Create a group element centered in the SVG
			const g = svg
				.append("g")
				.attr(
					"transform",
					`translate(${width / 2 + margin.left}, ${height / 2 + margin.top})`
				);

			// Calculate the angle for each axis
			const angleSlice = (Math.PI * 2) / data.data.length;
			const maxDataValue = Math.max(...data.data.map((d) => d.value));

			// Create a linear scale for the radius
			const rScale = d3
				.scaleLinear()
				.range([0, radius])
				.domain([0, maxDataValue]);

			// Draw concentric grid polygons
			const levels = 5;
			const allAxis = data.data.map((d) => d.kind);

			for (let level = 1; level <= levels; level++) {
				const levelFactor = radius * (level / levels);

				g.selectAll(".levels")
					.data(allAxis)
					.enter()
					.append("line")
					.attr(
						"x1",
						(_d, i) => levelFactor * Math.cos(angleSlice * i - Math.PI / 2)
					)
					.attr(
						"y1",
						(_d, i) => levelFactor * Math.sin(angleSlice * i - Math.PI / 2)
					)
					.attr(
						"x2",
						(_d, i) =>
							levelFactor * Math.cos(angleSlice * (i + 1) - Math.PI / 2)
					)
					.attr(
						"y2",
						(_d, i) =>
							levelFactor * Math.sin(angleSlice * (i + 1) - Math.PI / 2)
					)
					.attr("class", "line")
					.style("stroke", "#CDCDCD")
					.style("stroke-width", "0.5px")
					.style("fill", "none");

				// Close the polygon
				g.append("line")
					.attr(
						"x1",
						levelFactor *
							Math.cos(angleSlice * (allAxis.length - 1) - Math.PI / 2)
					)
					.attr(
						"y1",
						levelFactor *
							Math.sin(angleSlice * (allAxis.length - 1) - Math.PI / 2)
					)
					.attr("x2", levelFactor * Math.cos(angleSlice * 0 - Math.PI / 2))
					.attr("y2", levelFactor * Math.sin(angleSlice * 0 - Math.PI / 2))
					.attr("class", "line")
					.style("stroke", "#CDCDCD")
					.style("stroke-width", "0.5px")
					.style("fill", "none");
			}

			// Draw the axes
			const axis = g
				.selectAll(".axis")
				.data(data.data)
				.enter()
				.append("g")
				.attr("class", "axis");

			// Add labels at the end of each axis
			axis
				.append("text")
				.attr("class", "legend")
				.attr("text-anchor", "middle")
				.attr("dy", "0.35em")
				.attr(
					"x",
					(_d, i) =>
						rScale(maxDataValue * 1.3) * Math.cos(angleSlice * i - Math.PI / 2)
				)
				.attr(
					"y",
					(_d, i) =>
						rScale(maxDataValue * 1.15) * Math.sin(angleSlice * i - Math.PI / 2)
				)
				.text((d) => d.kind)
				.style("font-size", ".75rem")
				.style("fill", "white");

			// Create a radial line generator
			const radarLine = d3
				.lineRadial<PerformanceDataProps>()
				.radius((d) => rScale(d.value))
				.angle((_d, i) => i * angleSlice)
				.curve(d3.curveLinearClosed);

			// Initialisez les valeurs à 0
			const initialData = data.data.map((d) => ({ ...d, value: 0 }));

			// Sélectionnez l'élément path existant ou ajoutez-en un nouveau
			const radarArea = g.selectAll(".radar-area").data([initialData]);

			radarArea
				.enter()
				.append("path")
				.attr("class", "radar-area")
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				.merge(radarArea as any)
				.attr("d", radarLine)
				.style("stroke", "none")
				.style("fill", "rgba(255, 0, 0, 0.6)")
				.transition()
				.duration(1000)
				.attrTween("d", function () {
					const interpolator = d3.interpolateArray(initialData, data.data);
					return function (t) {
						return radarLine(interpolator(t)) || "";
					};
				});

			radarArea.exit().remove();
		};

		// Call the update function to render the chart
		updateChart();

		// Add an event listener to handle window resize
		window.addEventListener("resize", updateChart);

		// Clean up the event listener on component unmount
		return () => {
			window.removeEventListener("resize", updateChart);
		};
	}, [data]);

	return <svg ref={svgRef} className='w-full h-full' />;
};

export default RadarChart;
