import { useEffect, useState } from "react";
import { ApiService } from "../services/apiService";
import { mockApi } from "../__mocks__/mockApi";
import { formatData } from "../utils/dataFormatters";

const apiService = new ApiService();

export const useFetchData = <T>(
	mock: boolean,
	services: Array<keyof ApiService>,
	userId: number | undefined
) => {
	const [data, setData] = useState<T | null>(null); // State to store fetched data
	const [loading, setLoading] = useState<boolean>(true); // State to manage loading status
	const [error, setError] = useState<string | unknown>(null); // State to store any error

	useEffect(() => {
		if (!userId) {
			// If no userId is provided, reset states and stop loading
			setData(null);
			setError(null);
			setLoading(false);
			return;
		}

		const fetchData = async () => {
			try {
				// Fetch data from the provided services
				const responses = await Promise.all(
					services.map((s) =>
						mock ? mockApi(s, userId) : apiService[s](userId)
					)
				);

				// Format the fetched data
				const formattedData = responses.reduce((acc, response, index) => {
					const service = services[index];
					acc[service] = formatData(service, response.data);
					return acc;
				}, {});

				setData(formattedData as T); // Set the formatted data
			} catch (error: unknown) {
				setError(error); // Set any error that occurred during fetch
			} finally {
				setLoading(false); // Set loading to false after fetch is complete
			}
		};

		fetchData(); // Call the fetchData function
	}, [mock, services, userId]); // Dependencies for useEffect

	return { data, loading, error }; // Return the state values
};

export default useFetchData;
