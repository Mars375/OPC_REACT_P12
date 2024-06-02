import { ReactNode } from "react";
import { Header, Menu } from "../index";
import * as Icons from "../../assets/icons";

interface LayoutProps {
	children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const icons = [
		{ src: Icons.MedidateIcon, alt: "Méditation", href: "/meditation" },
		{ src: Icons.SwimIcon, alt: "Natation", href: "/swimming" },
		{ src: Icons.BikeIcon, alt: "Vélo", href: "/biking" },
		{ src: Icons.DumbellIcon, alt: "Haltère", href: "/weightlifting" },
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
