# Mini backend

Proyecto de mini backend para el curso de Especializacion en Desarrollo Web (PUCP)

REST API para un E-commerce de Productos tecnológicos. El proyecto incluye los siguientes módulos:

- Carrito
- Catalogo
- Categorias
- Pedidos
- Usuario
- Seguridad


# Electroshok – Backend (Express + Sequelize + MySQL)


REST API para un e‑commerce de productos tecnológicos. Incluye módulos de **Catálogo**, **Carrito**, **Pedidos**, **Usuarios** y **Seguridad** con autenticación **JWT**.

> **Ruta base de la API:** `http://localhost:4001/api/v1` (configurable con `PORT` y `FRONTEND_URL` en `.env`)

---

## 1) Requisitos

- **Node.js** 18+ (recomendado 20 LTS)
- **npm** 9+
- **MySQL** 8.x (local o en Docker)
- (Opcional) **Postman** / **Insomnia** para probar la API

---

## 2) Estructura del proyecto

```
electroshok_backend/
├─ index.js                # Bootstrap de Express y middlewares
├─ routes.js               # Router raíz /api/v1
├─ .env                    # Variables de entorno (no subir a git)
├─ src/
│  ├─ config/              # Configuración (DB, JWT, Sequelize, Multer)
│  ├─ controllers/         # Controladores HTTP
│  ├─ data/                # SQL de creación/seed y colección Postman
│  ├─ middleware/          # authMiddleware (JWT + roles)
│  ├─ models/              # Modelos Sequelize (categoria, producto, etc.)
│  ├─ routes/              # Rutas por módulo
│  ├─ services/            # Lógica de negocio
│  └─ uploads/             # Carpeta destino de imágenes (Multer)
└─ test/                   # Pruebas con supertest (ajustar jest.config)
```

---

## 3) Variables de entorno

Crea un archivo **`.env`** en la raíz con el siguiente contenido (o copia desde `.env.example`):

```ini
# Servidor
PORT=4001
FRONTEND_URL=http://localhost:5173

# JWT
JWT_SECRET=CHANGE_ME
JWT_REFRESH_SECRET=CHANGE_ME_TOO

# MySQL
DATABASE_HOST=localhost
DATABASE_USER=root
DATABASE_PASSWORD=
DATABASE_NAME=electroshok
DATABASE_CONNECTION_LIMIT=5
DATABASE_QUEUE_LIMIT=0
```

> **Nota:** En el código `JWT_EXPIRES` y `JWT_REFRESH_EXPIRES` ya están fijados a `1h` y `1d` respectivamente.

---

## 4) Base de datos: 2 rutas posibles

### Opción A — **Usar el SQL incluido (recomendado en Windows/macOS)**

1. Asegúrate de que MySQL esté corriendo.
2. Importa el script **`src/data/database_creation.sql`** en tu servidor MySQL (Workbench o CLI).
   ```bash
   mysql -u root -p < src/data/database_creation.sql
   ```

> **Importante (nombres de tablas y mayúsculas/minúsculas):**  
> Los modelos de Sequelize usan nombres de tabla **en minúscula** (`categoria`, `usuario`, `producto`, …), mientras que el SQL original crea tablas con inicial **en mayúscula** (`Categoria`, `Usuario`, …). En **Windows/macOS** MySQL suele tratar los nombres de tabla de forma no sensible a mayúsculas y funcionará. En **Linux** puede fallar.
>
> Si trabajas en **Linux** o dentro de **Docker** y obtienes errores de “tabla inexistente”, usa la **Opción B** o fija `lower_case_table_names=1` en la configuración del servidor MySQL.

---

### Opción B — **SQL alternativo “coherente con Sequelize” (ideal para Linux/Docker)**

Para evitar problemas de case‑sensitivity, puedes usar el archivo **`database_mysql_lowercase.sql`** (incluido en esta entrega) que crea las tablas **en minúscula** y compatibles 1:1 con los modelos.

1. Crea la BD y tablas en minúscula:
   ```bash
   mysql -u root -p < database_mysql_lowercase.sql
   ```
2. (Opcional) Cambia el **usuario/contraseña** en el script o en tu `.env`.

> El script también incluye un **usuario admin** inicial para poder entrar al panel:
> - **correo:** `admin@demo.com`
> - **contraseña:** `Admin@123`

---

## 5) Instalación y arranque

```bash
# 1) Instalar dependencias
npm install

# 2) Ejecutar en desarrollo (con nodemon)
npm run start
# → escuchará en http://localhost:4001
```

Comprueba el healthcheck básico de Helmet:
```bash
curl http://localhost:4001/api/v1/seguridad/test-helmet
```

---

## 6) Flujo de autenticación (JWT)

