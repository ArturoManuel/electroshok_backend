CREATE DATABASE  IF NOT EXISTS `electroshok` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `electroshok`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: electroshok
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carritoitem`
--

DROP TABLE IF EXISTS `carritoitem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carritoitem` (
                               `id_item` int NOT NULL AUTO_INCREMENT,
                               `id_usuario` int NOT NULL,
                               `id_producto` int NOT NULL,
                               `cantidad` int NOT NULL,
                               PRIMARY KEY (`id_item`),
                               KEY `id_usuario` (`id_usuario`),
                               KEY `id_producto` (`id_producto`),
                               CONSTRAINT `carritoitem_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`),
                               CONSTRAINT `carritoitem_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carritoitem`
--

LOCK TABLES `carritoitem` WRITE;
/*!40000 ALTER TABLE `carritoitem` DISABLE KEYS */;
/*!40000 ALTER TABLE `carritoitem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
                             `id_categoria` int NOT NULL AUTO_INCREMENT,
                             `nombre_categoria` varchar(100) NOT NULL,
                             `tipo_categoria` varchar(100) DEFAULT NULL,
                             `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
                             `esta_activo` tinyint(1) DEFAULT '1',
                             PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'Televisores','Electrodoméstico','2025-05-01 15:00:00',1),(2,'Computadoras','Tecnología','2025-05-01 15:00:00',1),(3,'Smartphones','Tecnología','2025-05-01 15:00:00',1),(4,'Audio','Electrónica','2025-05-01 15:00:00',1),(5,'Hogar Inteligente','Domótica','2025-05-01 15:00:00',1),(6,'Electrodomésticos','Hogar','2025-05-01 15:00:00',1),(7,'Cámaras','Tecnología','2025-05-01 15:00:00',1),(8,'Accesorios','Complementos','2025-05-01 15:00:00',1),(9,'Consolas','Videojuegos','2025-05-01 15:00:00',1),(10,'Iluminación','Hogar','2025-05-01 15:00:00',1),(11,'testing22','testing23','2025-05-09 15:43:26',0);
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detallepedido`
--

