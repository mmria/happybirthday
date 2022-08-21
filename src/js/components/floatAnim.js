import gsap from 'gsap';
import { getRandomInt } from '../utils';

const floatAnim = (decors) => {
	gsap.to(decors, {
		opacity: 1,
		stagger: 0.5,
	});

	const toAnim = ($el, index) => {
		const xPos = getRandomInt(-90, 50);
		const yPos = getRandomInt(-40, 40);
		const randomScale = getRandomInt(9, 10) / 10;
		const randomRotate = getRandomInt(0, 20);
		const scale = getRandomInt(1, 3) === 1 ? 1 : randomScale; // 50% chance
		const rotateZ = getRandomInt(1, 3) > 1.5 ? randomRotate : 0;
		const opacity = getRandomInt(1, 3) === 1 ? 1 : 0;
		// const relativeDuration = Math.abs(xPos) / 10;

		gsap.to($el, {
			x: xPos,
			y: yPos,
			duration: Math.max(Math.max(Math.abs(xPos), Math.abs(yPos)) / 10, 2.2),
			scale,
			rotateZ,
			opacity,
			ease: 'none',
			delay: index / 3,
			onComplete: () => {
				toAnim($el);
			},
		});
	};

	decors.forEach(($el) => {
		toAnim($el);
	});
};

export default floatAnim;
