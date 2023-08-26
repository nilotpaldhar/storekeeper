/** Maps product price. */
const mapPrice = (price = {}) => ({
	raw: price?.raw,
	formatted: price?.formatted,
	formattedWithCode: price?.formatted_with_code,
	formattedWithSymbol: price?.formatted_with_symbol,
});

export default mapPrice;
