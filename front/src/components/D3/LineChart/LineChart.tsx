import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { AverageSessionProps } from "../../../types/types";

const LineChart = ({ data }: { data: AverageSessionProps[] }) => {
	const svgRef = useRef<SVGSVGElement>(null);

	useEffect(() => {
		// Check if the svg reference exists and data is not empty
		if (!svgRef.current || !data.length) return;

		const margin = { top: 30, left: 20, right: 20, bottom: 35 };

		const resizeHandler = () => {
			// Redraw the chart when the screen size changes
			updateChart();
		};

		const updateChart = () => {
			// Determine dimensions based on screen size
			const width =
				parseInt(d3.select(svgRef.current).style("width")) -
				margin.left -
				margin.right;

			const height = 198;

			// Create the SVG with calculated dimensions
			const svg = d3
				.select(svgRef.current)
				.classed("line-chart-svg", true)
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom);

			// Clear the SVG
			svg.selectAll("*").remove();

			// Add the title
			svg
				.append("text")
				.attr("fill", "#fff")
				.attr("x", margin.left)
				.attr("y", margin.top)
				.text("Durée moyenne des ")
				.style("font-size", "1rem");

			svg
				.append("text")
				.attr("fill", "#fff")
				.attr("x", margin.left)
				.attr("y", margin.top + 20)
				.text("sessions")
				.style("font-size", "1rem");

			// X scale
			const xScale = d3
				.scaleLinear()
				.domain([0, 6])
				.range([margin.left, width + margin.right]);

			const xAxis = d3
				.axisBottom(xScale)
				.tickSize(0)
				.tickPadding(10)
				.ticks(7)
				.tickFormat((_d, i) => data[i].day.toString().substring(0, 1));

			// Add the X axis
			svg
				.append("g")
				.call(xAxis)
				.attr("color", "#fff")
				.attr("transform", `translate(0, ${height + margin.top - 10})`)
				.attr("font-size", "1rem")
				.select(".domain")
				.remove();

			// Y scale
			const domain = d3.max(data, (d) => d.sessionLength) as number;
			const yScale = d3
				.scaleLinear()
				.domain([0, domain * 4])
				.range([height, margin.top]);

			// Line generator
			const line = d3
				.line<AverageSessionProps>()
				.x((_d, i) => xScale(i))
				.y((d) => yScale(d.sessionLength) - 30)
				.curve(d3.curveMonotoneX);

			// Add the line to the SVG
			svg
				.append("path")
				.datum(data)
				.attr("d", line)
				.attr("stroke", "#fff")
				.attr("stroke-width", 2)
				.attr("fill", "none");

			// Select data groups
			const groups = svg
				.selectAll(".data-group")
				.data(data)
				.enter()
				.append("g")
				.attr("class", "data-group");

			// Iterate over each data group
			groups.each(function (d, index) {
				const group = d3.select(this); // Select the current group

				// Add a transparent rectangle for hover area
				group
					.append("rect")
					.attr("x", xScale(index))
					.attr("y", 0)
					.attr("width", width / 7)
					.attr("height", height)
					.attr("fill", "transparent")
					.attr("opacity", 0)
					.on("mouseover", () => showTooltip(d, index))
					.on("mouseout", hideTooltip);

				// Add the tooltip
				const tooltip = svg
					.append("g")
					.attr("class", "tooltip")
					.attr("opacity", 0)
					.style("pointer-events", "none");

				// Add a circle to the tooltip
				tooltip
					.append("rect")
					.attr("width", 50)
					.attr("height", 20)
					.attr("fill", "#fff");

				// Add text to the tooltip
				tooltip
					.append("text")
					.attr("x", 25)
					.attr("y", 12)
					.attr("text-anchor", "middle")
					.attr("dominant-baseline", "middle")
					.style("font-size", "14px")
					.text(`${d.sessionLength} min`);

				// Add the point to the group
				group
					.append("circle")
					.attr("class", "point")
					.attr("cx", xScale(index))
					.attr("cy", yScale(d.sessionLength) - 30)
					.attr("r", 4)
					.attr("fill", "#fff")
					.attr("opacity", 0);

				group
					.append("circle")
					.classed("low-opacity-circle", true)
					.attr("fill", "#fff")
					.attr("cx", xScale(index))
					.attr("cy", yScale(d.sessionLength) - 30)
					.attr("r", 10)
					.attr("opacity", 0);

				const darkRectangle = svg
					.append("rect")
					.attr("class", "dark-rectangle")
					.attr("x", xScale(index))
					.attr("y", 0)
					.attr("width", "100%")
					.attr("height", height + margin.top + margin.bottom)
					.attr("fill", "rgba(0, 0, 0, 0.5)")
					.attr("opacity", 0)
					.attr("opacity", 0)
					.lower();

				// Show the tooltip
				function showTooltip(_d: AverageSessionProps, index: number) {
					const tooltipWidth = 50;
					let xPos = xScale(index);
					const yPos = yScale(d.sessionLength) - 60;
					// Check if the tooltip exceeds the graph to the right
					if (xPos + tooltipWidth > width) {
						xPos -= tooltipWidth; // Display to the left instead of the right
					}

					tooltip
						.attr("opacity", 1)
						.attr("transform", `translate(${xPos},${yPos})`);

					// Afficher le point de données lors du survol
					group.select(".point").attr("opacity", 1);
					group.select(".low-opacity-circle").attr("opacity", 0.3);

					darkRectangle.transition().attr("opacity", 0.3);
				}

				// Hide the tooltip
				function hideTooltip() {
					tooltip.transition().duration(200).attr("opacity", 0);
					// Hide the point after hover
					group.select(".point").attr("opacity", 0);
					group.select(".low-opacity-circle").attr("opacity", 0);
					darkRectangle.transition().attr("opacity", 0);
				}
			});
		};

		// Initial chart rendering
		updateChart();

		// Add event listener for window resize
		window.addEventListener("resize", resizeHandler);

		// Cleanup event listener on component unmount
		return () => {
			window.removeEventListener("resize", resizeHandler);
		};
	}, [data]);

	return <svg ref={svgRef} className='w-full'></svg>;
};

export default LineChart;
