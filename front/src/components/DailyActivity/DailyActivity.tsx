import * as d3 from "d3";
import React, { useEffect, useRef } from "react";
import { UserActivity } from "../../types/types";

interface DailyActivityProps {
	data: UserActivity[];
}

const DailyActivity: React.FC<DailyActivityProps> = ({ data }) => {
	const ref = useRef<SVGSVGElement>(null);

	return (
		<div>
			<svg ref={ref}></svg>
		</div>
	);
};

export default DailyActivity;
