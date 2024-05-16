export default function UserGreeting({
	firstName,
	onLogout,
}: {
	firstName: string | undefined;
	onLogout: () => void;
}) {
	return (
		<div className='flex justify-between items-center'>
			<div className='flex flex-col gap-10'>
				<h1 className='text-5xl font-medium'>
					Bonjour <span className='text-[#ff0101]'>{firstName}</span>
				</h1>
				<p className='text-lg'>
					Félicitation ! Vous avez explosé vos objectifs hier 👏
				</p>
			</div>
			<button
				onClick={onLogout}
				className='bg-[#E60000] text-white px-4 py-2 rounded-md'
			>
				Logout
			</button>
		</div>
	);
}
