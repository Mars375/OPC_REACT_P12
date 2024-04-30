import * as d3 from "d3";
import { useEffect, useRef } from "react";
import { SessionProps } from "../../types/types";

type DataType = "kilogram" | "calories";

const BarChart = ({ data }: { data: SessionProps[] }) => {
	const svgRef = useRef<SVGSVGElement>(null);

	useEffect(() => {
		// Vérifie si la référence svg existe
		if (!svgRef.current) return;

		const margin = { top: 50, left: 50, right: 20, bottom: 20 };

		// Définition des dimensions maximales du graphique
		const maxWidth = 800;
		const maxHeight = 400;

		// Calcul des dimensions du graphique en fonction de la taille de la fenêtre
		const width = Math.min(window.innerWidth * 0.6, maxWidth);
		const height = Math.min(window.innerHeight * 0.3, maxHeight);

		// Sélection de l'élément SVG et définition de ses attributs
		const svg = d3
			.select(svgRef.current)
			.attr("width", width)
			.attr("height", height)
			.style("background-color", "#FBFBFB")
			.style("border-radius", "5px");

		// Suppression de tous les éléments enfants existants dans l'élément SVG
		svg.selectAll("*").remove();

		// Création d'un groupe pour le graphique et définition de sa position
		const g = svg.append("g");

		// Calcul des valeurs maximales de kilogrammes et de calories
		const maxKilogram = d3.max(data, (d) => d.kilogram) ?? 0;
		const maxCalories = d3.max(data, (d) => d.calories) ?? 0;

		// Détermination de l'étendue des données sur l'axe des x
		const extent = d3.extent(data.map((d) => d.day)) as [number, number];

		// Création de l'échelle linéaire pour l'axe des x
		const xScale = d3
			.scaleLinear()
			.domain(extent)
			.range([margin.left, width - margin.right - 50]);

		// Création de l'échelle linéaire pour l'axe des y (kilogrammes)
		const yScaleKilogram = d3
			.scaleLinear()
			.domain([maxKilogram - 12, maxKilogram + 3])
			.range([height - margin.bottom - 20, 0]);

		// Création de l'échelle linéaire pour l'axe des y (calories)
		const yScaleCalories = d3
			.scaleLinear()
			.domain([0, maxCalories])
			.range([0, height / 2]);

		// Ajout de l'axe des x
		g.append("g")
			.call(d3.axisBottom(xScale).ticks(7).tickSize(0).tickPadding(20))
			.attr("transform", `translate(0, ${height - margin.bottom - 20})`)
			.attr("color", "#DEDEDE")
			.selectAll("text")
			.attr("font-size", "1rem")
			.attr("fill", "#9B9EAC");

		// Ajout de l'axe des y (kilogrammes)
		const yAxis = g
			.append("g")
			.call(d3.axisRight(yScaleKilogram).ticks(3).tickSize(0).tickPadding(20))
			.attr("transform", `translate(${width - margin.left}, 0)`)
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
			.attr("x1", -width + 100)
			.attr("x2", -margin.right)
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
			.attr("class", "bar-group")
			.on("mouseover", function (event, d) {
				const [x, y] = d3.pointer(event);
				const xPosition = xScale(+d.day) + 50;
				const tooltipX = xPosition > width - 100 ? width - 170 : xPosition;

				d3.select(this).selectAll(".hover-rect").style("opacity", 0.2);

				d3.select(this)
					.selectAll(".tooltip")
					.style("opacity", 1)
					.attr("transform", `translate(${tooltipX}, ${y})`);
			})
			.on("mouseout", function () {
				d3.select(this).selectAll(".hover-rect").style("opacity", 0);
				d3.select(this).selectAll(".tooltip").style("opacity", 0);
			});

		// Ajout de rectangles de survol pour chaque groupe de barres
		barGroups
			.append("rect")
			.attr("class", "hover-rect")
			.attr("x", (d) => xScale(+d.day) - 35)
			.attr("y", 40)
			.attr("width", 80)
			.attr("height", height - margin.bottom - 58)
			.attr("fill", "gray")
			.attr("opacity", 0);

		// Tableau des types de données (kilogrammes et calories)
		const types: DataType[] = ["kilogram", "calories"];

		// Création des barres de kilogrammes et de calories pour chaque groupe de barres
		types.forEach((type: DataType, index) => {
			barGroups
				.append("path")
				.attr("class", `bar-${type}`)
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
				.attr("stroke", type === "kilogram" ? "black" : "red")
				.attr("fill", type === "kilogram" ? "black" : "red");
		});

		// Création d'un tooltip pour afficher les valeurs de kilogrammes et de calories
		const tooltip = barGroups
			.append("g")
			.attr("class", "tooltip")
			.attr("opacity", 0);

		tooltip
			.append("rect")
			.attr("y", 0)
			.attr("width", 60)
			.attr("height", 90)
			.attr("fill", "red");

		// Tableau des types de données pour les labels du tooltip (kilogrammes et calories)
		const labels: DataType[] = ["kilogram", "calories"];

		// Création des labels pour chaque type de données dans le tooltip
		labels.forEach((type: DataType) => {
			tooltip
				.append("text")
				.attr("class", "tooltip-text")
				.attr("x", 7)
				.attr("y", type === "kilogram" ? 30 : 70)
				.style("font-size", "13px")
				.style("fill", "#fff")
				.text((d) =>
					type === "kilogram" ? `${d.kilogram}Kg` : `${d.calories}Kcal`
				);
		});

		// Ajout du titre du graphique
		svg
			.append("text")
			.attr("x", width * 0.12)
			.attr("y", height * 0.09)
			.text("Activité quotidienne")
			.style("font-weight", "500");

		// Ajout de la légende
		const legend = svg.append("g");

		// Calcul de la position de départ de la légende en fonction de la largeur de l'écran
		const legendX = window.innerWidth > 1024 ? width * 0.7 : width * 0.65;

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
	}, [data]);

	return <svg ref={svgRef}></svg>;
};

export default BarChart;
