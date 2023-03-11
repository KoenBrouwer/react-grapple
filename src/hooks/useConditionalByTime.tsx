import React, {PropsWithChildren, useEffect, useMemo, useRef} from "react";
import Conditional from "../Conditional";
import useToggle from "./useToggle";

export type UseConditionalByTime = [React.FC<PropsWithChildren>, React.FC<PropsWithChildren>];

export function useConditionalByTime(atTime: Date, realtime = false): UseConditionalByTime {
	const _isDone = () => new Date() >= atTime;
	const [isDone, toggleDone] = useToggle(_isDone());
	const interval = useRef<NodeJS.Timeout>();

	const checkDone = () => {
		if (_isDone()) {
			clearInterval(interval.current);
			toggleDone(true);
		}
	};

	useEffect(() => {
		/* If realtime is true, we need to refresh the component and show the After */
		if (realtime) {
			checkDone();
			interval.current = setInterval(checkDone, 1000);
			return () => clearInterval(interval.current);
		}

		return undefined;
	}, [atTime, realtime]);

	const Before: React.FC<PropsWithChildren> = useMemo(() => ({children}) => (
		<Conditional show={!isDone}>{children}</Conditional>
	), [atTime, isDone]);
	const After: React.FC<PropsWithChildren> = useMemo(() => ({children}) => (
		<Conditional show={isDone}>{children}</Conditional>
	), [atTime, isDone]);

	return [Before, After];
}

export default useConditionalByTime;
