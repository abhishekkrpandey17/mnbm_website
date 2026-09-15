import { describe, it, expect, vi, beforeEach } from "vitest";

const { getCurrentAdminMock } = vi.hoisted(() => ({
  getCurrentAdminMock: vi.fn(),
}));

vi.mock("@/lib/auth", () => ({
  getCurrentAdmin: getCurrentAdminMock,
}));

describe("requireAdmin", () => {
  beforeEach(() => {
    getCurrentAdminMock.mockReset();
  });

  it("returns a 401 response when there is no authenticated admin", async () => {
    getCurrentAdminMock.mockResolvedValue(null);
    const { requireAdmin } = await import("@/lib/require-admin");

    const result = await requireAdmin();

    expect("error" in result).toBe(true);
    if ("error" in result) {
      expect(result.error.status).toBe(401);
      const body = await result.error.json();
      expect(body.error).toBe("Unauthorized");
    }
  });

  it("returns the admin when a valid session exists", async () => {
    const fakeAdmin = {
      id: "admin_1",
      name: "Test Admin",
      email: "admin@example.com",
      role: "ADMIN",
      isActive: true,
    };
    getCurrentAdminMock.mockResolvedValue(fakeAdmin);
    const { requireAdmin } = await import("@/lib/require-admin");

    const result = await requireAdmin();

    expect("admin" in result).toBe(true);
    if ("admin" in result) {
      expect(result.admin.email).toBe("admin@example.com");
    }
  });
});
