import {act, renderHook} from "@testing-library/react-hooks";
import useInput, {Validators} from "../hooks/useInput";
import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({adapter: new Adapter()});

describe("testing the hook...", () => {

	test("should initialize with no arguments", () => {
		const {result} = renderHook(() => useInput());

		const hook = result.current;
		expect(hook.bind.value).toEqual("");
		expect(hook.isValid).toBe(true);
		expect(hook.defaultValue).toBe("");
		expect(hook.defaultValue).toEqual(hook.value);
		expect(hook.bind).toHaveProperty("onChange");
		expect(hook.bind).toHaveProperty("value");
		expect(hook.bind).not.toHaveProperty("type");
	});

	test("should initialize with a default value", () => {
		const defaultValue = "foo";
		const {result} = renderHook(() => useInput(defaultValue));

		const hook = result.current;
		expect(hook.bind.value).toEqual(defaultValue);
		expect(hook.isValid).toBe(true);
		expect(hook.defaultValue).toBe(defaultValue);
		expect(hook.defaultValue).toEqual(hook.value);
		expect(hook.bind).toHaveProperty("onChange");
		expect(hook.bind).toHaveProperty("value");
		expect(hook.bind).not.toHaveProperty("type");
	});

	test("should initialize with a placeholder", () => {
		const {result} = renderHook(() => useInput({
			placeholder: "bar"
		}));

		const hook = result.current;
		expect(hook.bind).not.toHaveProperty("type");
		expect(hook.bind).toHaveProperty("placeholder");
		expect(hook.bind.placeholder).toEqual("bar");
	});

	test("should update value when onChange gets called from an input", () => {
		const defaultValue = "foo";
		const newValue = "bar";

		let hook;
		const {result} = renderHook(() => useInput(defaultValue));

		const fn = jest.fn();

		hook = result.current;
		const input = shallow(<input {...hook.bind} />);

		/* Update the value of the input */
		act(() => {
			input.find("input").simulate("change", {
				persist: fn,
				target: {
					value: newValue
				}
			})
		});

		hook = result.current;
		expect(fn).toBeCalledTimes(1);
		expect(hook.value).toEqual(newValue);
	});

	test("should reset value back to defalutValue when clear() gets called", () => {
		const defaultValue = "foo";
		const newValue = "bar";

		let hook;
		const {result} = renderHook(() => useInput(defaultValue));

		const fn = jest.fn();

		hook = result.current;
		const input = shallow(<input {...hook.bind} />);

		/* Update the value of the input */
		act(() => {
			input.find("input").simulate("change", {
				persist: fn,
				target: {
					value: newValue
				}
			})
		});

		hook = result.current;
		expect(fn).toBeCalledTimes(1);
		expect(hook.value).toEqual(newValue);

		/* Run clear */
		act(() => {
			hook.clear();
		})

		hook = result.current;
		expect(hook.value).toEqual(defaultValue);
	});

	test("should execute validator functions when value is changed", () => {
		const defaultValue = "foo";
		const newValue = "bar";
		const fns = [jest.fn(), jest.fn(), jest.fn()];

		let hook;
		const {result} = renderHook(() => useInput({
			defaultValue,
			validate: [
				(value) => {
					fns[0]();
					return value === "bar"
				},
				() => {
					fns[1]();
					return false
				}
			]
		}));


		hook = result.current;
		const input = shallow(<input {...hook.bind} />);

		/* Update the value of the input */
		act(() => {
			input.find("input").simulate("change", {
				persist: fns[2],
				target: {
					value: newValue
				}
			})
		});

		// hook = result.current;
		expect(fns[0]).toBeCalled();
		expect(fns[1]).toBeCalled();
		expect(fns[2]).toBeCalled();
	});

	test("should be valid after changing value", () => {
		const defaultValue = "foo";
		const newValue = "bar";
		const fn = jest.fn();

		let hook;
		const {result} = renderHook(() => useInput({
			defaultValue,
			validate: [
				(value) => {
					fn();
					return value === "bar"
				},
			]
		}));


		hook = result.current;
		const input = shallow(<input {...hook.bind} />);

		/* Should not be valid */
		expect(fn).toBeCalledTimes(1);
		expect(hook.isValid).toBe(false);

		/* Update the value of the input */
		act(() => {
			input.find("input").simulate("change", {
				persist: jest.fn,
				target: {
					value: newValue
				}
			})
		});

		hook = result.current;

		/* Should be valid now */
		expect(fn).toBeCalledTimes(2);
		expect(hook.isValid).toBe(true);
	});

	test("value should change when setValue is called", () => {
		const {result} = renderHook(() => useInput("foo"));

		let hook = result.current;
		expect(hook.value).toEqual("foo")

		act(() => {
			hook.setValue("bar")
		});

		hook = result.current;
		expect(hook.value).toEqual("bar")
	})

});

describe("testing validators", () => {
	test("required validator should return false if not valid and true if valid", () => {
		expect(Validators.required("")).toBe(false);
		expect(Validators.required("foo")).toBe(true);
	});

	test("email validator should return false if not valid and true if valid", () => {
		expect(Validators.email("")).toBe(false);
		expect(Validators.email("foo")).toBe(false);
		expect(Validators.email("foo@")).toBe(false);
		expect(Validators.email("foo@bar")).toBe(false);
		expect(Validators.email("foo@bar.n")).toBe(false);
		expect(Validators.email("foo@bar.nl")).toBe(true);
		expect(Validators.email("foo-bar@baz.nl")).toBe(true);
		expect(Validators.email("foo-bar@baz-qux.nl")).toBe(true);
		expect(Validators.email("foo.bar@baz.nl")).toBe(true);
		expect(Validators.email("foo.bar@baz.qux.nl")).toBe(true);
		expect(Validators.email("foo.bar-baz@qux-quux.nl")).toBe(true);
		expect(Validators.email("foo.bar-baz@mag.qux-quux.nl")).toBe(true);
		expect(Validators.email("foo.bar-baz@mag.qux-quux..nl")).toBe(false);
		expect(Validators.email("foo.bar-baz@@mag.qux-quux..nl")).toBe(false);
	});

	test("password validator should return false if not valid and true if valid", () => {
		expect(Validators.password("")).toBe(false);
		expect(Validators.password("aaa")).toBe(false);
		expect(Validators.password("AAA")).toBe(false);
		expect(Validators.password("aaaAAA")).toBe(false);
		expect(Validators.password("pizza123")).toBe(false);
		expect(Validators.password("aaaAAA123")).toBe(false);
		expect(Validators.password("aAaAaA123!")).toBe(true);
		expect(Validators.password("superC0mplic@tedP@$$20rd!@#$")).toBe(true);
	});
});
