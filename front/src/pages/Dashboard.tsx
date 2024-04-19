import { FC, useEffect, useState } from "react";
import { UserProps, UserActivityProps } from "../types/types";
import { USER_MAIN_DATA, USER_ACTIVITY } from "../__mocks__/mockData";
import BarChart from "../components/BarChart/BarChart";
import { formatData } from "../utils/dataFormatters";

const Dashboard: FC = () => {
	const userId = 1; // Mocked user ID
	const [user, setUser] = useState<UserProps | null>(null);
	const [userActivity, setUserActivity] = useState<UserActivityProps>({
		userId: 0,
		sessions: [],
	});

	useEffect(() => {
		const fetchUser = () => {
			const user = USER_MAIN_DATA.find((user) => user.id === userId);
			const userActivity = USER_ACTIVITY.filter(
				(activity) => activity.userId === userId
			);
			const userActivityFormatted = formatData(
				"getUserActivity",
				userActivity
			) as UserActivityProps;
			if (user) {
				setUser(user);
			}
			if (userActivityFormatted) {
				setUserActivity(userActivityFormatted);
			}
		};

		fetchUser();
	}, [userId]);
	return (
		<>
			{user ? (
				<div className='px-28 py-16 min-h-full'>
					<div className='flex flex-col gap-10'>
						<h1 className='text-5xl font-medium'>
							Bonjour{" "}
							<span className='text-[#ff0101]'>{user.userInfos.firstName}</span>
						</h1>
						<p className='text-lg'>
							Félicitation ! Vous avez explosé vos objectifs hier 👏
						</p>
					</div>
					<div className='mt-10'>
						<BarChart data={userActivity} />
					</div>
				</div>
			) : (
				<div className='min-h-full flex items-center justify-center'>
					<div className='bg-white text-gray-700 font-medium rounded-lg border border-gray-300 shadow-lg p-10'>
						Désolé, nous n'avons pas pu trouver votre profil utilisateur.
					</div>
				</div>
			)}
		</>
	);
};

export default Dashboard;
