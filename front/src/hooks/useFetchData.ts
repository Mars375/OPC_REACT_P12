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
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | unknown>(null);

	useEffect(() => {
		if (!userId) {
			setData(null);
			setError(null);
			setLoading(false);
			return;
		}

		const fetchData = async () => {
			try {
				const responses = await Promise.all(
					services.map((s) =>
						mock ? mockApi(s, userId) : apiService[s](userId)
					)
				);

				const formattedData = responses.reduce((acc, response, index) => {
					const service = services[index];
					acc[service] = formatData(service, response.data);
					return acc;
				}, {});

				setData(formattedData as T);
			} catch (error: unknown) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [mock, services, userId]);

	return { data, loading, error };
};

export default useFetchData;
