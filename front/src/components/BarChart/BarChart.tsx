import * as d3 from "d3";
import React, { useEffect, useRef } from "react";
import { UserActivityProps } from "../../types/types";

type DataType = "kilogram" | "calories";

const BarChart = ({ data }: { data: UserActivityProps }) => {
	const svgRef = useRef<SVGSVGElement>(null);

	useEffect(() => {
		// Si la référence svg n'existe pas, on arrête la fonction
		if (!svgRef.current) return;

		const svg = d3.select(svgRef.current);
		svg.selectAll("*").remove();

		svg
			.attr("width", 835)
			.attr("height", 320)
			.style("background-color", "#F5F7F9")
			.style("border-radius", "5px");

		const g = svg.append("g").attr("transform", "translate(50, 50)");

		// Max des données
		const minKilogram = d3.min(data.sessions, (d) => d.kilogram) ?? 0;
		const maxKilogram = d3.max(data.sessions, (d) => d.kilogram) ?? 0;
		const maxCalories = d3.max(data.sessions, (d) => d.calories) ?? 0;

		// Création de l'échelle des abscisses
		const xScale = d3
			.scaleBand()
			.domain(data.sessions.map((d) => d.day))
			.range([0, 735]);

		// Échelle pour les kilogrammes
		const yScaleKilogram = d3
			.scaleLinear()
			.domain([minKilogram - 1, maxKilogram])
			.range([220, 0]);

		// Échelle pour les calories, ajustée pour mieux correspondre à l'échelle des kilogrammes
		const yScaleCalories = d3
			.scaleLinear()
			.domain([0, maxCalories * 1.5]) // Diviser par un facteur pour réduire l'échelle
			.range([220, 0]);

		// Ajout de l'axe X
		g.append("g")
			.call(d3.axisBottom(xScale).tickSize(0).tickPadding(15))
			.attr("transform", "translate(0, 220)")
			.attr("color", "#74798C")
			.selectAll("text")
			.attr("font-size", "1rem");

		// Ajout de l'axe Y
		const yAxis = g
			.append("g")
			.call(d3.axisRight(yScaleKilogram).ticks(3).tickSize(0).tickPadding(20))
			.attr("transform", "translate(735,0)")
			.attr("color", "#74798C");

		yAxis.selectAll(".tick text").style("font-size", "16px");

		// Ajouter des lignes pointillées partant de chaque tick de l'axe Y
		yAxis
			.selectAll(".tick")
			.append("line")
			.attr("x1", -735)
			.attr("x2", 0)
			.attr("y1", 0)
			.attr("y2", 0)
			.attr("stroke", "#E0E0E0")
			.attr("stroke-width", 1)
			.attr("stroke-dasharray", "5,5");

		// Création des barres
		(["kilogram", "calories"] as DataType[]).forEach(
			(type: DataType, i: number) => {
				g.selectAll(`.bar-${type}`)
					.data(data.sessions)
					.enter()
					.append("path")
					.attr("class", `bar-${type}`)
					.attr("d", (d) => {
						const x =
							(xScale(d.day) as number) +
							xScale.bandwidth() / 2 +
							(i * 14 - 7) -
							3;
						const y = (type === "kilogram" ? yScaleKilogram : yScaleCalories)(
							d[type]
						) as number;
						const baseY = 222;
						const height = baseY - y;
						const width = 6;
						const radius = 3;
						return `M${x},${y + radius} 
                    v-${radius}
                    a${radius},${radius} 0 0 1 ${radius},${-radius} 
                    h${width - 2 * radius} 
                    a${radius},${radius} 0 0 1 ${radius},${radius} 
                    v${height - radius} 
                    h-${width} 
                    z`;
					})
					.attr("stroke", type === "kilogram" ? "black" : "red")
					.attr("fill", type === "kilogram" ? "black" : "red");
			}
		);

		svg
			.append("text")
			.attr("x", 100)
			.attr("y", 30)
			.text("Activité quotidienne")
			.style("font-weight", "500");

		const legend = svg.append("g");

		["Poids (kg)", "Calories brûlées (kCal)"].forEach((text, i) => {
			legend
				.append("circle")
				.attr("cx", 555 + i * 105)
				.attr("cy", 25)
				.attr("r", 4)
				.attr("fill", i === 0 ? "black" : "#E60000");

			legend
				.append("text")
				.attr("x", 570 + i * 105)
				.attr("y", 30)
				.attr("fill", "#74798C")
				.style("font-size", "14px")
				.text(text);
		});
	}, [data]);

	return <svg ref={svgRef}></svg>;
};

export default BarChart;
