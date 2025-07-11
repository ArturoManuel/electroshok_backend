import request from "supertest";
import app from "../index.js";

describe("Usuario Controller", () => {
  describe("GET /api/v1/usuario", () => {
    it("debería retornar una lista de usuario", async () => {
      const res = await request(app).get("/api/v1/usuario");
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe("GET /api/v1/usuario/:id", () => {
    it("debería retornar un usuario por id", async () => {
      const res = await request(app).get("/api/v1/usuario/1");
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("id_usuario", 1);
    });

    it("debería retornar 404 si el usuario no existe", async () => {
      const res = await request(app).get("/api/v1/usuario/9999");
      expect(res.statusCode).toBe(404);
    });
  });

  describe("POST /api/v1/usuario", () => {
    it("debería crear un nuevo usuario", async () => {
      const nuevoUsuario = {
        nombre: "Juan",
        correo_electronico: "juan@test.com",
        contrasena: "123456",
      };
      const res = await request(app).post("/api/v1/usuario").send(nuevoUsuario);
      expect(res.statusCode).toBe(201);
      expect(res.body).toHaveProperty("id_usuario");
      expect(res.body.nombre).toBe("Juan");
    });

    it("debería retornar 400 si faltan datos", async () => {
      const res = await request(app).post("/api/v1/usuario").send({});
      expect(res.statusCode).toBe(400);
    });
  });

  describe("PUT /api/v1/usuario/:id", () => {
    it("debería actualizar un usuario existente", async () => {
      const cambios = { nombre: "Pedro" };
      const res = await request(app).put("/api/v1/usuario/1").send(cambios);
      expect(res.statusCode).toBe(201);
      expect(res.body.nombre).toBe("Pedro");
    });

    it("debería retornar 404 si el usuario no existe", async () => {
      const res = await request(app)
        .put("/api/v1/usuario/9999")
        .send({ nombre: "Pedro" });
      expect(res.statusCode).toBe(404);
    });
  });

  describe("DELETE /api/v1/usuario/:id", () => {
    it("debería eliminar un usuario existente", async () => {
      const res = await request(app).delete("/api/v1/usuario/1");
      expect(res.statusCode).toBe(201);
    });

    it("debería retornar 404 si el usuario no existe", async () => {
      const res = await request(app).delete("/api/v1/usuario/9999");
      expect(res.statusCode).toBe(404);
    });
  });
});
