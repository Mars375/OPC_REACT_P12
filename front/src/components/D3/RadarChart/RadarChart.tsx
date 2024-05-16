import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { UserPerformanceProps } from "../../../types/types";

const RadarChart = ({ data }: { data: UserPerformanceProps }) => {
	const svgRef = useRef<SVGSVGElement>(null);

	useEffect(() => {
		if (!svgRef.current || !data) return;

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
				.classed("radar-chart-svg", true)
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom);

			// Nettoyer le SVG
			svg.selectAll("*").remove();

			// Calcul de la plage de données maximale
			const maxDataValue = Math.max(...data.data.map((d) => d.value));

			const rScale = d3
				.scaleLinear()
				.range([0, Math.min(width, height) / 2])
				.domain([0, maxDataValue]);

			// Récupérer les catégories de données
			const categories = data.data.map((d) => d.kind);
			const numCategories = categories.length;

			// Création de l'échelle angulaire
			const angleSlice = (Math.PI * 2) / numCategories;

			// Dessiner les axes
			const axes = svg
				.selectAll(".axis")
				.data(categories)
				.enter()
				.append("g")
				.attr("class", "axis");

			axes
				.append("line")
				.attr("x1", width / 2)
				.attr("y1", height / 2)
				.attr(
					"x2",
					(d, i) =>
						width / 2 +
						rScale(maxDataValue) * Math.cos(angleSlice * i - Math.PI / 2)
				)
				.attr(
					"y2",
					(d, i) =>
						height / 2 +
						rScale(maxDataValue) * Math.sin(angleSlice * i - Math.PI / 2)
				)
				.attr("stroke", "white")
				.attr("stroke-width", "2px");
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

	return <svg ref={svgRef} className='w-full' />;
};

export default RadarChart;
