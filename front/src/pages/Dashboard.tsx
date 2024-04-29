import { FC, useMemo, useState } from "react";
import {
	UserActivityProps,
	UserAverageSessionsProps,
	UserPerformanceProps,
	UserProps,
} from "../types/types";
import { useFetchData } from "../hooks/useFetchData";
import { ApiService } from "../services/apiService";
import {
	Error,
	Login,
	Loader,
	BarChart,
	UserGreeting,
} from "../components/index";

const Dashboard: FC = () => {
	const [userId, setUserId] = useState<number | undefined>(undefined);
	const services: (keyof ApiService)[] = useMemo(
		() => [
			"getUserData",
			"getUserActivity",
			"getUserAverageSessions",
			"getUserPerformance",
		],
		[]
	);

	const { data, loading, error } = useFetchData<{
		getUserData: UserProps;
		getUserActivity: UserActivityProps;
		getUserAverageSessions: UserAverageSessionsProps;
		getUserPerformance: UserPerformanceProps;
	} | null>(true, services, userId);

	return (
		<>
			{!userId ? (
				<Login onLogin={(id: string) => setUserId(Number(id))} />
			) : loading ? (
				<Loader />
			) : error ? (
				<Error
					error={(error as Error).message}
					onRetry={() => setUserId(undefined)}
				/>
			) : (
				<div className='px-28 py-16 min-h-full'>
					<UserGreeting
						firstName={data?.getUserData.userInfos.firstName}
						onLogout={() => setUserId(undefined)}
					/>
					<div className='mt-10'>
						{data?.getUserActivity && <BarChart data={data.getUserActivity} />}
					</div>
				</div>
			)}
		</>
	);
};

export default Dashboard;
