import { describe, expect, it } from "vitest";
import { portfolioContacts } from "../lib/portfolio-contact";

describe("Portfolio contact destinations", () => {
  it("opens email addressed to the supplied Gmail account", () => {
    expect(portfolioContacts.find((contact) => contact.label === "Email")?.href).toBe("mailto:sophiaaniekwe@gmail.com");
  });
  it("does not expose a phone contact", () => {
    expect(portfolioContacts.some(contact => contact.label === "Phone" || contact.href.startsWith("tel:"))).toBe(false);
  });
  it("links to the supplied GitHub repository", () => { expect(portfolioContacts.find(c => c.label === "GitHub")?.href).toBe("https://github.com/SophieChris1/sophia-portfolio-hub"); });
  it("links to the supplied LinkedIn profile", () => { expect(portfolioContacts.find(c => c.label === "LinkedIn")?.href).toBe("https://www.linkedin.com/in/sophia-aniekwe-238391385"); });
});