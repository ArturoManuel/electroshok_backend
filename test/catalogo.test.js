import request from "supertest";
import app from "../index.js"; // Importa la aplicación Express

describe("Catálogo Controller", () => {
  describe("GET /api/v1/catalogo", () => {
    it("debería retornar una lista de productos", async () => {
      const res = await request(app).get("/api/v1/catalogo");
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe("GET /api/v1/catalogo/:id", () => {
    it("debería retornar un producto por id", async () => {
      const res = await request(app).get("/api/v1/catalogo/1");
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("id_producto", 1);
    });

    it("debería retornar 404 si el producto no existe", async () => {
      const res = await request(app).get("/api/v1/catalogo/9999");
      expect(res.statusCode).toBe(404);
    });
  });

  describe("POST /api/v1/catalogo", () => {
    it("debería crear un nuevo producto", async () => {
      const nuevoProducto = {
        nombre: 'Smart TV Samsungg 55"',
        descripcion: "Televisor UHD 4K con Smart Hub y HDR",
        precio: 719.99,
        stock: 143,
        url_imagen: "https://example.com/img/samsung55.jpg",
        id_categoria: 1,
      };
      const res = await request(app)
        .post("/api/v1/catalogo")
        .send(nuevoProducto);
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("id");
    });

    it("debería retornar 400 si faltan datos", async () => {
      const res = await request(app).post("/api/v1/catalogo").send({});
      expect(res.statusCode).toBe(400);
    });
  });

  describe("PUT /api/v1/catalogo/:id", () => {
    it("debería actualizar un producto existente", async () => {
      const cambios = { nombre: 'Smart TV Samsungg 60"', precio: 1510.99 };
      const res = await request(app).put("/api/v1/catalogo/1").send(cambios);
      expect(res.statusCode).toBe(201);
      expect(res.body.updatedRows).toBe(1);
    });

    it("debería retornar 404 si el producto no existe", async () => {
      const res = await request(app)
        .put("/api/v1/catalogo/9999")
        .send({ nombre: "No existe" });
      expect(res.statusCode).toBe(404);
    });
  });

  describe("DELETE /api/v1/catalogo/:id", () => {
    it("debería eliminar un producto existente", async () => {
      const res = await request(app).delete("/api/v1/catalogo/1");
      expect(res.statusCode).toBe(201);
      expect(res.body.updatedRows).toBe(1);
    });

    it("debería retornar 404 si el producto no existe", async () => {
      const res = await request(app).delete("/api/v1/catalogo/9999");
      expect(res.statusCode).toBe(404);
    });
  });
});
