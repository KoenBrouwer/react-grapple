import {BaseSyntheticEvent, Dispatch, SetStateAction, useCallback, useMemo, useState} from "react";

const emailRegexPattern = "^([\\w-]+(?:\\.[\\w-]+)*)@((?:[\\w-]+\\.)*\\w[\\w-]{0,66})\\.([A-Za-z]{2,}(?:\\.[A-Za-z]{2,})?)$";

const Validators = {
	required: (value: string) => value.trim().length > 0,
	email: (value: string) => new RegExp(emailRegexPattern).test(value),
	password: (value: string) => {
		const validations = [
			new RegExp(/([a-z])+/g).test(value),
			new RegExp(/([A-Z])+/g).test(value),
			new RegExp(/([0-9])+/g).test(value),
			new RegExp(/([^0-9a-zA-Z])+/g).test(value),
			value.length >= 8,
		];
		return validations.every(t => t);
	},
};

export type OnChangeHandler = (e: BaseSyntheticEvent) => void;
export type UseInput = {
	defaultValue: string,
	value: string,
	clear: () => void,
	setValue: Dispatch<SetStateAction<string>>,
	onChange: OnChangeHandler,
	isValid: boolean,
	bind: {
		defaultValue?: string,
		onChange: OnChangeHandler,
		value?: string,
	}
};

type ValidationFunction = (value: string) => boolean;

type UseInputArgs = string | UseInputOptions;

interface UseInputOptions {
	defaultValue?: string,
	validate?: ValidationFunction[]
}

const defaultOptions: UseInputOptions = {
	defaultValue: "",
	validate: [() => true],
};

export function useInput(options?: UseInputArgs): UseInput {
	// Use default options if no options were given
	if (!options) {
		options = defaultOptions;
	}
	// If options is a string, treat it as the default value
	else if (typeof options === "string") {
		options = {
			...defaultOptions,
			defaultValue: options,
		};
	}

	const {validate, defaultValue = ""} = options;

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

	const isValid = () => {
		let isValid;
		if (!validate || validate.length === 0) {
			isValid = true;
		} else {
			isValid = validate.every(v => v(value));
		}

		return isValid;
	};

	const clear = useCallback(() => setValue(defaultValue), []);

	return useMemo(() => ({
		defaultValue,
		value,
		clear,
		setValue,
		onChange,
		isValid: isValid(),

		bind: {
			onChange,
			value,
		},
	}), [defaultValue, value, clear, isValid]);
}

export default useInput;

export {
	Validators
}