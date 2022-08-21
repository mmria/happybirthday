import gsap from 'gsap';
import { SplitText } from '../libs/splitText';
import scrollProxy from './scrollProxy';

const splitTextInit = () => {
	const titles = document.querySelectorAll('.section_title');

	gsap.registerPlugin(SplitText);

	titles.forEach((title) => {
		const split = new SplitText(title, {
			type: 'lines, chars',
			charsClass: 'section_title__char',
			linesClass: 'section_title__line',
		});

		gsap.set(split.chars, {
			opacity: 0,
		});
	});

	setTimeout(() => {
		scrollProxy();
	});
};

export default splitTextInit;
