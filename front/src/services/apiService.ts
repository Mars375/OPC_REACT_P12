import axios from "axios";

export class ApiService {
	private API_URL = "http://localhost:3000"; // Base URL for the API

	/**
	 * Fetch user data by userId
	 * @param {number} userId - The ID of the user
	 * @returns {Promise<Object | null>} The user data
	 */
	public async getUserData(userId: number): Promise<object | null> {
		try {
			const response = await axios.get(`${this.API_URL}/user/${userId}`);
			return response.data;
		} catch (error) {
			console.error("Error fetching user data", error);
			return null;
		}
	}

	/**
	 * Fetch user activity by userId
	 * @param {number} userId - The ID of the user
	 * @returns {Promise<Object | null>} The user activity data
	 */
	public async getUserActivity(userId: number): Promise<object | null> {
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

	/**
	 * Fetch user average sessions by userId
	 * @param {number} userId - The ID of the user
	 * @returns {Promise<Object | null>} The user average sessions data
	 */
	public async getUserAverageSessions(userId: number): Promise<object | null> {
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

	/**
	 * Fetch user performance by userId
	 * @param {number} userId - The ID of the user
	 * @returns {Promise<Object | null>} The user performance data
	 */
	public async getUserPerformance(userId: number): Promise<object | null> {
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
