import * as Grapple from "../index";

test("exports all the correct things", () => {
	expect(Grapple).toHaveProperty("useToggle");
	expect(Grapple).toHaveProperty("useConditionalByTime");
	expect(Grapple).toHaveProperty("useIsMobile");
	expect(Grapple).toHaveProperty("useIsMobileOnce");
	expect(Grapple).toHaveProperty("Conditional");

	expect(Grapple.useToggle).toBeInstanceOf(Function)
	expect(Grapple.useConditionalByTime).toBeInstanceOf(Function)
	expect(Grapple.useIsMobile).toBeInstanceOf(Function)
	expect(Grapple.useIsMobileOnce).toBeInstanceOf(Function)
	expect(Grapple.Conditional).toBeInstanceOf(Function)

});
