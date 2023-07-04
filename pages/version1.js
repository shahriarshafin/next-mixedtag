import SectionTitle from '@/components/SectionTitle';
import Layout from '@/components/layout';
import { useState } from 'react';
import { AiFillGithub, AiOutlineSearch } from 'react-icons/ai';
import { BiChevronDown } from 'react-icons/bi';
import { commitList } from '../data';

const Version1 = () => {
	const [inputValue, setInputValue] = useState('');
	const [selected, setSelected] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const filteredCommitList = commitList.filter((commit) =>
		commit.commitMessage.toLowerCase().startsWith(inputValue)
	);

	const handleCommitSelection = (commit) => {
		const commitMessage = commit.commitMessage;
		const authorName = commit.authorName;
		if (commitMessage.toLowerCase() !== selected.toLowerCase()) {
			setSelected(`${authorName}, ${commitMessage}`);
			setIsOpen(false);
			setInputValue('');
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (selected) {
			const selectedItem = commitList.find((item) =>
				selected.includes(item.commitMessage)
			);
			console.log(
				`Author: ${selectedItem.authorName} and Commit Message: ${selectedItem.commitMessage}`
			);
			setSelected('');
		}
	};

	return (
		<Layout>
			<section>
				<SectionTitle title='The Commit Finder' />

				<form
					onSubmit={handleSubmit}
					className='flex items-center gap-x-2 justify-between rounded'
				>
					<div className='flex items-center w-11/12 bg-white shadow-lg rounded'>
						<input
							type='text'
							readOnly
							value={selected}
							placeholder='Write your message with response variables'
							className='form-control'
							onClick={() => setIsOpen(!isOpen)}
						/>
						<BiChevronDown size={20} className={isOpen && 'rotate-180'} />
					</div>

					<input value='SUBMIT' className='btn' type='submit' />
				</form>

				<ul
					className={`bg-white mt-2 overflow-y-auto px-4 rounded shadow-lg ${
						isOpen ? 'max-h-80' : 'max-h-0'
					}`}
				>
					<div className='py-4 sticky top-0'>
						<div className='flex items-center px-2 bg-white border border-slate-900 rounded'>
							<AiOutlineSearch size={18} className='text-gray-700' />
							<input
								type='text'
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value.toLowerCase())}
								placeholder='enter commit message'
								className='placeholder:text-gray-300 p-2 outline-none w-full'
							/>
						</div>
					</div>

					{filteredCommitList.map((commit) => (
						<li
							key={commit.id}
							className='p-2 text-sm hover:bg-gray-200 cursor-pointer'
							onClick={() => handleCommitSelection(commit)}
						>
							<div className='flex items-center border rounded p-2'>
								<AiFillGithub size={25} className='mr-2' />
								Author
								<span className='text-slate-400 ml-1'>
									ex:{commit.commitMessage}
								</span>
							</div>
						</li>
					))}
				</ul>
			</section>
		</Layout>
	);
};

export default Version1;
