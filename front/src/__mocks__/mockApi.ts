import {
	USER_MAIN_DATA,
	USER_ACTIVITY,
	USER_AVERAGE_SESSIONS,
	USER_PERFORMANCE,
} from "./mockData"; // Import mock data
import { ApiService } from "../services/apiService"; // Import ApiService type

/**
 * mockApi function simulates API calls based on the requested service and user ID.
 * @param {keyof ApiService} service - The API service to call (e.g., "getUserData").
 * @param {number} userId - The ID of the user to fetch data for.
 * @returns {Promise<{ data: any }>} - The mock data corresponding to the service and user.
 */
export const mockApi = async (service: keyof ApiService, userId: number) => {
	let response;

	// Select data based on the requested service
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
			response = null; // If the service is not recognized, set response to null
	}

	// If no data is found for the user, throw an error
	if (response === undefined) {
		throw new Error(`User with ID ${userId} not found`);
	}

	// Return the found data
	return { data: response };
};
