export default function Error({
	error,
	onRetry,
}: {
	error: string;
	onRetry: () => void;
}) {
	return (
		<div className='flex flex-col items-center justify-center h-full'>
			<p className='text-red-500'>{error.toString()}</p>
			<button
				onClick={onRetry}
				className='bg-red-500 text-white px-4 py-2 rounded-md'
			>
				Back
			</button>
		</div>
	);
}
