import { IconButton } from "../index";

interface Icon {
	src: string;
	alt: string;
}

interface MenuProps {
	icons: Icon[];
}

const Menu: React.FC<MenuProps> = ({ icons }) => {
	return (
		<div className='w-28 h-[calc(100vh_-_6rem)] bg-[#020203] flex flex-col items-center py-20'>
			<div className='flex flex-col justify-center flex-grow gap-5'>
				{icons.map((icon, index) => (
					<IconButton key={index} icon={icon.src} alt={icon.alt} />
				))}
			</div>
			<p className='text-xs font-medium text-white -rotate-90 text-nowrap'>
				Copiryght, SportSee 2020
			</p>
		</div>
	);
};

export default Menu;
