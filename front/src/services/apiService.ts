import axios from "axios";

export class ApiService {
	private API_URL = "http://localhost:3000";

	public async getUserData(userId: number) {
		try {
			const response = await axios.get(`${this.API_URL}/user/${userId}`);
			return response.data;
		} catch (error) {
			console.error("Error fetching user data", error);
			return null;
		}
	}

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
