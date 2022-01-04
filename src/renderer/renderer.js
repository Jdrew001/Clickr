import './index.scss';

document.getElementById('close-button').onclick = () => window.api.send('close-window');
document.getElementById('minimize-button').onclick = () => window.api.send('minimize-window');

const schemeToggle = document.getElementById('scheme-toggle');
schemeToggle.onclick = () => {
	const _element = document.documentElement;
	if (_element.classList.contains('dark')) {
		_element.classList.remove('dark');
		schemeToggle.innerHTML = '&#xE708;';
	} else {
		_element.classList.add('dark');
		schemeToggle.innerHTML = '&#xE706;';
	}
};

/* Setup Shortcut Inputs */
(async () => {
	const ShortcutInput = require('./shortcut_input.js');
	const savedShortcut = await window.api.invoke('get-stored-value', 'shortcut');
	new ShortcutInput('start-shortcut', savedShortcut, newShortcut => {
		window.api.send('update-shortcut', newShortcut);
	});
})();

/* Arm button */
const armedCover = document.getElementById('cover');

document.getElementById('arm-toggle').onclick = () => window.api.send('arm-toggle');
window.api.on('arm-result', result => {
	if (typeof result !== 'boolean') return;

	if (result) {
		// Armed 
		armedCover.classList.remove('hidden');
	} else {
		// Disarmed
		armedCover.classList.add('hidden');
	}
});