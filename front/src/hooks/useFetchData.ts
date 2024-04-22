import { useEffect, useState } from "react";
import { ApiService } from "../services/apiService";
import { mockApi } from "../__mocks__/mockApi";
import { formatData } from "../utils/dataFormatters";
import { filterData } from "../utils/dataFiltered";

const apiService = new ApiService();

export const useFetchData = <T>(
	mock: boolean,
	service: keyof ApiService,
	userId: number
) => {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | unknown>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = mock
					? await mockApi(service)
					: await apiService[service](userId);
				const filteredData = filterData(response, userId);
				if (filteredData) {
					const formattedData = formatData(service, filteredData);
					setData(formattedData as T);
				} else {
					throw new Error(`No data found for the provided user id: ${userId}`);
				}
			} catch (error: unknown) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [mock, service, userId]);

	return { data, loading, error };
};

export default useFetchData;
