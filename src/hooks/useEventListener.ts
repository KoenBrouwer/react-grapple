import {EventHandler, ReactEventHandler, useEffect, useRef} from "react";

const useEventListener = <TEventName extends keyof WindowEventMap>(eventName: TEventName, handler: ReactEventHandler<WindowEventMap[TEventName]>, element?: Element) => {
	const _handler = useRef<EventHandler<any>>();
	const _element = useRef<Element>(element || document.body);

	useEffect(() => {
		_handler.current = handler;
	}, [handler]);

	useEffect(() => {
		if (!element || !element.addEventListener) {
			return;
		}

		const eventListener = (event: any) => _handler.current?.(event);
		element.addEventListener(eventName, eventListener);

		return () => {
			element.removeEventListener(eventName, eventListener);
		}
	}, [eventName, element]);
}

export default useEventListener;
