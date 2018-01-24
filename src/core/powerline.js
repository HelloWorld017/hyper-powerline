import chalk from 'chalk';

const color = new chalk.constructor({level: 3});

export function buildSections(info, {config, directory}) {
	const sectionBreak = config.sectionHard;
	let text = '';

	const last = info.filter((v) => v !== null).reduce((prev, curr) => {
		const currentSection = color.bgHex(curr[1])('  ' + curr[0]);

		if(prev === undefined) {
			text += currentSection;
			return curr;
		}

		text += color.bgHex(prev[1])(' ') + color.hex(prev[1])(color.bgHex(curr[1])(sectionBreak)) + currentSection;

		return curr;
	}, undefined);

	if(last === undefined) return '';

	text += color.bgHex(last[1])(' ') + color.hex(last[1])(sectionBreak);

	return text;
};

export async function buildPowerline(plugins, config) {
	const info = [];

	for(let v of plugins) {
		const sectionLine = [];
		for(let plugin of v) {
			const pluginInfo = plugin.split(':');
			const pluginColor = pluginInfo[1];

			const loadedPlugin = require('../plugin/' + pluginInfo[0]);
			const pluginResult = await loadedPlugin(config);

			if(pluginResult) sectionLine.push([pluginResult, pluginColor]);
		}

		info.push(buildSections(sectionLine, config));
	}

	return info.join(config.terminal.lineBreak);
};
