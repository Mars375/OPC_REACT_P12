interface IconButtonProps {
	icon: string;
	alt: string;
	size?: string;
	borderRadius?: string;
	backgroundColor?: string;
}

function IconButton({
	icon,
	alt,
	size = "w-16 h-16",
	borderRadius = "rounded-md",
	backgroundColor = "bg-[#fff]",
}: IconButtonProps) {
	return (
		<button
			className={`${backgroundColor} ${borderRadius} ${size} flex justify-center items-center`}
		>
			<img src={icon} alt={alt} />
		</button>
	);
}

export default IconButton;