DROP TABLE IF EXISTS `detallepedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detallepedido` (
                                 `id_detalle` int NOT NULL AUTO_INCREMENT,
                                 `id_pedido` int NOT NULL,
                                 `id_producto` int NOT NULL,
                                 `cantidad` int NOT NULL,
                                 `precio_unitario` decimal(10,2) NOT NULL,
                                 PRIMARY KEY (`id_detalle`),
                                 KEY `id_pedido` (`id_pedido`),
                                 KEY `id_producto` (`id_producto`),
                                 CONSTRAINT `detallepedido_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedido` (`id_pedido`),
                                 CONSTRAINT `detallepedido_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `producto` (`id_producto`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detallepedido`
--

LOCK TABLES `detallepedido` WRITE;
/*!40000 ALTER TABLE `detallepedido` DISABLE KEYS */;
INSERT INTO `detallepedido` VALUES (1,2,1,1,7998.99),(2,3,1,1,7998.99),(3,4,1,1,7998.99),(4,5,2,2,899.00);
/*!40000 ALTER TABLE `detallepedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedido`
--

DROP TABLE IF EXISTS `pedido`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pedido` (
                          `id_pedido` int NOT NULL AUTO_INCREMENT,
                          `fecha_pedido` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
                          `id_usuario` int NOT NULL,
                          `total` decimal(10,2) NOT NULL,
                          `estado` enum('pendiente','pagado','cancelado') DEFAULT 'pendiente',
                          `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
                          PRIMARY KEY (`id_pedido`),
                          KEY `id_usuario` (`id_usuario`),
                          CONSTRAINT `pedido_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedido`
--

LOCK TABLES `pedido` WRITE;
/*!40000 ALTER TABLE `pedido` DISABLE KEYS */;
INSERT INTO `pedido` VALUES (1,'2025-05-11 13:36:17',1,7998.99,'pendiente','2025-05-11 13:36:17'),(2,'2025-05-11 13:36:48',1,7998.99,'pendiente','2025-05-11 13:36:48'),(3,'2025-05-11 13:37:03',1,7998.99,'pendiente','2025-05-11 13:37:03'),(4,'2025-05-11 13:37:16',1,7998.99,'pendiente','2025-05-11 13:37:16'),(5,'2025-05-13 02:32:59',1,1798.00,'pendiente','2025-05-13 02:32:59');
/*!40000 ALTER TABLE `pedido` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `producto`
--

DROP TABLE IF EXISTS `producto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `producto` (
                            `id_producto` int NOT NULL AUTO_INCREMENT,
                            `nombre` varchar(150) NOT NULL,
                            `descripcion` text,
                            `precio` decimal(10,2) NOT NULL,
                            `stock` int NOT NULL,
                            `url_imagen` varchar(255) DEFAULT NULL,
                            `id_categoria` int DEFAULT NULL,
                            `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
                            `esta_activo` tinyint(1) DEFAULT '1',
                            PRIMARY KEY (`id_producto`),
                            KEY `id_categoria` (`id_categoria`),
                            CONSTRAINT `producto_ibfk_1` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id_categoria`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `producto`
--

LOCK TABLES `producto` WRITE;
/*!40000 ALTER TABLE `producto` DISABLE KEYS */;
INSERT INTO `producto` VALUES (1,'Smart TV Samsungg 551\"','Televisor UHD 4K con Smart Hub y HDR10+',799.99,13,'archivo-1747103750747.jpg',1,'2025-05-02 14:00:00',1),(2,'Laptop Dell Inspiron','Intel Core i5, 16GB RAM, 512GB SSD',899.00,10,'archivo-1747103836868.jpg',2,'2025-05-02 14:05:00',1),(3,'iPhone 14 Pro','Apple iPhone 14 Pro de 128GB, color negro',1199.99,20,'https://example.com/img/iphone14pro.jpg',3,'2025-05-02 14:10:00',1),(4,'Auriculares Sony WH-1000XM5','Noise cancelling, Bluetooth, hasta 30h de batería',349.99,25,'https://example.com/img/sony_wh1000xm5.jpg',4,'2025-05-02 14:15:00',1),(5,'Google Nest Hub','Pantalla inteligente con Google Assistant integrado',129.99,30,'https://example.com/img/nesthub.jpg',5,'2025-05-02 14:20:00',1),(6,'Licuadora Oster 10 Velocidades','Vaso de vidrio, motor de 700W, color negro',79.99,50,'https://example.com/img/oster_licuadora.jpg',6,'2025-05-02 14:25:00',1),(7,'Cámara Canon EOS Rebel T7','DSLR 24.1 MP, lente 18-55mm incluida',599.00,12,'https://example.com/img/canon_t7.jpg',7,'2025-05-02 14:30:00',1),(8,'Cargador portátil Anker 10000mAh','Powerbank con carga rápida USB-C',39.99,40,'https://example.com/img/anker_powerbank.jpg',8,'2025-05-02 14:35:00',1),(9,'PlayStation 5','Consola de videojuegos Sony PS5, edición estándar',699.00,5,'https://example.com/img/ps5.jpg',9,'2025-05-02 14:40:00',1),(10,'Tira LED RGB WiFi','Iluminación LED controlada por app o voz',24.99,60,'https://example.com/img/led_rgb.jpg',10,'2025-05-02 14:45:00',1),(11,'Smart TV Samsungg 54451\"','Televisor UHD 4K con Sma44rt Hub y HDR10+',71998.99,143,'https://example.com/img/samsung55.jpg',1,'2025-05-09 17:17:16',1),(12,'Smart TV Samsungg 54422251\"','Televisor UHD 4K con Sma44rt Hub y HDR10+',71998.99,143,'https://example.com/img/samsung55.jpg',1,'2025-05-09 17:19:03',1),(13,'Smart TV Samsungg 54424234232251\"','Televisor UHD 4K con Sma44rt Hub y HDR10+',71998.99,143,'https://example.com/img/samsung55.jpg',1,'2025-05-09 17:22:17',1),(14,'Smart TV Samsungg 54424234232251\"','Televisor UHD 4K 312con Sma44rt Hub y HDR10+',71998.99,143,'https://example.com/img/samsung55.jpg',1,'2025-05-09 17:23:14',1);
/*!40000 ALTER TABLE `producto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
                           `id_usuario` int NOT NULL AUTO_INCREMENT,
                           `nombre` varchar(100) NOT NULL,
                           `correo_electronico` varchar(100) NOT NULL,
                           `contrasena` varchar(255) NOT NULL,
                           `rol` enum('cliente','administrador') DEFAULT 'cliente',
                           `fecha_creacion` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
                           `esta_activo` tinyint(1) DEFAULT '1',
                           `intentos` int NOT NULL DEFAULT '0',
                           PRIMARY KEY (`id_usuario`),
                           UNIQUE KEY `correo_electronico` (`correo_electronico`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (1,'brunodiaz','brunodiazg@mail.com','$2b$10$nZc2eYJN0L6/Xe2X3AbmC.g.X9ZM82JpWpsz5CDktjPQ7/JVbHNHi','administrador','2025-05-07 14:44:47',1,1),(2,'arturomanuel','arturo@mail.com','$2b$10$0btnkmUhJqESTmQGNoYZUeThblBhcwDEV3dSmpiGDxNgF76v4kac6','administrador','2025-05-13 02:26:53',1,0);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-08-06 15:00:46
