import * as Grapple from "../index";

test("exports all the correct things", () => {

	expect(Grapple).toHaveProperty("useInput");
	expect(Grapple).toHaveProperty("useNumberInput");
	expect(Grapple).toHaveProperty("useToggle");
	expect(Grapple).toHaveProperty("useConditionalByTime");
	expect(Grapple).toHaveProperty("useIsMobile");
	expect(Grapple).toHaveProperty("useIsMobileOnce");
	expect(Grapple).toHaveProperty("Conditional");
	expect(Grapple).toHaveProperty("Validators");

	expect(Grapple.useInput).toBeInstanceOf(Function)
	expect(Grapple.useNumberInput).toBeInstanceOf(Function)
	expect(Grapple.useToggle).toBeInstanceOf(Function)
	expect(Grapple.useConditionalByTime).toBeInstanceOf(Function)
	expect(Grapple.useIsMobile).toBeInstanceOf(Function)
	expect(Grapple.useIsMobileOnce).toBeInstanceOf(Function)
	expect(Grapple.Conditional).toBeInstanceOf(Function)
	expect(Grapple.Validators).toBeTruthy();

});