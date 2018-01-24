export const startupRegex = new RegExp(
	String.raw`^Windows PowerShell\u001B\[0K\u001B\[\?25l\r?\n` +
	String.raw`Copyright \(C\) Microsoft Corporation. All rights reserved.\u001B\[0K\r?\n`
);

export const promptRegex = /PS ([A-Z]:\\.*)>/;
export const lineBreak = '\r\n';
