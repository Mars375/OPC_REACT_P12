import { ReactNode } from "react";
import { Header, Menu } from "../index";
import * as Icons from "../../assets/icons";

interface LayoutProps {
	children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const icons = [
		{ src: Icons.MedidateIcon, alt: "Méditation" },
		{ src: Icons.SwimIcon, alt: "Natation" },
		{ src: Icons.BikeIcon, alt: "Vélo" },
		{ src: Icons.DumbellIcon, alt: "Haltère" },
	];

	return (
		<>
			<Header />
			<div className='flex'>
				<Menu icons={icons} />
				<main className='flex-grow'>{children}</main>
			</div>
		</>
	);
};

export default Layout;
