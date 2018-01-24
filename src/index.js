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

export function mapTermsState (state, map) {
	return Object.assign(map, {
		powerline: state.ui.powerline
	});
};

export function decorateTerm(Term, {React}) {
	return class extends React.Component {
		constructor (props, context) {
			super(props, context);

			this._onData = this._onData.bind(this);
		}

		_onData(data) {
			const next = (data) => {
				if (this.props.onData) this.props.onData(data);
			};

			const config = this.props.powerline;
			const terminal = getTerminal(config.terminal);

			const startupMatch = terminalMatcher(data, terminal.startupRegex);
			const promptMatch = terminalMatcher(data, terminal.promptRegex);

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

						data = data.replace(terminal.promptRegex, powerline);
					}

					if(startupMatch) {
						if(startupMatch[1]) directory = startupMatch[1];

						const startupPowerline = await buildPowerline(config.startup, {
							config,
							directory,
							terminal
						});

						data = data.replace(terminal.startupRegex, startupPowerline);
					}

					next(data);
				})();

				return;
			}

			next(data);
		}

		render () {
			return React.createElement(Term, Object.assign({}, this.props, {
				onData: this._onData
			}));
		}
	}
}
