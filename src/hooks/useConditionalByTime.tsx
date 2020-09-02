import React, {useEffect, useMemo} from "react";
import Conditional from "../Conditional";
import useToggle from "./useToggle";

export type UseConditionalByTime = [React.FC, React.FC];

export function useConditionalByTime(splitTime: Date, realtime = false): UseConditionalByTime {
	let _isDone = () => new Date() >= splitTime;
	const [isDone, toggleDone] = useToggle(_isDone());

	useEffect(() => {
		/* If realtime is true, we need to refresh the component and show the After */
		if (realtime && !isDone) {
			let interval;
			let checkDone = () => {
				if (_isDone()) {
					clearInterval(interval);
					toggleDone(true);
				}
			};
			interval = setInterval(checkDone, 1000);
			checkDone();
			return () => clearInterval(interval);
		}
	}, [splitTime, realtime]);

	const Before: React.FC = useMemo(() => ({children}) => (
		<Conditional show={!isDone}>{children}</Conditional>
	), [splitTime, isDone]);
	const After: React.FC = useMemo(() => ({children}) => (
		<Conditional show={isDone}>{children}</Conditional>
	), [splitTime, isDone]);

	return [Before, After];
}

export default useConditionalByTime;