import { commitList } from "..//data";
import Tagify from "@yaireo/tagify";
import React, { useEffect, useRef, useState } from "react";
import { AiFillGithub, AiOutlineSearch } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import SectionTitle from "./SectionTitle";

const TagInput = () => {
	const [isOpen, setIsOpen] = useState(false);
	const inputRef = useRef(null);
	const tagifyRef = useRef(null);
	const [searchText, setSearchText] = useState("");

	useEffect(() => {
		if (inputRef.current && !tagifyRef.current) {
			tagifyRef.current = new Tagify(inputRef.current, {
				mode: "mix",
			});
		}
	}, []);

	const addTagFromCommit = (commitMessage) => {
		if (tagifyRef.current) {
			tagifyRef.current.addTags(` ${commitMessage}`);
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		toast.success("Success! Check your console");
		const inputStr = inputRef.current.value;

		const result = inputStr
			.replace(/\[\[{"value":"Author Name: (.+?)"\}\]\]/g, "$1")
			.replace(/\[\[{"value":"Commit Message: (.+?)"\}\]\]/g, " $1");

		console.log(result);
	};

	return (
		<>
			<section>
				<SectionTitle title="The Commit Finder" />

				<form onSubmit={handleSubmit}>
					<div onClick={() => setIsOpen(true)} className="flex w-full gap-2">
						<textarea
							name="tags-manual-suggestions"
							ref={inputRef}
							className="bg-white shadow-lg rounded border border-slate-900 w-full placeholder:text-gray-300"
							placeholder="Write your message with responsive variables"
						/>
						<input value="SUBMIT" className="btn" type="submit" />
					</div>

					<ul
						className={`bg-white mt-2 overflow-y-auto px-4 rounded shadow-lg ${
							isOpen ? "max-h-80" : "max-h-0"
						}`}
					>
						<div className="py-4 sticky top-0 bg-white z-10">
							<div className="flex items-center px-2 bg-white border border-slate-900 rounded">
								<AiOutlineSearch size={18} className="text-gray-700" />
								<input
									type="text"
									placeholder="search"
									className="placeholder:text-gray-300 p-2 outline-none w-full bg-white"
									value={searchText}
									onChange={(e) => setSearchText(e.target.value)}
								/>
							</div>
						</div>

						{commitList
							.filter(
								({ commitMessage, authorName }) =>
									commitMessage
										.toLowerCase()
										.includes(searchText.toLowerCase()) ||
									authorName.toLowerCase().includes(searchText.toLowerCase())
							)
							.map(({ commitMessage, authorName }, idx) => (
								<React.Fragment key={idx}>
									<li
										className="bg-white p-2 text-sm transition-transform transform ease-in hover:scale-[1.02] cursor-pointer"
										onClick={() => {
											inputRef.current.value = "Author Name: " + authorName;
											addTagFromCommit("Author Name: " + authorName);
										}}
									>
										<div className="flex items-center border rounded p-2">
											<AiFillGithub size={25} className="mr-2" />
											Author
											<span className="text-slate-400 ml-1">
												ex:{authorName}
											</span>
										</div>
									</li>

									<li
										className="bg-white p-2 text-sm transition-transform transform ease-in hover:scale-[1.02] cursor-pointer"
										onClick={() => {
											inputRef.current.value =
												"Commit Message: " + commitMessage;
											addTagFromCommit("Commit Message: " + commitMessage);
										}}
									>
										<div className="flex items-center border rounded p-2">
											<AiFillGithub size={25} className="mr-2" />
											Commit
											<span className="text-slate-400 ml-1">
												ex:{commitMessage}
											</span>
										</div>
									</li>
								</React.Fragment>
							))}
					</ul>
				</form>
			</section>

			<ToastContainer
				position="top-right"
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover={false}
				theme="light"
			/>
		</>
	);
};

export default TagInput;
