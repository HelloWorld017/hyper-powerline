import {buildPowerline} from './core/powerline';
import fs from 'fs';
import path from 'path';
import platform from './core/platform';

export function reduceUI(state, { type, config }) {
	switch (type) {
	  	case 'CONFIG_LOAD':
		case 'CONFIG_RELOAD':
			return state.set('powerline', config.powerline);

		default:
			break
	}

	return state
}

export function decorateConfig(config) {
	return Object.assign({}, config, {
		css: fs.readFileSync(path.join(__dirname, 'theme.css'), 'utf8')
	});
};

export const middleware = store => next => action => {
	if (action.type !== 'SESSION_PTY_DATA') {
		next(action);
		return;
	}

	const config = store.getState().powerline;
	const {data} = action;
	console.log(data);

	if (platform.cmdRegex.test(action.data)) {
		(async () => {
			const powerline = await buildPowerline(config.terminal, {
				config
			});
			action.data = platform.lineBreak + powerline;
			next(action);
		})();

		return;
	}

	const terminalMatch = action.data.match(platform.terminalRegex);
	if(terminalMatch) {
		(async () => {
			const originalText = terminalMatch.substr(terminalMatch.index);
			const directory = terminalMatch[1];

			const powerline = await buildPowerline(config.terminal, {
				config,
				directory
			});

			action.data = originalText + powerline;
			next(action);
		})();

		return;
	}

	next(action);
};
