import { describe, it, expect } from "vitest";
import { leadFormSchema, contactFormSchema, loginSchema } from "@/lib/validation";

describe("leadFormSchema", () => {
  const validBase = {
    name: "Rahul Sharma",
    phone: "9876543210",
    city: "Mumbai",
  };

  it("accepts a minimal valid submission", () => {
    const result = leadFormSchema.safeParse(validBase);
    expect(result.success).toBe(true);
  });

  it("rejects an invalid Indian mobile number", () => {
    const result = leadFormSchema.safeParse({ ...validBase, phone: "12345" });
    expect(result.success).toBe(false);
  });

  it("rejects a phone number not starting with 6-9", () => {
    const result = leadFormSchema.safeParse({ ...validBase, phone: "5876543210" });
    expect(result.success).toBe(false);
  });

  it("rejects a missing name", () => {
    const result = leadFormSchema.safeParse({ ...validBase, name: "" });
    expect(result.success).toBe(false);
  });

  it("rejects a name containing invalid characters", () => {
    const result = leadFormSchema.safeParse({ ...validBase, name: "<script>alert(1)</script>" });
    expect(result.success).toBe(false);
  });

  it("flags a filled-in honeypot field", () => {
    const result = leadFormSchema.safeParse({ ...validBase, website: "http://spam.example" });
    expect(result.success).toBe(false);
  });

  it("defaults requirementType and source when omitted", () => {
    const result = leadFormSchema.safeParse(validBase);
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.data.requirementType).toBe("OTHER");
      expect(result.data.source).toBe("WEBSITE_CONTACT_FORM");
    }
  });

  it("rejects an invalid email when provided", () => {
    const result = leadFormSchema.safeParse({ ...validBase, email: "not-an-email" });
    expect(result.success).toBe(false);
  });
});

describe("contactFormSchema", () => {
  it("accepts a valid message", () => {
    const result = contactFormSchema.safeParse({
      name: "Priya Mehta",
      email: "priya@example.com",
      message: "I'd like to know more about your services.",
    });
    expect(result.success).toBe(true);
  });

  it("rejects a message that is too short", () => {
    const result = contactFormSchema.safeParse({
      name: "Priya Mehta",
      email: "priya@example.com",
      message: "Hi",
    });
    expect(result.success).toBe(false);
  });

  it("rejects a missing email", () => {
    const result = contactFormSchema.safeParse({
      name: "Priya Mehta",
      message: "I'd like to know more about your services.",
    });
    expect(result.success).toBe(false);
  });
});

describe("loginSchema", () => {
  it("accepts a valid email and password", () => {
    const result = loginSchema.safeParse({ email: "admin@example.com", password: "secret123" });
    expect(result.success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = loginSchema.safeParse({ email: "not-an-email", password: "secret123" });
    expect(result.success).toBe(false);
  });

  it("rejects an empty password", () => {
    const result = loginSchema.safeParse({ email: "admin@example.com", password: "" });
    expect(result.success).toBe(false);
  });
});
