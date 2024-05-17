import { FC, useMemo, useState } from "react";
import {
	UserActivityProps,
	UserAverageSessionsProps,
	UserPerformanceProps,
	UserProps,
} from "../types/types";
import * as Icons from "../assets/icons";
import { useFetchData } from "../hooks/useFetchData";
import { ApiService } from "../services/apiService";
import {
	Error,
	Login,
	Loader,
	BarChart,
	UserGreeting,
	LineChart,
	RadialBarChart,
	Card,
} from "../components/index";
import RadarChart from "../components/D3/RadarChart/RadarChart";

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

	const getIconAndDescription = (key: string) => {
		switch (key) {
			case "calorieCount":
				return {
					icon: Icons.CalorieIcon,
					description: "Calories",
					color: "251, 234, 234",
				};
			case "proteinCount":
				return {
					icon: Icons.ProteinIcon,
					description: "Proteines",
					color: "233, 244, 251",
				};
			case "carbohydrateCount":
				return {
					icon: Icons.CarbohydrateIcon,
					description: "Glucides",
					color: "251, 246, 229",
				};
			case "lipidCount":
				return {
					icon: Icons.LipidIcon,
					description: "Lipides",
					color: "251, 234, 239",
				};
			default:
				return { icon: "", description: "", color: "" };
		}
	};

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
				<div className='p-10 xl:px-20 min-h-full flex flex-col gap-16'>
					<UserGreeting
						firstName={data?.getUserData.userInfos.firstName}
						onLogout={() => setUserId(undefined)}
					/>
					<section className='flex flex-col-reverse lg:flex-row justify-between lg:gap-0 gap-4'>
						<section className='flex flex-col lg:items-center xl:items-start lg:w-[70%] gap-4'>
							<article className='bg-[#FBFBFB] w-full rounded-md'>
								{data?.getUserActivity && (
									<BarChart data={data.getUserActivity.sessions} />
								)}
							</article>
							<section className='flex flex-col lg:flex-row w-full justify-between gap-3'>
								<article className='bg-[#FF0000] lg:w-1/3 h-64 rounded-md'>
									{data?.getUserAverageSessions && (
										<LineChart data={data.getUserAverageSessions.sessions} />
									)}
								</article>
								<article className='bg-[#282D30] lg:w-1/3 h-64  rounded-md'>
									{data?.getUserPerformance && (
										<RadarChart data={data.getUserPerformance} />
									)}
								</article>
								<article className=' bg-[#FBFBFB] lg:w-1/3 h-64 rounded-md'>
									{data?.getUserActivity &&
										data.getUserData.score !== undefined && (
											<RadialBarChart data={data.getUserData.score} />
										)}
								</article>
							</section>
						</section>
						<section className='flex lg:flex-col justify-center lg:justify-between flex-wrap gap-4 flex-grow-0'>
							{data?.getUserData &&
								Object.entries(data.getUserData.keyData).map(([key, value]) => {
									const unit = key === "calorieCount" ? "kCal" : "g";
									const { icon, description, color } =
										getIconAndDescription(key);

									return (
										<Card
											key={key}
											icon={icon}
											value={`${value}${unit}`}
											description={description}
											color={color}
										/>
									);
								})}
						</section>
					</section>
				</div>
			)}
		</>
	);
};

export default Dashboard;
