export const replace = (message: string, ...options: string[]): string => {
	const nMsg = message;
	for (let i = 1; i <= options.length; i++) {
		nMsg.replaceAll(`{$${i}}`, options[i - 1]);
	}
	return nMsg;
};