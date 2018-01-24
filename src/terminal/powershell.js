export const startupRegex = new RegExp(
	String.raw`^Windows PowerShell\u001B\[0K\u001B\[\?25l\r?\n` +
	String.raw`Copyright \(C\) Microsoft Corporation. All rights reserved.\u001B\[0K\r?\n`
);

//\u001B[{number}G = CSI{number}G Absolute horizontal cursor setting, should be replaced for cursor issue
///PS ([A-Z]:\\.*)>([^\u001B\r\n]*(?:\u001B\[[^\r\n \u001B]+)*)(?:\u001B\[(\d+)G)/
export const promptRegex = /^PS ([A-Z]:\\.*)>(.*)$/m;
export const lineBreak = '\r\n';
