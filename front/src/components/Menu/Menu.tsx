import { IconButton } from "../index";

interface Icon {
	src: string;
	alt: string;
	href: string;
}

interface MenuProps {
	icons: Icon[];
}

const Menu: React.FC<MenuProps> = ({ icons }) => {
	return (
		<nav className='w-28 min-h-[calc(100vh_-_6rem)] bg-[#020203] flex flex-col items-center py-20 justify-between'>
			<div className='flex flex-col justify-center gap-5'>
				{icons.map((icon, index) => (
					<a key={index} href={icon.href}>
						<IconButton icon={icon.src} alt={icon.alt} />
					</a>
				))}
			</div>
			<p className='text-xs font-medium text-white -rotate-90 text-nowrap pr-4'>
				Copiryght, SportSee 2020
			</p>
		</nav>
	);
};

export default Menu;
