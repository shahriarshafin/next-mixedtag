import { AiFillGithub } from 'react-icons/ai';

const SectionTitle = ({ title }) => {
	return (
		<div className='flex items-center justify-center mb-16'>
			<h1 className='font-bold text-xl md:text-3xl lg:text-5xl text-slate-900'>
				{title}
			</h1>
			<AiFillGithub size={45} className='ml-2' />
		</div>
	);
};

export default SectionTitle;
