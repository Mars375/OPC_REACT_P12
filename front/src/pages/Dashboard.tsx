import { FC, useEffect, useState } from "react";
import { User } from "../types/types";
import { USER_MAIN_DATA } from "../services/mockApiService";

const Dashboard: FC = () => {
	const userId = 1; // Mocked user ID
	const [user, setUser] = useState<User | null>(null);

	useEffect(() => {
		const fetchUser = () => {
			const user = USER_MAIN_DATA.find((user) => user.id === userId);
			if (user) {
				setUser(user);
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
