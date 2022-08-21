import { GLOBAL_VARS } from 'utils/constants';
import { documentReady, pageLoad } from 'utils';
import splitTextInit from '../components/splitTextInit';

export default class IndexPage {
	constructor() {
		this.init = this.init.bind(this);
	}

	loadFunc() {
		if (window.innerWidth < 1200) window.alert('Мобилной версии пока нет :( Зайди с пк');

		document.body.classList.add('loaded_state');

		const audioWrap = document.querySelector('.audio');
		const audio = document.createElement('video');

		const btn = document.querySelector('.button');
		const input = document.querySelector('.input');

		audio.type = 'video/mp4';
		audio.src = 'images/stay.mp4';
		audio.loop = true;
		audioWrap.appendChild(audio);

		splitTextInit();

		btn.addEventListener('click', () => {
			if (input.value === '1234') {
				document.body.classList.add('auth_state');

				setTimeout(() => {
					audio.play();
					audio.volume = 0.15;
				}, 300);
			}
		});
	}

	init() {
		this.loadFunc();
	}
}
