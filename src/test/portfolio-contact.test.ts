import { describe, expect, it } from "vitest";
import { portfolioContacts } from "../lib/portfolio-contact";

describe("Portfolio contact destinations", () => {
  it("opens email addressed to the supplied Gmail account", () => {
    expect(portfolioContacts.find((contact) => contact.label === "Email")?.href).toBe("mailto:sophiechrisng@gmail.com");
  });
  it("dials the supplied Nigerian phone number", () => {
    const phone = portfolioContacts.find((contact) => contact.label === "Phone");
    expect(phone?.value).toBe("07053084945");
    expect(phone?.href).toBe("tel:+2347053084945");
  });
});