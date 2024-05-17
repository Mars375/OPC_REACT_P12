import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { SessionProps } from "../../../types/types";

type DataType = "kilogram" | "calories";

const BarChart = ({ data }: { data: SessionProps[] }) => {
	const svgRef = useRef<SVGSVGElement>(null);

	useEffect(() => {
		// Vérifie si la référence svg existe
		if (!svgRef.current) return;

		const resizeHandler = () => {
			// Redessiner le graphique lorsque la taille de l'écran change
			updateChart();
		};

		const updateChart = () => {
			// Définition des marges
			const margin = { top: 50, left: 40, right: 20, bottom: 30 };

			// Calcul des dimensions du graphique en fonction de la taille de la fenêtre
			const width =
				parseInt(d3.select(svgRef.current).style("width")) -
				margin.left -
				margin.right;
			const height = 263;

			// Sélection de l'élément SVG et définition de ses attributs
			const svg = d3
				.select(svgRef.current)
				.attr("width", width)
				.attr("height", height)
				.style("border-radius", "5px");

			// Suppression de tous les éléments enfants existants dans l'élément SVG
			svg.selectAll("*").remove();

			// Calcul des valeurs maximales de kilogrammes et de calories
			const maxKilogram = d3.max(data, (d) => d.kilogram) ?? 0;
			const maxCalories = d3.max(data, (d) => d.calories) ?? 0;

			// Détermination de l'étendue des données sur l'axe des x
			const extent = d3.extent(data.map((d) => d.day)) as [number, number];

			// Création de l'échelle linéaire pour l'axe des x
			const xScale = d3
				.scaleLinear()
				.domain(extent)
				.range([margin.left, width - margin.right]);

			// Création de l'échelle linéaire pour l'axe des y (kilogrammes)
			const yScaleKilogram = d3
				.scaleLinear()
				.domain([maxKilogram - 12, maxKilogram + 3])
				.range([height - margin.bottom - 20, 20]);

			// Création de l'échelle linéaire pour l'axe des y (calories)
			const yScaleCalories = d3
				.scaleLinear()
				.domain([0, maxCalories])
				.range([0, height / 2]);

			// Ajout du titre du graphique
			svg
				.append("text")
				.attr("x", width * 0.05)
				.attr("y", height * 0.09)
				.text("Activité quotidienne")
				.style("font-weight", "500");

			// Ajout de la légende
			const legend = svg.append("g");

			// Calcul de la position de départ de la légende en fonction de la largeur de l'écran
			const legendX = window.innerWidth > 1024 ? width * 0.68 : width * 0.65;

			// Création des cercles et des textes de la légende
			["Poids (kg)", "Calories brûlées (kCal)"].forEach((text, i) => {
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

			// Création d'un groupe pour le graphique et définition de sa position
			const g = svg.append("g").attr("x", margin.left);

			// Ajout de l'axe des x
			g.append("g")
				.call(d3.axisBottom(xScale).ticks(7).tickSize(0).tickPadding(20))
				.attr("transform", `translate(0, ${height - margin.bottom - 20})`)
				.attr("padding", "120px")
				.attr("color", "#DEDEDE")
				.selectAll("text")
				.attr("font-size", "1rem")
				.attr("fill", "#9B9EAC");

			// Ajout de l'axe des y (kilogrammes)
			const yAxis = g
				.append("g")
				.call(d3.axisRight(yScaleKilogram).ticks(3).tickSize(0).tickPadding(10))
				.attr("transform", `translate(${width - margin.right + 30}, 0)`)
				.attr("color", "#F5F7F9");

			// Modification du style des étiquettes de l'axe des y (kilogrammes)
			yAxis
				.selectAll(".tick text")
				.attr("font-size", "16px")
				.attr("fill", "#9B9EAC");

			// Ajout de lignes pointillées pour chaque tick de l'axe des y (kilogrammes)
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

			// Création d'un groupe pour chaque paire de barres (kilogrammes et calories)
			const barGroups = g
				.selectAll(".bar-group")
				.data(data)
				.enter()
				.append("g")
				.attr("class", "bar-group");

			// Ajout de rectangles de survol pour chaque groupe de barres
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

			// Création des barres de kilogrammes et de calories pour chaque groupe de barres
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

			// Création d'un tooltip pour afficher les valeurs de kilogrammes et de calories
			const tooltip = g.append("g").attr("class", "tooltip").attr("opacity", 0);

			tooltip
				.append("rect")
				.attr("width", 60)
				.attr("height", 90)
				.attr("fill", "#E60000");

			// Création des labels pour chaque type de données dans le tooltip
			types.forEach((type: DataType, index) => {
				tooltip
					.append("text")
					.attr("class", `tooltip-text-${type}`)
					.attr("x", 5)
					.attr("y", index === 0 ? 30 : 70)
					.style("font-size", "13px")
					.style("fill", "#fff");
			});

			// Ajout d'écouteurs d'événements pour afficher et masquer le tooltip
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

export default BarChart;
