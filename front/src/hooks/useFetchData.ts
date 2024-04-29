import { useEffect, useState } from "react";
import { ApiService } from "../services/apiService";
import { mockApi } from "../__mocks__/mockApi";
import { formatData } from "../utils/dataFormatters";

const apiService = new ApiService();

export const useFetchData = <T>(
	mock: boolean,
	service: keyof ApiService,
	userId: number | undefined
) => {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | unknown>(null);

	useEffect(() => {
		if (!userId) {
			setError("No user id provided");
			setLoading(false);
			return;
		}
		const fetchData = async () => {
			try {
				const reponse = mock
					? await mockApi(service, userId)
					: await apiService[service](userId);
				const formattedData = formatData(service, reponse);
				setData(formattedData as T);
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
