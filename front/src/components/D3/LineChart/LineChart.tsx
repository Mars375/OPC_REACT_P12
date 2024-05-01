import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { AverageSessionProps } from "../../../types/types";

const LineChart = ({ data }: { data: AverageSessionProps[] }) => {
	const svgRef = useRef<SVGSVGElement>(null);

	useEffect(() => {
		if (!svgRef.current || !data.length) return;

		const margin = { top: 30, left: 20, right: 20, bottom: 35 };

		const resizeHandler = () => {
			// Redessiner le graphique lorsque la taille de l'écran change
			updateChart();
		};

		const updateChart = () => {
			// Déterminer les dimensions en fonction de la taille de l'écran
			const width =
				parseInt(d3.select(svgRef.current).style("width")) -
				margin.left -
				margin.right;
			const height = 198;

			// Créer le SVG avec les dimensions calculées
			const svg = d3
				.select(svgRef.current)
				.classed("line-chart-svg", true)
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom);

			// Nettoyer le SVG
			svg.selectAll("*").remove();

			// Ajouter le titre
			svg
				.append("text")
				.attr("fill", "#fff")
				.attr("x", margin.left)
				.attr("y", margin.top)
				.text("Durée moyenne des sessions")
				.style("font-size", "1rem");

			// Échelle X
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

			// Ajouter l'axe X
			svg
				.append("g")
				.call(xAxis)
				.attr("color", "#fff")
				.attr("transform", `translate(0, ${height + margin.top - 10})`)
				.attr("font-size", "1rem")
				.select(".domain")
				.remove();

			// Échelle Y
			const domain = d3.max(data, (d) => d.sessionLength) as number;
			const yScale = d3
				.scaleLinear()
				.domain([0, domain * 4])
				.range([height, margin.top]);

			// Ligne du graphique
			const line = d3
				.line<AverageSessionProps>()
				.x((d, i) => xScale(i))
				.y((d) => yScale(d.sessionLength) - 20)
				.curve(d3.curveMonotoneX);

			// Ajouter la ligne au SVG
			const path = svg
				.append("path")
				.datum(data)
				.attr("d", line)
				.attr("stroke", "#fff")
				.attr("stroke-width", 2)
				.attr("fill", "none");
		};

		// Appeler la fonction de mise à jour initiale du graphique
		updateChart();

		// Écouter l'événement de redimensionnement de la fenêtre
		window.addEventListener("resize", resizeHandler);

		// Retirer l'écouteur d'événement lors du nettoyage
		return () => {
			window.removeEventListener("resize", resizeHandler);
		};
	}, [data]);

	return <svg ref={svgRef} className='w-full'></svg>;
};

export default LineChart;
