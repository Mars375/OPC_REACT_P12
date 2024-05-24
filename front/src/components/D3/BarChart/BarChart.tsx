import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { SessionProps } from "../../../types/types";

type DataType = "kilogram" | "calories";

const BarChart = ({ data }: { data: SessionProps[] }) => {
	const svgRef = useRef<SVGSVGElement>(null);

	useEffect(() => {
		// Check if the svgRef exists
		if (!svgRef.current) return;

		const resizeHandler = () => {
			// Redraw the chart when the screen size changes
			updateChart();
		};

		const updateChart = () => {
			// Define the margins
			const margin = { top: 50, left: 40, right: 20, bottom: 30 };

			// Calculate the chart dimensions based on the window size
			const width =
				parseInt(d3.select(svgRef.current).style("width")) -
				margin.left -
				margin.right;
			const height = 263;

			// Select the SVG element and define its attributes
			const svg = d3
				.select(svgRef.current)
				.attr("width", width)
				.attr("height", height)
				.style("border-radius", "5px");

			// Remove all existing child elements in the SVG element
			svg.selectAll("*").remove();

			// Calculate the maximum values of kilograms and calories
			const maxKilogram = d3.max(data, (d) => d.kilogram) ?? 0;
			const maxCalories = d3.max(data, (d) => d.calories) ?? 0;

			// Determine the extent of the data on the x axis
			const extent = d3.extent(data.map((d) => d.day)) as [number, number];

			// Create the linear scale for the x axis
			const xScale = d3
				.scaleLinear()
				.domain(extent)
				.range([margin.left, width - margin.right]);

			// Create the linear scale for the y axis (kilograms)
			const yScaleKilogram = d3
				.scaleLinear()
				.domain([maxKilogram - 12, maxKilogram + 3])
				.range([height - margin.bottom - 20, 20]);

			// Create the linear scale for the y axis (calories)
			const yScaleCalories = d3
				.scaleLinear()
				.domain([0, maxCalories])
				.range([0, height / 2]);

			// Add the chart title
			svg
				.append("text")
				.attr("x", width * 0.05)
				.attr("y", height * 0.09)
				.text("Activité quotidienne")
				.style("font-weight", "500");

			// Add the legend
			const legend = svg.append("g");

			// Calculate the starting position of the legend based on the screen width
			const legendX = window.innerWidth > 1024 ? width * 0.68 : width * 0.65;

			// Create the circles and text for the legend
			["Poids (kg)", "Calories brlées (kCal)"].forEach((text, i) => {
				legend
					.append("circle")
					.attr("cx", legendX + (i === 1 ? width * 0.09 : width * 0.09 + -90))
					.attr("cy", height * 0.08)
					.attr("r", 4)
					.attr("fill", i === 0 ? "black" : "#E60000");

				legend
					.append("text")
					.attr("x", legendX + (i === 1 ? width * 0.105 : width * 0.105 + -90))
					.attr("y", height * 0.1)
					.attr("fill", "#74798C")
					.style("font-size", "14px")
					.text(text);
			});

			// Create a group for the chart and define its position
			const g = svg.append("g").attr("x", margin.left);

			// Add the x axis
			g.append("g")
				.call(d3.axisBottom(xScale).ticks(7).tickSize(0).tickPadding(20))
				.attr("transform", `translate(0, ${height - margin.bottom - 20})`)
				.attr("padding", "120px")
				.attr("color", "#DEDEDE")
				.selectAll("text")
				.attr("font-size", "1rem")
				.attr("fill", "#9B9EAC");

			// Add the y axis (kilograms)
			const yAxis = g
				.append("g")
				.call(d3.axisRight(yScaleKilogram).ticks(3).tickSize(0).tickPadding(10))
				.attr("transform", `translate(${width - margin.right + 30}, 0)`)
				.attr("color", "#F5F7F9");

			// Modify the style of the y axis labels (kilograms)
			yAxis
				.selectAll(".tick text")
				.attr("font-size", "16px")
				.attr("fill", "#9B9EAC");

			// Add dotted lines for each tick of the y axis (kilograms)
			yAxis
				.selectAll(".tick")
				.append("line")
				.attr("x1", -width + margin.right)
				.attr("x2", -20)
				.attr("y1", 0)
				.attr("y2", 0)
				.attr("stroke", "#DEDEDE")
				.attr("stroke-width", 1)
				.attr("stroke-dasharray", "5,5");

			// Create a group for each pair of bars (kilograms and calories)
			const barGroups = g
				.selectAll(".bar-group")
				.data(data)
				.enter()
				.append("g")
				.attr("class", "bar-group");

			// Add hover rectangles for each bar group
			barGroups
				.append("rect")
				.attr("class", "hover-rect")
				.attr("x", (d) => xScale(+d.day) - 30)
				.attr(
					"y",
					window.innerWidth > 1024 ? margin.bottom + 15 : margin.bottom
				)
				.attr("width", 70)
				.attr(
					"height",
					window.innerWidth > 1024
						? height - margin.bottom - 65
						: height - margin.bottom - 50
				)
				.attr("fill", "gray")
				.attr("opacity", 0);

			// Create the kilogram and calories bars for each bar group
			const types: DataType[] = ["kilogram", "calories"];
			types.forEach((type: DataType, index) => {
				barGroups
					.append("path")
					.attr("class", `bar-${type}`)
					.attr("d", (d) => {
						const offset = index === 0 ? -7 : 7;
						const x = xScale(+d.day) + offset;
						const y = height - margin.bottom - 20;
						const baseY = height - margin.bottom - 20;
						const barHeight = baseY - y;
						const barWidth = 6;
						const radius = 0;
						return `M${x},${y + radius} 
                    v-${radius}
                    a${radius},${radius} 0 0 1 ${radius},${-radius} 
                    h${barWidth - 2 * radius} 
                    a${radius},${radius} 0 0 1 ${radius},${radius} 
                    v${barHeight - radius} 
                    h-${barWidth} 
                    z`;
					})
					.transition()
					.duration(500)
					.delay((_d, i) => i * 50)
					.attr("d", (d) => {
						const offset = index === 0 ? -7 : 7;
						const x = xScale(+d.day) + offset;
						const y = (type === "kilogram" ? yScaleKilogram : yScaleCalories)(
							+d[type]
						);
						const baseY = height - margin.bottom - 18;
						const barHeight = baseY - y;
						const barWidth = 6;
						const radius = 3;
						return `M${x},${y + radius} 
                    v-${radius}
                    a${radius},${radius} 0 0 1 ${radius},${-radius} 
                    h${barWidth - 2 * radius} 
                    a${radius},${radius} 0 0 1 ${radius},${radius} 
                    v${barHeight - radius} 
                    h-${barWidth} 
                    z`;
					})
					.attr("stroke", type === "kilogram" ? "black" : "#E60000")
					.attr("fill", type === "kilogram" ? "black" : "#E60000");
			});

			// Create a tooltip to display the values of kilograms and calories
			const tooltip = g.append("g").attr("class", "tooltip").attr("opacity", 0);

			tooltip
				.append("rect")
				.attr("width", 60)
				.attr("height", 90)
				.attr("fill", "#E60000");

			// Create labels for each type of data in the tooltip
			types.forEach((type: DataType, index) => {
				tooltip
					.append("text")
					.attr("class", `tooltip-text-${type}`)
					.attr("x", 5)
					.attr("y", index === 0 ? 30 : 70)
					.style("font-size", "13px")
					.style("fill", "#fff");
			});

			// Add event listeners to display and hide the tooltip
			barGroups
				.on("mouseover", function (_event, d) {
					const xPosition = xScale(+d.day) + 20;
					const tooltipX = xPosition > width - 100 ? width - 170 : xPosition;

					d3.select(this)
						.transition()
						.duration(150)
						.selectAll(".hover-rect")
						.attr("opacity", 0.2);

					tooltip
						.transition()
						.duration(150)
						.attr("opacity", 1)
						.attr("transform", `translate(${tooltipX}, 10)`);

					types.forEach((type: DataType) => {
						tooltip
							.select(`.tooltip-text-${type}`)
							.text(`${d[type]} ${type === "kilogram" ? "kg" : "kCal"}`);
					});
				})
				.on("mouseout", function () {
					d3.select(this)
						.transition()
						.duration(150)
						.selectAll(".hover-rect")
						.attr("opacity", 0);
					tooltip.transition().duration(150).attr("opacity", 0);
				});
		};

		// Call the initial update chart function
		updateChart();

		// Listen to the window resize event
		window.addEventListener("resize", resizeHandler);

		// Remove the event listener when cleaning up
		return () => {
			window.removeEventListener("resize", resizeHandler);
		};
	}, [data]);

	return <svg ref={svgRef} className='w-full'></svg>;
};

export default BarChart;
