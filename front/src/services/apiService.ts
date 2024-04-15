import axios from "axios";

export class ApiService {
	private API_URL = "https://my-api.com";

	public async getData() {
		try {
			const response = await axios.get(`${this.API_URL}/data-endpoint`);
			return response.data;
		} catch (error) {
			console.error("Error fetching data", error);
			return null;
		}
	}
}
