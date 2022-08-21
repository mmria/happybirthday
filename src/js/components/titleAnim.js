import gsap from 'gsap';

const titleAnim = (data) => {
	const lines = data;

	if (!lines.length) return;

	const anim = (line, index) => {
		line.classList.add('section_title__line--anim_state');
		gsap.to(line.querySelectorAll('.section_title__char'), {
			opacity: 1,
			stagger: 0.04,
			onComplete: () => {
				const nextItem = index + 1;
				if (lines[nextItem]) anim(lines[nextItem], nextItem);
			},
		});
	};

	anim(lines[0], 0);
};

export default titleAnim;
