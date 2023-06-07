export const addMessageParams = (message: string, ...options: string[]): string => {
	let nMsg = message;
	for (let i = 1; i <= options.length; i++) {
		nMsg = nMsg.replaceAll(`\${${i}}`, options[i - 1]);
	}
	return nMsg;
};