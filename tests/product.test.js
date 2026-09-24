const request = require("supertest");

const api = request("http://127.0.0.1:3000");

describe("Product API CRUD", () => {

  test("POST /api/products - Create Product", async () => {
    const response = await api
      .post("/api/products")
      .send({
        pid: "TEST001",
        pname: "Laptop",
        price: 15000000,
        quantity: 10
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.data.pid).toBe("TEST001");

    // Dọn dữ liệu sau test
    await api.delete("/api/products/TEST001");
  });


  test("GET /api/products - Read Products", async () => {
    await api
      .post("/api/products")
      .send({
        pid: "TEST002",
        pname: "Mouse",
        price: 500000,
        quantity: 20
      });

    const response = await api.get("/api/products");

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);

    const product = response.body.data.find(
      p => p.pid === "TEST002"
    );

    expect(product).toBeDefined();

    await api.delete("/api/products/TEST002");
  });


  test("PUT /api/products/:pid - Update Product", async () => {
    await api
      .post("/api/products")
      .send({
        pid: "TEST003",
        pname: "Keyboard",
        price: 700000,
        quantity: 15
      });

    const response = await api
      .put("/api/products/TEST003")
      .send({
        pname: "Gaming Keyboard",
        price: 900000,
        quantity: 12
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.pname).toBe("Gaming Keyboard");
    expect(response.body.data.price).toBe(900000);
    expect(response.body.data.quantity).toBe(12);

    await api.delete("/api/products/TEST003");
  });


  test("DELETE /api/products/:pid - Delete Product", async () => {
    await api
      .post("/api/products")
      .send({
        pid: "TEST004",
        pname: "Monitor",
        price: 4000000,
        quantity: 5
      });

    const response = await api
      .delete("/api/products/TEST004");

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);

    const check = await api.get("/api/products/TEST004");

    expect(check.statusCode).toBe(404);
  });

});