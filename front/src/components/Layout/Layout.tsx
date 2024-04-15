import { ReactNode } from "react";
import { Header, Menu } from "../index";
import Icon1 from "../../assets/icons/Medidate.svg";
import Icon2 from "../../assets/icons/Swim.svg";
import Icon3 from "../../assets/icons/Bike.svg";
import Icon4 from "../../assets/icons/Dumbell.svg";

interface LayoutProps {
	children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
	const icons = [
		{ src: Icon1, alt: "Méditation" },
		{ src: Icon2, alt: "Natation" },
		{ src: Icon3, alt: "Vélo" },
		{ src: Icon4, alt: "Haltère" },
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
