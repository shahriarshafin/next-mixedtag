import Link from 'next/link';
import { useRouter } from 'next/router';

const Navbar = () => {
	const { pathname } = useRouter();

	const links = [
		{ href: '/', label: 'Version-3' },
		{ href: '/version2', label: 'Version-2' },
		{ href: '/version1', label: 'Version-1' },
	];

	return (
		<nav className='flex items-center bg-slate-300 h-14'>
			<div className='container mx-auto'>
				<ul className='font-medium text-white flex gap-5'>
					{links.map(({ href, label }) => (
						<li key={href}>
							<Link
								href={href}
								className={`${
									pathname === href ? 'bg-slate-900 ' : 'bg-slate-400 '
								} p-2 rounded hover:bg-slate-900 transition ease-in`}
							>
								{label}
							</Link>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
