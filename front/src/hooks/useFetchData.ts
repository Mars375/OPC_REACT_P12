import { useEffect, useState } from "react";
import { ApiService } from "../services/apiService";
import { mockApi } from "../__mocks__/mockApi";
import { formatData } from "../utils/dataFormatters";

const apiService = new ApiService();

/**
 * Custom hook to fetch data from API or mock API.
 * @param {boolean} mock - Whether to use mock API.
 * @param {Array<keyof ApiService>} services - List of services to fetch data from.
 * @param {number | undefined} userId - The ID of the user.
 * @returns {{ data: T | null, loading: boolean, error: string | unknown }} The fetched data, loading status, and error.
 */

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
				const formattedData = responses.reduce(
					(acc, response, index) => {
						const service = services[index];
						if (response) {
							(acc as Record<keyof ApiService, any>)[service] = formatData(
								service,
								(response as any).data
							);
						}
						return acc;
					},
					{} as Record<keyof ApiService, any>
				);

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
