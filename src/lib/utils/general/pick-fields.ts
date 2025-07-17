/**
 * Picks a subset of properties from an object based on a list of keys.
 *
 * @template T - The type of the source object.
 * @template K - The subset of keys from the source object.
 *
 * @param obj - The object to pick properties from.
 * @param keys - An array of keys to extract from the object.
 *
 * @returns A new object containing only the selected key-value pairs.
 *
 * @example
 * const user = { id: 1, name: 'Alice', email: 'a@example.com' };
 * const result = pickFields(user, ['id', 'email']);
 * // result: { id: 1, email: 'a@example.com' }
 */
const pickFields = <T, K extends keyof T>(obj: T, keys: readonly K[]): Pick<T, K> => {
	return keys.reduce(
		(result, key) => {
			result[key] = obj[key];
			return result;
		},
		{} as Pick<T, K>
	);
};

export { pickFields };
