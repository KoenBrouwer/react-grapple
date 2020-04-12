import React, {useEffect, useMemo} from "react";
import Conditional from "../Conditional";
import useToggle from "./useToggle";

export type UseConditionalByTime = [React.FC, React.FC];

export function useConditionalByTime(splitTime: Date, realtime = false): UseConditionalByTime {
	let _isDone = () => new Date() >= splitTime;
	const [isDone, toggleDone] = useToggle(_isDone());

	useEffect(() => {
		let interval;
		/* If realtime is true, we need to refresh the component and show the After */
		if (realtime && !isDone) {
			interval = setInterval(() => {
				if (_isDone()) {
					clearInterval(interval);
					toggleDone();
				}
			}, 1000);
		}

		return () => clearInterval(interval);
	}, [splitTime, realtime]);

	const Before: React.FC = useMemo(() => ({children}) => <Conditional show={new Date() < splitTime}>{children}</Conditional>, [splitTime]);
	const After: React.FC = useMemo(() => ({children}) => <Conditional show={new Date() >= splitTime}>{children}</Conditional>, [splitTime]);

	return [Before, After];
}

export default useConditionalByTime;