import {buildPowerline} from './core/powerline';
import terminalMatcher from './core/matcher';
import fs from 'fs';
import getTerminal from './terminal';
import path from 'path';

export function reduceUI(state, { type, config }) {
	switch (type) {
	  	case 'CONFIG_LOAD':
		case 'CONFIG_RELOAD':
			return state.set('powerline', config.powerline);

		default:
			break
	}

	return state
};

export const middleware = store => next => action => {
	if (action.type !== 'SESSION_PTY_DATA') {
		next(action);
		return;
	}

	const config = store.getState().ui.powerline;
	const terminal = getTerminal(config.terminal);

	const startupMatch = terminalMatcher(action.data, terminal.startupRegex);
	const promptMatch = terminalMatcher(action.data, terminal.promptRegex);

	if(promptMatch || startupMatch) {
		(async () => {
			let directory = undefined;

			if(promptMatch) {
				directory = promptMatch[1];

				let powerline = await buildPowerline(config.prompt, {
					config,
					directory,
					terminal
				});

				action.data = action.data.replace(terminal.promptRegex, powerline);
			}

			if(startupMatch) {
				if(startupMatch[1]) directory = startupMatch[1];

				const startupPowerline = await buildPowerline(config.startup, {
					config,
					directory,
					terminal
				});

				action.data = action.data.replace(terminal.startupRegex, startupPowerline);
			}

			next(action);
		})();

		return;
	}

	next(action);
};
