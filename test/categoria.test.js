import request from "supertest";
import app from "../index.js"; // Importa la aplicación Express

describe("Categoria Controller", () => {
  describe("GET /api/v1/categoria", () => {
    it("debería retornar una lista de categorías", async () => {
      const res = await request(app).get("/api/v1/categoria");
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe("GET /api/v1/categoria/:id", () => {
    it("debería retornar una categoría por id", async () => {
      const res = await request(app).get("/api/v1/categoria/1");
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("id_categoria", 1);
    });

    it("debería retornar 404 si la categoría no existe", async () => {
      const res = await request(app).get("/api/v1/categoria/9999");
      expect(res.statusCode).toBe(404);
    });
  });

  describe("POST /api/v1/categoria", () => {
    it("debería crear una nueva categoría", async () => {
      const nuevaCategoria = {
        nombre_categoria: "Electrónica",
        tipo_categoria: "Productos electrónicos",
      };
      const res = await request(app)
        .post("/api/v1/categoria")
        .send(nuevaCategoria);
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("id_categoria");
    });

    it("debería retornar 400 si faltan datos", async () => {
      const res = await request(app).post("/api/v1/categoria").send({});
      expect(res.statusCode).toBe(400);
    });
  });

  describe("PUT /api/v1/categoria/:id", () => {
    it("debería actualizar una categoría existente", async () => {
      const cambios = {
        nombre_categoria: "Electrodomésticos",
        tipo_categoria: "Productos Electrodomésticos",
      };
      const res = await request(app).put("/api/v1/categoria/1").send(cambios);
      expect(res.statusCode).toBe(201);
      expect(res.body.updatedRows).toBe(1);
    });

    it("debería retornar 404 si la categoría no existe", async () => {
      const res = await request(app)
        .put("/api/v1/categoria/9999")
        .send({ nombre: "No existe" });
      expect(res.statusCode).toBe(404);
    });
  });

  describe("DELETE /api/v1/categoria/:id", () => {
    it("debería eliminar una categoría existente", async () => {
      const res = await request(app).delete("/api/v1/categoria/1");
      expect(res.statusCode).toBe(201);
      expect(res.body.updatedRows).toBe(1);
    });

    it("debería retornar 404 si la categoría no existe", async () => {
      const res = await request(app).delete("/api/v1/categoria/9999");
      expect(res.statusCode).toBe(404);
    });
  });
});
