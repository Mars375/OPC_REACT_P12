import { useState } from "react";

export default function Login({ onLogin }: { onLogin: (id: string) => void }) {
	const [inputId, setInputId] = useState("");

	const handleIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setInputId(event.target.value);
	};

	const handleSubmit = () => {
		onLogin(inputId);
	};

	return (
		<div className='flex flex-col items-center justify-center h-full'>
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
	);
}
