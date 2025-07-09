const truncateStr = ({ str, maxChar = 70 }: { str: string; maxChar?: number }) => {
	if (!str || maxChar <= 0) return str;
	if (str.length < maxChar) return str;
	return str.substring(0, maxChar) + "...";
};

export { truncateStr };
