import { useCallback, useRef } from 'react';
import { MixedTags } from '@yaireo/tagify/dist/react.tagify';

const tagifySettings = {
	pattern: /@/,
	templates: {
		tag(tagData, tagify) {
			return `
        <tag
          title="${tagData.title}"
          contenteditable=${false}
          style="pointer-events: none"
          suppressContentEditableWarning=false
          spellcheck='false'
          tabIndex="${this.settings.a11y.focusableTags ? 0 : -1}"
          class="${this.settings.classNames.tag}"
          ${this.getAttributes(tagData)}
        >
          <x
            title=''
            class="${this.settings.classNames.tagX}"
            role='button'
            aria-label='remove tag'
            style="pointer-events: visible"
          ></x>

          <div class="flex items-center">
            <img class="h-4 w-4 mr-[3px]" src="${tagData.imgUrl}">
            <p class="text-sm">
              <span class="font-semibold text-[#2d2e2e]">${
								tagData.title
							}:</span>
              <span class="ml-1 text-gray-400">${tagData.value}</span>
            </p>
          </div>
        </tag>
      `;
		},
	},
};

const ResponseVar = () => {
	const tagifyRef = useRef();

	const onChange = useCallback((e) => {
		console.log('CHANGED:', e.detail.value);
		console.log('CHANGED:', e.detail.tagify.value);
	}, []);

	const handleCreateNewTag = (tagTitle, tagValue, tagLogo) => {
		const tagElm = tagifyRef.current.createTagElem({
			title: tagTitle,
			value: tagValue,
			imgUrl: tagLogo,
		});
		tagifyRef.current.injectAtCaret(tagElm);
		const elm = tagifyRef.current.insertAfterTag(tagElm);
		tagifyRef.current.placeCaretAfterNode(elm);
	};

	return (
		<div className='max-w-5xl mx-auto py-10'>
			<MixedTags
				autoFocus={true}
				settings={tagifySettings}
				className='myTags'
				onChange={onChange}
				value={''}
				tagifyRef={tagifyRef}
				placeholder='Enter text or add tag...'
			/>

			<button
				className='bg-gray-200 px-3 py-2 rounded mt-3'
				onClick={() =>
					handleCreateNewTag('Commit', 'd36drfghwe0237', './github.png')
				}
			>
				Add New Tag
			</button>
		</div>
	);
};

export default ResponseVar;
