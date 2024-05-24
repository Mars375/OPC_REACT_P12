import axios from "axios";

export class ApiService {
	private API_URL = "http://localhost:3000"; // Base URL for the API

	// Fetch user data by userId
	public async getUserData(userId: number) {
		try {
			const response = await axios.get(`${this.API_URL}/user/${userId}`);
			return response.data;
		} catch (error) {
			console.error("Error fetching user data", error);
			return null;
		}
	}

	// Fetch user activity by userId
	public async getUserActivity(userId: number) {
		try {
			const response = await axios.get(
				`${this.API_URL}/user/${userId}/activity`
			);
			return response.data;
		} catch (error) {
			console.error("Error fetching user activity", error);
			return null;
		}
	}

	// Fetch user average sessions by userId
	public async getUserAverageSessions(userId: number) {
		try {
			const response = await axios.get(
				`${this.API_URL}/user/${userId}/average-sessions`
			);
			return response.data;
		} catch (error) {
			console.error("Error fetching user average sessions", error);
			return null;
		}
	}

	// Fetch user performance by userId
	public async getUserPerformance(userId: number) {
		try {
			const response = await axios.get(
				`${this.API_URL}/user/${userId}/performance`
			);
			return response.data;
		} catch (error) {
			console.error("Error fetching user performance", error);
			return null;
		}
	}
}
