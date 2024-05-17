import { useEffect, useRef } from "react";
import * as d3 from "d3";

const RadialBarChart = ({ data }: { data: number }) => {
	const svgRef = useRef<SVGSVGElement>(null);

	useEffect(() => {
		if (!svgRef.current || data === undefined) return;

		const margin = { top: 30, left: 20, right: 20, bottom: 35 };

		const updateChart = () => {
			// Calculate the dimensions of the chart area
			const width =
				parseInt(d3.select(svgRef.current).style("width")) -
				margin.left -
				margin.right;
			const height = 198;

			// Create an SVG container
			const svg = d3
				.select(svgRef.current)
				.classed("radial-chart-svg", true)
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom);

			// Clear any existing elements in the SVG
			svg.selectAll("*").remove();

			// Add a title
			svg
				.append("text")
				.attr("fill", "#000")
				.attr("x", margin.left)
				.attr("y", margin.top)
				.text("Score")
				.style("font-size", "1rem");

			// Draw the Circle
			svg
				.append("circle")
				.attr(
					"transform",
					`translate(${width / 2 + margin.right}, ${
						height / 2 + margin.bottom
					})`
				)
				.attr("r", 80)
				.attr("fill", "#fff");

			// Create the arc
			const arc = d3
				.arc()
				.innerRadius(80)
				.outerRadius(90)
				.startAngle(0)
				.cornerRadius(8)
				.endAngle(-data * 2 * Math.PI);

			// Draw the arc
			svg
				.append("path")
				.attr("fill", "red")
				.attr(
					"transform",
					`translate(${width / 2 + margin.right}, ${
						height / 2 + margin.bottom
					})`
				)
				.transition()
				.duration(1000)
				.attrTween("d", function () {
					const interpolate = d3.interpolate(0, -data * 2 * Math.PI);
					return function (t) {
						arc.endAngle(interpolate(t));
						return arc({
							startAngle: 0,
							endAngle: interpolate(t),
							innerRadius: 80,
							outerRadius: 90,
						})!;
					};
				});

			// Add the text in the center
			svg
				.append("text")
				.attr("x", width / 2 + margin.right)
				.attr("y", height / 2 + margin.bottom - 10)
				.attr("text-anchor", "middle")
				.style("font-size", "1.5rem")
				.style("fill", "#000")
				.text(`${data * 100}%`);

			svg
				.append("text")
				.attr("x", width / 2 + margin.right)
				.attr("y", height / 2 + margin.bottom + 20)
				.attr("text-anchor", "middle")
				.style("font-size", "1rem")
				.style("fill", "#666")
				.text("de votre objectif");
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

	return <svg ref={svgRef} className='w-full' />;
};

export default RadialBarChart;
