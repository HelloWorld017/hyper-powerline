import {buildPowerline} from './core/powerline';
import terminalMatcher from './core/matcher';
import fs from 'fs';
import getTerminal from './terminal';
import path from 'path';
import stripAnsi from 'strip-ansi';

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

	const startupMatchList = terminalMatcher(action.data, terminal.startupRegex);
	const startupMatch = startupMatchList ? startupMatchList[0] : null;

	const promptMatchList = terminalMatcher(action.data, terminal.promptRegex);
	const promptMatch = promptMatchList ? promptMatchList[0] : null;

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

				action.data = action.data.replace(terminal.promptRegex, `${powerline}$2`); /*
				const delta = stripAnsi(promptMatch[0]).length - stripAnsi(action.data).length;
				action.data = action.data.replace(/\u001B\[(\d+)G/, (match, originalCursor) => {
					return `\u001B[${parseInt(originalCursor - delta)}G`;
				}); */

				/*action.data = action.data.replace(terminal.promptRegex, (match, ps, subparts, cursor) => {
					let replacer = powerline;

					if(subparts) replacer += subparts;
					if(cursor) {
						let cursorPos = parseInt(cursor);
						let delta = stripAnsi(ps).length - stripAnsi(powerline).length;

						cursorPos -= delta;
						replacer += `\u001B[${cursorPos}G`;
					}

					return replacer;
				});*/
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
