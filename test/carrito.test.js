import request from "supertest";
import app from "../index.js"; // Importa la aplicación Express

describe("Carrito Controller", () => {
  describe("GET /api/v1/carrito", () => {
    it("debería retornar una lista de carritos", async () => {
      const res = await request(app).get("/api/v1/carrito");
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe("POST /api/v1/carrito", () => {
    it("debería crear un nuevo carrito", async () => {
      const nuevoCarrito = {
        id_producto: "2",
        cantidad: 2,
      };
      const res = await request(app).post("/api/v1/carrito").send(nuevoCarrito);
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("id_item");
    });

    it("debería retornar 400 si faltan datos", async () => {
      const res = await request(app).post("/api/v1/carrito").send({});
      expect(res.statusCode).toBe(400);
    });
  });

  describe("PUT /api/v1/carrito/:id", () => {
    it("debería actualizar un carrito existente", async () => {
      const cambios = { id_producto: 3, cantidad: 2 };
      const res = await request(app).put("/api/v1/carrito/1").send(cambios);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("updatedRows");
    });

    it("debería retornar 404 si el carrito no existe", async () => {
      const res = await request(app)
        .put("/api/v1/carrito/9999")
        .send({ productos: [{ productoId: 3, cantidad: 2 }] });
      expect(res.statusCode).toBe(404);
    });
  });

  describe("DELETE /api/v1/carrito/:id", () => {
    it("debería eliminar un item de un carrito existente", async () => {
      const cambios = { id_item: 3 };
      const res = await request(app).delete("/api/v1/carrito/1").send(cambios);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("updatedRows");
    });

    it("debería retornar 404 si el item de un carrito no existe", async () => {
      const res = await request(app).delete("/api/v1/carrito/9999");
      expect(res.statusCode).toBe(404);
    });
  });

  describe("DELETE /api/v1/carrito", () => {
    it("debería eliminar un carrito existente de un usuario", async () => {
      const res = await request(app).delete("/api/v1/carrito");
      expect(res.statusCode).toBe(200);
      expect(res.body.wasDeleted).toBe(true);
    });
  });
});
