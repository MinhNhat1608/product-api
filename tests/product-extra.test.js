
const request = require("supertest");

const api = request("http://127.0.0.1:3000");

describe("Product API - Additional Tests", () => {
  test("GET san pham khong ton tai tra ve 404", async () => {
    const response = await api.get(
      "/api/products/PRODUCT_NOT_FOUND_999"
    );

    expect(response.statusCode).toBe(404);
  });
});
