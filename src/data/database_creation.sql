CREATE DATABASE IF NOT EXISTS electroshok;
USE electroshok;

-- Tabla: Categoría
CREATE TABLE Categoria (
                           id_categoria INT PRIMARY KEY AUTO_INCREMENT,
                           nombre_categoria VARCHAR(100) NOT NULL,
                           tipo_categoria VARCHAR(100),
                           fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                           esta_activa BOOLEAN DEFAULT TRUE
);

-- Tabla: Usuario
CREATE TABLE Usuario (
                         id_usuario INT PRIMARY KEY AUTO_INCREMENT,
                         nombre VARCHAR(100) NOT NULL,
                         correo_electronico VARCHAR(100) NOT NULL UNIQUE,
                         contrasena VARCHAR(255) NOT NULL,
                         rol ENUM('cliente', 'administrador') DEFAULT 'cliente',
                         fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                         esta_activo BOOLEAN DEFAULT TRUE
);

-- Tabla: Producto
CREATE TABLE Producto (
                          id_producto INT PRIMARY KEY AUTO_INCREMENT,
                          nombre VARCHAR(150) NOT NULL,
                          descripcion TEXT,
                          precio DECIMAL(10, 2) NOT NULL,
                          stock INT NOT NULL,
                          url_imagen VARCHAR(255),
                          id_categoria INT,
                          fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                          esta_activo BOOLEAN DEFAULT TRUE,
                          FOREIGN KEY (id_categoria) REFERENCES Categoria(id_categoria)
);

-- Tabla: CarritoItem
CREATE TABLE CarritoItem (
                             id_item INT PRIMARY KEY AUTO_INCREMENT,
                             id_usuario INT NOT NULL,
                             id_producto INT NOT NULL,
                             cantidad INT NOT NULL,
                             FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario),
                             FOREIGN KEY (id_producto) REFERENCES Producto(id_producto)
);

-- Tabla: Pedido
CREATE TABLE Pedido (
                        id_pedido INT PRIMARY KEY AUTO_INCREMENT,
                        fecha_pedido TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        id_usuario INT NOT NULL,
                        total DECIMAL(10, 2) NOT NULL,
                        estado ENUM('pendiente', 'pagado', 'cancelado') DEFAULT 'pendiente',
                        fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                        FOREIGN KEY (id_usuario) REFERENCES Usuario(id_usuario)
);

-- Tabla: DetallePedido
CREATE TABLE DetallePedido (
                               id_detalle INT PRIMARY KEY AUTO_INCREMENT,
                               id_pedido INT NOT NULL,
                               id_producto INT NOT NULL,
                               cantidad INT NOT NULL,
                               precio_unitario DECIMAL(10,2) NOT NULL,
                               FOREIGN KEY (id_pedido) REFERENCES Pedido(id_pedido),
                               FOREIGN KEY (id_producto) REFERENCES Producto(id_producto)
);



-- Inserts:

-- categoria
INSERT INTO `electroshok`.`categoria`
(`id_categoria`, `nombre_categoria`, `tipo_categoria`, `fecha_creacion`, `esta_activa`)
VALUES
(1, 'Televisores', 'Electrodoméstico', '2025-05-01 10:00:00', 1),
(2, 'Computadoras', 'Tecnología', '2025-05-01 10:00:00', 1),
(3, 'Smartphones', 'Tecnología', '2025-05-01 10:00:00', 1),
(4, 'Audio', 'Electrónica', '2025-05-01 10:00:00', 1),
(5, 'Hogar Inteligente', 'Domótica', '2025-05-01 10:00:00', 1),
(6, 'Electrodomésticos', 'Hogar', '2025-05-01 10:00:00', 1),
(7, 'Cámaras', 'Tecnología', '2025-05-01 10:00:00', 1),
(8, 'Accesorios', 'Complementos', '2025-05-01 10:00:00', 1),
(9, 'Consolas', 'Videojuegos', '2025-05-01 10:00:00', 1),
(10, 'Iluminación', 'Hogar', '2025-05-01 10:00:00', 1);


-- producto
INSERT INTO `electroshok`.`producto`
(`id_producto`, `nombre`, `descripcion`, `precio`, `stock`, `url_imagen`, `id_categoria`, `fecha_creacion`, `esta_activo`)
VALUES
(1, 'Smart TV Samsung 55"', 'Televisor UHD 4K con Smart Hub y HDR10+', 799.99, 15, 'https://example.com/img/samsung55.jpg', 1, '2025-05-02 09:00:00', 1),
(2, 'Laptop Dell Inspiron', 'Intel Core i5, 16GB RAM, 512GB SSD', 899.00, 10, 'https://example.com/img/dell_inspiron.jpg', 2, '2025-05-02 09:05:00', 1),
(3, 'iPhone 14 Pro', 'Apple iPhone 14 Pro de 128GB, color negro', 1199.99, 20, 'https://example.com/img/iphone14pro.jpg', 3, '2025-05-02 09:10:00', 1),
(4, 'Auriculares Sony WH-1000XM5', 'Noise cancelling, Bluetooth, hasta 30h de batería', 349.99, 25, 'https://example.com/img/sony_wh1000xm5.jpg', 4, '2025-05-02 09:15:00', 1),
(5, 'Google Nest Hub', 'Pantalla inteligente con Google Assistant integrado', 129.99, 30, 'https://example.com/img/nesthub.jpg', 5, '2025-05-02 09:20:00', 1),
(6, 'Licuadora Oster 10 Velocidades', 'Vaso de vidrio, motor de 700W, color negro', 79.99, 50, 'https://example.com/img/oster_licuadora.jpg', 6, '2025-05-02 09:25:00', 1),
(7, 'Cámara Canon EOS Rebel T7', 'DSLR 24.1 MP, lente 18-55mm incluida', 599.00, 12, 'https://example.com/img/canon_t7.jpg', 7, '2025-05-02 09:30:00', 1),
(8, 'Cargador portátil Anker 10000mAh', 'Powerbank con carga rápida USB-C', 39.99, 40, 'https://example.com/img/anker_powerbank.jpg', 8, '2025-05-02 09:35:00', 1),
(9, 'PlayStation 5', 'Consola de videojuegos Sony PS5, edición estándar', 699.00, 5, 'https://example.com/img/ps5.jpg', 9, '2025-05-02 09:40:00', 1),
(10, 'Tira LED RGB WiFi', 'Iluminación LED controlada por app o voz', 24.99, 60, 'https://example.com/img/led_rgb.jpg', 10, '2025-05-02 09:45:00', 1);
