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
	LineChart,
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
				<div className='px-14 py-16 min-h-full'>
					<UserGreeting
						firstName={data?.getUserData.userInfos.firstName}
						onLogout={() => setUserId(undefined)}
					/>
					<div className='flex flex-col lg:items-center xl:items-start'>
						<div className='mt-10 bg-[#FBFBFB] w-full max-w-4xl rounded-md'>
							{data?.getUserActivity && (
								<BarChart data={data.getUserActivity.sessions} />
							)}
						</div>
						<div className='mt-10 bg-[#FF0000] lg:w-full xl:w-[258px] rounded-md'>
							{data?.getUserAverageSessions && (
								<LineChart data={data.getUserAverageSessions.sessions} />
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default Dashboard;
