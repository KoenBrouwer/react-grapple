import { useState } from "react";

export type UseToggle = [boolean, (value?: boolean) => void, () => void, () => void];

export function useToggle(initialValue: boolean = false): UseToggle {
	const [state, setState] = useState<boolean>(initialValue);
	const toggleState = (value?: boolean) => {
		if (value === undefined) {
			setState((v) => !v);
		} else {
			setState(value);
		}
	};

	const turnOn = () => setState(true);

	const turnOff = () => setState(false);

	return [state, toggleState, turnOn, turnOff];
}

export default useToggle;
