import SectionTitle from '@/components/SectionTitle';
import Layout from '@/components/layout';
import { useState } from 'react';
import { AiFillGithub, AiOutlineSearch } from 'react-icons/ai';
import { BiChevronDown } from 'react-icons/bi';
import { WithContext as ReactTags } from 'react-tag-input';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { commitList } from '../data';

const SearchBox = () => {
	const [inputValue, setInputValue] = useState('');
	const [selected, setSelected] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [tags, setTags] = useState([]);

	const handleDelete = (i) => {
		setTags((prevTags) => prevTags.filter((tag, index) => index !== i));
	};

	const handleAddition = (tag) => {
		setTags((prevTags) => [...prevTags, tag]);
	};

	const handleCommitSelection = (commit) => {
		const commitMessage = commit.commitMessage;
		if (commitMessage.toLowerCase() !== selected.toLowerCase()) {
			setSelected(commitMessage);
			setTags((prevTags) => [
				...prevTags,
				{ id: commitMessage, text: commitMessage },
			]);
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
			console.log(`Commit Message: ${selectedItem.commitMessage}`);
			setSelected('');
			toast.success('Success! Check your console');
		}

		const tagValues = tags.map((tag) => tag.text);
		console.log(`Tag values: ${tagValues.join(', ')}`);
	};

	const filteredCommitList = commitList.filter((commit) =>
		commit.commitMessage.toLowerCase().startsWith(inputValue)
	);
	return (
		<Layout>
			<section>
				<SectionTitle title='The Commit Finder' />
				<form
					onSubmit={handleSubmit}
					className='flex items-center gap-x-2 justify-between rounded'
				>
					<div className='flex items-center w-11/12 bg-white shadow-lg rounded border border-slate-900 h-20'>
						<div
							contentEditable={true}
							suppressContentEditableWarning={true}
							role='textbox'
							spellCheck={false}
							style={{
								userSelect: 'text',
								whiteSpace: 'pre-wrap',
								overflowWrap: 'break-word',
							}}
							onClick={() => setIsOpen((prevIsOpen) => !prevIsOpen)}
							className='form-control text-slate-700'
						>
							<ReactTags
								tags={tags}
								handleDelete={handleDelete}
								handleAddition={handleAddition}
								inputFieldPosition='inline'
								allowDragDrop={false}
							/>
						</div>
						<BiChevronDown size={20} className={isOpen ? 'rotate-180' : ''} />
					</div>

					<input value='SUBMIT' className='btn' type='submit' />
				</form>
				<ul
					className={`bg-white mt-2 overflow-y-auto px-4 rounded shadow-lg ${
						isOpen ? 'max-h-80' : 'max-h-0'
					}`}
				>
					<div className='py-4 sticky top-0 bg-white z-10'>
						<div className='flex items-center px-2 bg-white border border-slate-900 rounded'>
							<AiOutlineSearch size={18} className='text-gray-700' />
							<input
								type='text'
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value.toLowerCase())}
								placeholder='enter commit message'
								className='placeholder:text-gray-300 p-2 outline-none w-full bg-white'
							/>
						</div>
					</div>

					{filteredCommitList.map((commit) => (
						<li
							key={commit.id}
							className='p-2 text-sm transition-transform transform ease-in hover:scale-[1.02] cursor-pointer'
							onClick={() => handleCommitSelection(commit)}
						>
							<div className='flex items-center border rounded p-2 hover:border-slate-500 transition ease-in'>
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

export default SearchBox;
