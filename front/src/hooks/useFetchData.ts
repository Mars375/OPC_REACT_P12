import { useEffect, useState } from "react";
import { ApiService } from "../services/apiService";
import { formatData } from "../utils/dataFormatters";

const apiService = new ApiService();

export const useFetchData = <T>(service: keyof ApiService, userId: number) => {
	const [data, setData] = useState<T | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | unknown>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await apiService[service](userId);
				const formattedData = formatData(service, response);
				setData(formattedData as T);
			} catch (error: unknown) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [service, userId]);

	return { data, loading, error };
};

export default useFetchData;
