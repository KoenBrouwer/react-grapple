import useInput, {UseInput, UseInputOptions} from "./useInput";

export type UseNumberInputArgs = UseInputOptions<number> & {
	min?: number,
	max?: number,
	step?: number,
	defaultValue?: number,
};

type UseNumberInput = UseInput<number> & {
	bind: UseInput<number>["bind"] & {
		min?: number,
		max?: number,
		step?: number,
	}
};

const useNumberInput = (options?: number | UseNumberInputArgs): UseNumberInput => {
	let _options: UseNumberInputArgs = {};

	if (typeof options === "number") {
		_options = {
			defaultValue: options
		};
	} else if (!options) {
		_options = {};
	} else {
		_options = options;
	}

	const {min, max, step, ...rest} = _options;
	const numberInput = useInput<number>(rest as UseInputOptions);

	return {
		...numberInput,
		bind: {
			...numberInput.bind,
			type: "number",
			min,
			max,
			step,
		}
	};
}

export default useNumberInput;