import {BaseSyntheticEvent, useCallback, useMemo, useState} from "react";

export type OnChangeHandler = (e: BaseSyntheticEvent) => void;
export type UseInput = {
	defaultValue: string,
	value: string,
	clear: () => void,
	onChange: OnChangeHandler,
	bind: {
		defaultValue: string,
		onChange: OnChangeHandler,
	}
};

export function useInput(defaultValue: string = ""): UseInput {
	const [value, setValue] = useState<string>(defaultValue);

	const onChange = (e: BaseSyntheticEvent) => {
		e.persist();
		setValue(() => e.target.value);
	};

	const clear = useCallback(() => setValue(defaultValue), []);

	return useMemo(() => ({
		defaultValue,
		value,
		clear,
		onChange,

		bind: {
			defaultValue,
			onChange,
		},
	}), [defaultValue, value, clear]);
}

export default useInput;