1. **Login**  
   `POST /api/v1/seguridad/login`  
   **Body JSON:**
   ```json
   { "correo_electronico": "brunodiaz@gmail.com", "contraseña": "123456" }
   ```
   **Response:** `accessToken` (1h) y `refreshToken` (1d).

2. **Usar el token** en endpoints protegidos:  
   `Authorization: Bearer <accessToken>`

3. **Refrescar token**  
   `POST /api/v1/seguridad/refresh-token` con `{ "refreshToken": "..." }`

Roles disponibles: `administrador`, `cliente`.  
El middleware **`authMiddleware([roles])`** protege rutas por rol.

---

## 7) Endpoints principales

- **Catálogo** `/api/v1/catalogo`
    - `GET /` — listar productos
    - `GET /:id` — producto por id
    - `POST /` *(admin)* — crear
    - `PUT /:id` *(admin)* — actualizar
    - `DELETE /:id` *(admin)* — eliminar
    - `POST /uploadImage` *(admin)* — subir imagen (Multer)
    - `GET /downloadImage/:id` — descarga el archivo asociado

- **Categorías** `/api/v1/categoria`
    - `GET /` — listar
    - `GET /:id` — por id
    - `POST /` *(admin)* — crear
    - `PUT /:id` *(admin)* — actualizar
    - `DELETE /:id` *(admin)* — eliminar

- **Usuarios** `/api/v1/usuario` *(todas requieren admin)*
    - `GET /`, `GET /:id`, `POST /`, `PUT /:id`, `DELETE /:id`

- **Carrito** `/api/v1/carrito` *(requiere login)*
    - `GET /` — items del usuario autenticado
    - `POST /` — agregar item
    - `PUT /:id` — actualizar cantidad
    - `DELETE /:id` — eliminar item
    - `DELETE /` — vaciar carrito

- **Pedidos** `/api/v1/pedido`
    - `POST /` *(login)* — crear pedido desde el carrito
    - `GET /` *(admin)* — listar todos
    - `GET /user/` *(login)* — pedidos del usuario
    - `GET /:id` *(login)* — detalle general
    - `GET /:id/detail` *(login)* — líneas del pedido
    - `PUT /:id` *(login/admin)* — actualizar estado

> Hay una colección **Postman** en `src/data/Curso-backend.postman_collection.json` con ejemplos ya configurados contra `http://localhost:4001`.

---

## 8) Subida de imágenes (Multer)

- Directorio destino: `src/uploads/` (ya existe en el repo).
- Límite de tamaño y validación de extensiones se manejan en `src/config/multer.js`.
- Para crear/actualizar una imagen usa `POST /api/v1/catalogo/uploadImage` con `multipart/form-data`:
    - `id_producto` (number)
    - `archivo` (file)

---

## 9) CORS y seguridad

- **Helmet** aplicado globalmente.
- **CORS** restringido por `FRONTEND_URL` (por defecto `http://localhost:5173`).  
  Ajusta esta variable si el frontend corre en otro puerto/dominio.

---

## 10) Problemas frecuentes

- **ER_ACCESS_DENIED_ERROR / ECONNREFUSED** → revisa credenciales y `DATABASE_HOST` en `.env`.
- **“Table ‘categoria’ doesn’t exist” en Linux** → usa la **Opción B** (tablas en minúscula) o configura MySQL con `lower_case_table_names=1`.
- **401 / 403** → faltó `Authorization: Bearer <token>` o el rol no tiene permisos.
- **Carga de imagen falla** → valida tamaño/extension y que `src/uploads/` exista y tenga permisos de escritura.

---

## 11) Scripts útiles

```bash
# Lint (si decides agregar ESLint)
npx eslint .

# Importar SQL alternativo (minúsculas y seed admin)
mysql -u root -p < database_mysql_lowercase.sql
```

---

## 12) Conectar con el frontend

Configura tu frontend para apuntar a la API:
```ts
// ejemplo (React/Vite)
const API = import.meta.env.VITE_API_URL ?? "http://localhost:4001/api/v1";

async function login(correo_electronico, contrasena) {
  const r = await fetch(`${API}/seguridad/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ correo_electronico, contrasena }),
  });
  return await r.json();
}
```

---

## 13) Pruebas (opcional)

El repo incluye tests con **supertest** en `test/`, pero `jest.config.cjs` está apuntando a carpetas `test/unit` y `test/integracion`.  
Para ejecutarlos, ajusta `jest.config.cjs` para que incluya `test/**/*.test.js` y agrega el script en `package.json`:

```jsonc
// package.json
"scripts": {
  "start": "nodemon index.js",
  "test": "jest"
}
```

Luego:
```bash
npm test
```

---


