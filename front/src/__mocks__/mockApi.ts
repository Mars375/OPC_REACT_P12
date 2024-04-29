import {
	USER_MAIN_DATA,
	USER_ACTIVITY,
	USER_AVERAGE_SESSIONS,
	USER_PERFORMANCE,
} from "./mockData";
import { ApiService } from "../services/apiService";

export const mockApi = async (service: keyof ApiService, userId: number) => {
	switch (service) {
		case "getUserData":
			return USER_MAIN_DATA.find((data) => data.id === userId);
		case "getUserActivity":
			return USER_ACTIVITY.find((data) => data.userId === userId);
		case "getUserAverageSessions":
			return USER_AVERAGE_SESSIONS.find((data) => data.userId === userId);
		case "getUserPerformance":
			return USER_PERFORMANCE.find((data) => data.userId === userId);
		default:
			return null;
	}
};
