import {
	USER_MAIN_DATA,
	USER_ACTIVITY,
	USER_AVERAGE_SESSIONS,
	USER_PERFORMANCE,
} from "./mockData";
import { ApiService } from "../services/apiService";

export const mockApi = async (service: keyof ApiService) => {
	switch (service) {
		case "getUserData":
			return USER_MAIN_DATA;
		case "getUserActivity":
			return USER_ACTIVITY;
		case "getUserAverageSessions":
			return USER_AVERAGE_SESSIONS;
		case "getUserPerformance":
			return USER_PERFORMANCE;
		default:
			return null;
	}
};
