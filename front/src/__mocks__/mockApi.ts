import {
	USER_MAIN_DATA,
	USER_ACTIVITY,
	USER_AVERAGE_SESSIONS,
	USER_PERFORMANCE,
} from "./mockData";
import { ApiService } from "../services/apiService";

export const mockApi = async (service: keyof ApiService, userId: number) => {
	let response;
	switch (service) {
		case "getUserData":
			response = USER_MAIN_DATA.find((data) => data.id === userId);
			break;
		case "getUserActivity":
			response = USER_ACTIVITY.find((data) => data.userId === userId);
			break;
		case "getUserAverageSessions":
			response = USER_AVERAGE_SESSIONS.find((data) => data.userId === userId);
			break;
		case "getUserPerformance":
			response = USER_PERFORMANCE.find((data) => data.userId === userId);
			break;
		default:
			response = null;
	}

	if (response === undefined) {
		throw new Error(`User with ID ${userId} not found`);
	}

	return { data: response };
};
