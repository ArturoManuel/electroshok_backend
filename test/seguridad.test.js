describe("Seguridad Controller", () => {
  describe("POST /api/v1/seguridad/login", () => {
    it("debería autenticar usuario válido y retornar token", async () => {
      const res = await request(app)
        .post("/api/v1/seguridad/login")
        .send({ email: "usuario@correo.com", password: "password123" });
      expect(res.statusCode).toBe(200);
      expect(res.body).toHaveProperty("token");
    });

    it("debería retornar 401 si las credenciales son inválidas", async () => {
      const res = await request(app)
        .post("/api/v1/seguridad/login")
        .send({ email: "usuario@correo.com", password: "incorrecta" });
      expect(res.statusCode).toBe(401);
    });
  });

  describe("POST /api/v1/seguridad/block", () => {
    it("debería bloquear un usuario", async () => {
      const res = await request(app).post("/api/v1/seguridad/block").send({
        id_usuario: 1,
        correo_electronico: "usuario@corre.com",
      });
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Usuarios afectados: 1");
    });
  });

  describe("POST /api/v1/seguridad/unblock", () => {
    it("debería bloquear un usuario", async () => {
      const res = await request(app).post("/api/v1/seguridad/unblock").send({
        id_usuario: 1,
        correo_electronico: "usuario@corre.com",
      });
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Usuarios afectados: 1");
    });
  });

  describe("GET /api/v1/seguridad/test-helmet", () => {
    it("debería retornar un mensaje de éxito", async () => {
      const res = await request(app).get("/api/v1/seguridad/test-helmet");
      expect(res.statusCode).toBe(200);
      expect(res.body.message).toBe("Helmet is working correctly");
      done();
    });
  });
});
