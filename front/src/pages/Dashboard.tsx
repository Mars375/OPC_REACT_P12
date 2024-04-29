import { FC, useEffect, useState } from "react";
import { UserActivityProps, UserPropsFormatted } from "../types/types";
import BarChart from "../components/BarChart/BarChart";
import { useFetchData } from "../hooks/useFetchData";

const Dashboard: FC = () => {
	const [userId, setUserId] = useState<number>();
	const [inputId, setInputId] = useState("");
	const [error, setError] = useState({});
	const [user, setUser] = useState<UserPropsFormatted | null>(null);
	const [userActivity, setUserActivity] = useState<UserActivityProps | null>(
		null
	);

	const {
		data: userData,
		loading: userLoading,
		error: userError,
	} = useFetchData<UserPropsFormatted>(true, "getUserData", userId);

	const {
		data: userActivityData,
		loading: userActivityLoading,
		error: userActivityError,
	} = useFetchData<UserActivityProps>(true, "getUserActivity", userId);

	useEffect(() => {
		if (userActivityData) {
			setUserActivity(userActivityData);
		}
		if (userActivityError) {
			setError(userActivityError);
		}
	}, [userActivityData, userActivityError]);

	useEffect(() => {
		if (userData) {
			setUser(userData);
		}
		if (userError) {
			setError(userError);
		}
	}, [userData, userError]);

	const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputId(event.target.value);
	};

	const handleSubmit = () => {
		setUserId(Number(inputId));
	};

	const handleLogout = () => {
		setUser(null);
		setUserId(undefined);
		setInputId("");
		setError(false);
		window.location.reload();
	};

	return (
		<>
			{!userId && (
				<div className='flex flex-col items-center justify-center h-screen'>
					<input
						type='text'
						placeholder='Enter your id'
						value={inputId}
						onChange={handleIdChange}
						className='border-2 border-gray-400 rounded-md px-2 py-1'
					/>
					<button
						onClick={handleSubmit}
						className='bg-blue-500 text-white px-4 py-2 mt-2 rounded-md'
					>
						Submit
					</button>
				</div>
			)}
			{user ? (
				<div className='px-28 py-16 min-h-full'>
					<div className='flex justify-end'>
						<button
							onClick={handleLogout}
							className='bg-red-500 text-white px-4 py-2 rounded-md'
						>
							Logout
						</button>
					</div>
					<div className='flex flex-col gap-10'>
						<h1 className='text-5xl font-medium'>
							Bonjour <span className='text-[#ff0101]'>{user?.firstName}</span>
						</h1>
						<p className='text-lg'>
							Félicitation ! Vous avez explosé vos objectifs hier 👏
						</p>
					</div>
					<div className='mt-10'>
						{userActivity && <BarChart data={userActivity} />}
					</div>
				</div>
			) : userLoading ? (
				<p>Loading ...</p>
			) : error ? (
				<div className='flex flex-col items-center justify-center h-screen'>
					<p className='text-red-500'>{error.toString()}</p>
					<button
						onClick={handleLogout}
						className='bg-red-500 text-white px-4 py-2 rounded-md'
					>
						Back
					</button>
				</div>
			) : null}
		</>
	);
};

export default Dashboard;
