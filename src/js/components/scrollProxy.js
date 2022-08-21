import gsap from 'gsap';
import Observer from 'gsap/Observer';
import { getWindowSize } from '../utils';
import floatAnim from './floatAnim';

import titleAnim from './titleAnim';

import { DrawSVGPlugin } from '../libs/drawSVG';

const scrollProxy = () => {
	gsap.registerPlugin(Observer, DrawSVGPlugin);

	const proxy = document.querySelector('.scrollWrap');
	const slides = document.querySelectorAll('section');

	let currentSlide = 0;
	let currentOffset = 0;
	let prevSlide = 0;
	const { windowWidth } = getWindowSize();

	let isTransition = false;
	const titlesData = [];

	// ---------------------------------------------Easings
	const titleAnimDelay = 2000;
	// ---------------------------------------------Easings###

	// --------------------------------------------- Float
	const floatDecors = Array.from(document.querySelectorAll('.floatDecor')).reverse();
	gsap.set(floatDecors, {
		opacity: 0,
	});
	// --------------------------------------------- Float###

	// --------------------------------------------- Slide 1

	const greetingDecors = document.querySelectorAll('.greetingDecor');
	const greetingTl = gsap.timeline({ paused: true });

	gsap.set(greetingDecors, {
		opacity: 0,
		scale: 0.96,
	});

	greetingTl
		.to(greetingDecors, {
			opacity: 1,
			duration: 0.8,
			ease: 'power1.inOut',
			scale: 1,
			onComplete: () => {
				setTimeout(() => {
					titleAnim(titlesData[0]);
					setTimeout(() => {
						floatAnim(floatDecors);
					}, 4000);
				}, 300);
			},
		});

	const input = document.querySelector('.input');
	const btn = document.querySelector('.button');

	btn.addEventListener('click', () => {
		if (input.value === '1234') {
			setTimeout(() => {
				greetingTl.play();
			}, 1600);
		}
	});

	// --------------------------------------------- Slide #1###

	// --------------------------------------------- Slide 2
	const travelingVideos = Array.from(document.querySelectorAll('.travelingVideo')).reverse();
	const travelingTl = gsap.timeline({ paused: true });

	gsap.set(travelingVideos, {
		opacity: 0,
		xPercent: 100,
	});

	travelingTl
		.to(travelingVideos[0], {
			opacity: 1,
			xPercent: 0,
			duration: 1,
			onStart: () => {
				travelingVideos[0].play();
			},
		})
		.to(travelingVideos[1], {
			opacity: 1,
			xPercent: 0,
			duration: 1,
			onStart: () => {
				travelingVideos[1].play();
			},
		})
		.to(travelingVideos[2], {
			opacity: 1,
			xPercent: 0,
			duration: 1,
			onStart: () => {
				travelingVideos[2].play();
			},
		});

	// --------------------------------------------- Slide 2###

	// --------------------------------------------- Slide 3

	const longWayImg = document.querySelector('.longWayImg');
	const longWayImg2 = document.querySelector('.longWayImg2');

	gsap.set([longWayImg, longWayImg2], {
		clipPath: 'circle(0% at 50% 50%)',
	});

	const longWayTl = gsap.timeline({
		yoyo: true,
		repeat: -1,
	});
	const longWayTl2 = gsap.timeline({
		yoyo: true,
		repeat: -1,
	});
	const longWayClipTl = gsap.timeline({
		paused: true,
	});

	longWayClipTl
		.to([longWayImg, longWayImg2], {
			duration: 2,
			clipPath: 'circle(100% at 50% 50%)',
		});

	longWayTl
		.to(longWayImg, {
			xPercent: -10,
			yPercent: -10,
			duration: 10,
			ease: 'power1.inOut',
		})
		.to(longWayImg, {
			xPercent: 10,
			yPercent: -10,
			duration: 10,
			ease: 'power1.inOut',
		})
		.to(longWayImg, {
			xPercent: -10,
			yPercent: 5,
			duration: 10,
			ease: 'power1.inOut',
		});

	longWayTl2
		.to(longWayImg2, {
			xPercent: -7,
			yPercent: 5,
			duration: 7,
			ease: 'power1.inOut',
		})
		.to(longWayImg2, {
			xPercent: 7,
			yPercent: -7,
			duration: 7,
			ease: 'power1.inOut',
		})
		.to(longWayImg2, {
			xPercent: -7,
			yPercent: -7,
			duration: 7,
			ease: 'power1.inOut',
		});
	// --------------------------------------------- Slide 3###

	// --------------------------------------------- Your beauty
	const yourBeautyDecor = document.querySelectorAll('.yourBeautyDecor');
	const yourBeautyImg = document.querySelectorAll('.yourBeautyPicture');

	gsap.set(yourBeautyDecor, {
		opacity: 0,
	});
	gsap.set(yourBeautyImg, {
		opacity: 0,
		x: 50,
	});

	const yourBeautyTl = gsap.timeline({
		paused: true,
	});

	yourBeautyTl
		.to(Array.from(yourBeautyImg), {
			opacity: 1,
			x: 0,
			direction: 0.5,
			stagger: 0.4,
		})
		.to(yourBeautyDecor, {
			opacity: 1,
		});

	// --------------------------------------------- Your beauty###

	// --------------------------------------------- Outro
	const outroSection = document.querySelector('.outroSection');
	const outroHeart = document.querySelectorAll('.outroHeart');

	gsap.set(outroHeart, {
		drawSVG: 0,
	});

	const outroTl = gsap.timeline({
		paused: true,
	});

	outroTl
		.to(outroHeart, {
			drawSVG: '100%',
			duration: 2,
			onComplete: () => {
				outroSection.classList.add('active_state');
			},
		});
	// --------------------------------------------- Outro###

	setTimeout(() => {
		slides.forEach((slide) => {
			const splittedText = slide.querySelectorAll('.section_title__line');

			if (splittedText.length) {
				titlesData.push(Array.from(splittedText));
			} else {
				titlesData.push(null);
			}
		});
	}, 100);

	let prevTitleAnimCompleted = false;

	const gotoAnim = () => {
		slides[currentSlide].classList.add('section--active_slide_state');
		slides[prevSlide].classList.remove('section--active_slide_state');

		gsap.to(proxy, {
			x: currentOffset,
			duration: 1,
			ease: 'power1.inOut',
			onComplete: () => {
				isTransition = false;
			},
		});

		if (currentSlide === 1) {
			setTimeout(() => {
				travelingTl.play();
			}, 1400);
			setTimeout(() => {
				titleAnim(titlesData[currentSlide]);
			}, 4000);
		} else if (currentSlide === 2) {
			setTimeout(() => {
				longWayClipTl.play();
			}, 1200);
			setTimeout(() => {
				titleAnim(titlesData[currentSlide]);
			}, 2800);
		} else if (currentSlide === 5) {
			setTimeout(() => {
				yourBeautyTl.play();
			}, 3400);
			setTimeout(() => {
				titleAnim(titlesData[currentSlide]);
			}, 1600);
		} else if (currentSlide === 6) {
			setTimeout(() => {
				outroTl.play();
			}, 11700);
			setTimeout(() => {
				titleAnim(titlesData[currentSlide]);
			}, 1600);
		} else {
			setTimeout(() => {
				titleAnim(titlesData[currentSlide]);
			}, titleAnimDelay);
		}
	};

	const gotoNext = () => {
		if (!document.body.classList.contains('auth_state')) return;
		if (currentSlide === slides.length - 1) return;

		if (!isTransition) {
			prevSlide = currentSlide;
			isTransition = true;
			currentSlide += 1;
			currentOffset -= windowWidth;
			gotoAnim();
		}
	};

	const gotoPrev = () => {
		if (!document.body.classList.contains('auth_state')) return;
		if (currentSlide === 0) return;

		if (!isTransition) {
			prevSlide = currentSlide;
			isTransition = true;
			currentSlide -= 1;
			currentOffset += windowWidth;
			gotoAnim();
		}
	};

	Observer.create({
		target: window,
		type: 'wheel,touch',
		onUp: gotoPrev,
		onDown: gotoNext,
	});

	window.addEventListener('keydown', (e) => {
		if (e.code === 'ArrowRight') gotoNext();
		if (e.code === 'ArrowLeft') gotoPrev();
	});
};

export default scrollProxy;
