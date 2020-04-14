import {BaseSyntheticEvent, Dispatch, SetStateAction, useCallback, useMemo, useState} from "react";

export type OnChangeHandler = (e: BaseSyntheticEvent) => void;
export type UseInput = {
	defaultValue: string,
	value: string,
	clear: () => void,
	setValue: Dispatch<SetStateAction<string>>,
	onChange: OnChangeHandler,
	bind: {
		defaultValue?: string,
		onChange: OnChangeHandler,
		value?: string,
	}
};

export function useInput(defaultValue: string = ""): UseInput {
	const [value, setValue] = useState<string>(defaultValue);
	let callback: CallableFunction | undefined = undefined;

	const onChange = (e: BaseSyntheticEvent) => {
		e.persist();
		let newValue = e.target.value;

		setValue(() => newValue);
		if (callback) {
			callback(newValue);
		}
	};

	const clear = useCallback(() => setValue(defaultValue), []);

	return useMemo(() => ({
		defaultValue,
		value,
		clear,
		setValue,
		onChange,

		bind: {
			onChange,
			value,
		},
	}), [defaultValue, value, clear]);
}

export default useInput;
