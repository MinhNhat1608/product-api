
const request = require("supertest");

const api = request("http://127.0.0.1:3000");

describe("Product API - Additional Tests", () => {

  test("GET /health - API hoat dong", async () => {
    const response = await api.get("/health");

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("OK");
  });

  test("GET san pham khong ton tai - 404", async () => {
    const response = await api.get(
      "/api/products/PRODUCT_NOT_FOUND_999"
    );

    expect(response.statusCode).toBe(404);
  });
test("GET /health - Kiem tra status", async () => {
  const response = await api.get("/health");

  expect(response.statusCode).toBe(200);
  expect(response.body).toHaveProperty("status", "OK");
});
});
