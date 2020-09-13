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

});