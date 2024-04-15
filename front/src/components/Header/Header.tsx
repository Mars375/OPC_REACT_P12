const Header: React.FC = () => {
	const navItems = ["Accueil", "Profil", "Réglage", "Communauté"];
	return (
		<div className='flex justify-between items-center h-24 bg-[#020203]'>
			<img src='./logo.png' alt="Logo de l'entreprise" className='h-16 w-44' />
			<nav className='flex w-9/12 justify-around'>
				{navItems.map((item, index) => (
					<a key={index} href='#' className='text-white text-2xl font-medium'>
						{item}
					</a>
				))}
			</nav>
		</div>
	);
};

export default Header;
