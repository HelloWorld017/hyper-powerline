export default () => {
	switch(process.platform) {
		case 'win32':
			return require('./core/platform.win32');

		default:
			throw new Error("Not supported platform!");
	}
};
