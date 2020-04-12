import {useState} from "react";

export type UseToggle = [boolean, (value?: boolean) => void];

export function useToggle(initialValue: boolean = false): UseToggle {
	const [state, setState] = useState<boolean>(initialValue);
	const toggleState = (value?: boolean) => {
		if (value === undefined) {
			setState(!state);
		} else {
			setState(value);
		}
	};
	return [state, toggleState];
}

export default useToggle;