import { useState } from "react";

export type UseToggle = [boolean, (value?: boolean) => void, VoidFunction, VoidFunction];

export function useToggle(initialValue: boolean = false): UseToggle {
	const [state, setState] = useState<boolean>(initialValue);
	const toggleState = (value?: boolean) => {
		if (value === undefined) {
			setState((v) => !v);
		} else {
			setState(value);
		}
	};

	const on = () => setState(true);

	const off = () => setState(false);

	return [state, toggleState, on, off];
}

export default useToggle;
