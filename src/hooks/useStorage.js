/* eslint-disable no-console */
import { useEffect, useState, useCallback } from 'react';

const useStorage = (key, defaultValue, storageObject = {}) => {
	const [storedValue, setStoredValue] = useState(() => {
		if (typeof window === 'undefined') return defaultValue;
		try {
			// Get value from storage by key
			const item = storageObject?.getItem(key);
			// Parse stored json or if none return defaultValue
			return item ? JSON.parse(item) : defaultValue;
		} catch (error) {
			console.log(error);
			return defaultValue;
		}
	});

	// Wrapper version of useState's setter function
	const setValue = (value) => {
		try {
			// Allow value to be a function so we have same API as useState
			const valueToStore = value instanceof Function ? value(storedValue) : value;
			setStoredValue(valueToStore);

			// Save to local storage
			if (typeof window !== 'undefined') {
				storageObject?.setItem(key, JSON.stringify(valueToStore));
			}
		} catch (error) {
			console.log(error);
		}
	};

	const removeValue = useCallback(() => {
		setStoredValue(undefined);
	}, []);

	useEffect(() => {
		if (storedValue === undefined) return storageObject.removeItem(key);
		return storageObject.setItem(key, JSON.stringify(storedValue));
	}, [key, storedValue, storageObject]);

	return [storedValue, setValue, removeValue];
};

export const useSessionStorage = (key, defaultValue) => {
	let storageObj = {};
	if (typeof window !== 'undefined') storageObj = window?.sessionStorage;
	return useStorage(key, defaultValue, storageObj);
};

export const useLocalStorage = (key, defaultValue) => {
	let storageObj = {};
	if (typeof window !== 'undefined') storageObj = window?.localStorage;
	return useStorage(key, defaultValue, storageObj);
};
