import { FC } from "react";

interface CardProps {
	icon: string;
	value: string;
	description: string;
	color: string;
}

// Card component that displays an icon, value, and description with a background color
const Card: FC<CardProps> = ({ icon, value, description, color }) => {
	return (
		<div className='flex items-center bg-[#FBFBFB] p-8 rounded w-56'>
			<div
				style={{ backgroundColor: `rgb(${color})` }}
				className='flex items-center justify-center rounded-md p-4'
			>
				<img src={icon} alt='Icon' className='w-4 h-4' />
			</div>
			<div className='ml-4'>
				<p className='font-bold text-xl'>{value}</p>
				<p>{description}</p>
			</div>
		</div>
	);
};

export default Card;
