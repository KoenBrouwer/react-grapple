import {renderHook} from "@testing-library/react-hooks";
import {configure} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import useNumberInput from "../hooks/useNumberInput";

configure({adapter: new Adapter()});

describe("testing the hook...", () => {
	test("should initialize with no arguments", () => {
		const {result} = renderHook(() => useNumberInput());

		const hook = result.current;
		expect(hook.bind.value).toEqual("");
	});

	test("should initialize with a default value", () => {
		const {result} = renderHook(() => useNumberInput(100));

		const hook = result.current;
		expect(hook.bind.value).toEqual(100);
	});

	test("should initialize with options", () => {
		const {result} = renderHook(() => useNumberInput({
			defaultValue: 100
		}));

		const hook = result.current;
		expect(hook.bind.value).toEqual(100);
	});
});