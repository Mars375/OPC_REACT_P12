import { ApiService } from "../services/apiService";
import { DataType } from "../types/types";

export const filterData = (
	service: keyof ApiService,
	data: DataType[],
	id: number
) => {
	switch (service) {
		case "getUserData":
			return data.find((user) => user.id === id);
		case "getUserActivity":
			return data.filter((activity) => activity.userId === id);
		case "getUserAverageSessions":
			return data.filter((activity) => activity.userId === id);
		case "getUserPerformance":
			return data.filter((performance) => performance.userId === id);

		default:
			return data;
	}
};
