export const cmdRegex = new RegExp(
	String.raw`^\u001B\[0mMicrosoft Windows \[Version.*?\]\u001B\[0K\u001B\[\?25l\r?\n` +
	String.raw`\(c\) \d{4} Microsoft Corporation. All rights reserved.\u001B\[0K\r?\n` +
	String.raw`\u001B\[0K\r?\n$`
);

export const terminalRegex = [
	/([A-Z]:\\.*)>(?:\u001B\[[^\n\u001B]{2,4})*$/,
	/^\u001B\[?25l([A-Z]:\\.*)>/
];
export const lineBreak = '\r\n';
