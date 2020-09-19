import {useEffect, useRef} from "react";

const useEventListener = (eventName, handler, element = window) => {
	const _handler = useRef<Function>();

	useEffect(() => {
		_handler.current = handler;
	}, [handler]);

	useEffect(() => {
		if (!element || !element.addEventListener) {
			return;
		}

		const eventListener = (event) => _handler.current?.(event);
		element.addEventListener(eventName, eventListener);

		return () => {
			element.removeEventListener(eventName, eventListener);
		}
	}, [eventName, element]);
}

export default useEventListener;