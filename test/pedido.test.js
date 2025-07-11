import request from "supertest";
import app from "../index.js"; // Importa la aplicación Express

describe("Pedido Controller", () => {
  describe("GET /api/v1/pedido", () => {
    it("debería retornar una lista de pedidos", async () => {
      const res = await request(app).get("/api/v1/pedido");
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe("GET /api/v1/pedido/:id", () => {
    it("debería retornar los datos de un pedido por id", async () => {
      const res = await request(app).get("/api/v1/pedido/1");
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("id_pedido", 1);
    });

    it("debería retornar 404 si el pedido no existe", async () => {
      const res = await request(app).get("/api/v1/pedido/9999");
      expect(res.statusCode).toBe(404);
    });
  });

  describe("GET /api/v1/pedido/:id/detail", () => {
    it("debería retornar el detalle de un pedido por id", async () => {
      const res = await request(app).get("/api/v1/pedido/1/detail");
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it("debería retornar 404 si el pedido no existe", async () => {
      const res = await request(app).get("/api/v1/pedido/9999/detail");
      expect(res.statusCode).toBe(404);
    });
  });

  describe("GET /api/v1/pedido/user", () => {
    it("debería retornar todos los pedidos de un usuario", async () => {
      const res = await request(app).get("/api/v1/pedido/user");
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe("POST /api/v1/pedido", () => {
    it("debería crear un nuevo pedido", async () => {
      const res = await request(app).post("/api/v1/pedido");
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("id_pedido");
    });
  });

  describe("PUT /api/v1/pedido/:id", () => {
    it("debería actualizar el estado de un pedido existente", async () => {
      const cambios = {
        newState: "pagado",
      };
      const res = await request(app).put("/api/v1/pedido/1").send(cambios);
      expect(res.statusCode).toBe(200);
      expect(res.body.updatedRows).toBe(1);
    });

    it("debería retornar 404 si el pedido no existe", async () => {
      const res = await request(app)
        .put("/api/v1/pedido/9999")
        .send({ direccion: "Nueva dirección 456" });
      expect(res.statusCode).toBe(404);
    });
  });
});
