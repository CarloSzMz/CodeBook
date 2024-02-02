-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 02-02-2024 a las 08:18:25
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `codebook`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `Id` int(11) NOT NULL,
  `Lenguaje` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`Id`, `Lenguaje`, `created_at`, `updated_at`) VALUES
(1, 'javascript', '2024-01-25 07:25:19', '2024-01-25 07:25:19'),
(2, 'java', '2024-01-25 07:25:29', '2024-01-25 07:25:29'),
(3, 'php', '2024-01-25 07:25:33', '2024-01-25 07:25:33');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `Id` int(11) NOT NULL,
  `Id_Usuario` int(11) NOT NULL,
  `Id_Curso` int(11) NOT NULL,
  `Mensaje` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comentarios`
--

INSERT INTO `comentarios` (`Id`, `Id_Usuario`, `Id_Curso`, `Mensaje`, `created_at`, `updated_at`) VALUES
(1, 12, 6, 'hola', '2024-01-29 09:02:44', '2024-01-29 09:02:44'),
(2, 12, 6, 'que tal estas', '2024-01-29 09:02:59', '2024-01-29 09:02:59'),
(3, 7, 6, 'yo bien la verdad', '2024-01-29 09:03:24', '2024-01-29 09:03:24'),
(4, 1, 6, 'yo bien la verdad', '2024-01-29 09:03:42', '2024-01-29 09:03:42'),
(5, 1, 7, 'yo bien la verdad', '2024-01-29 10:35:41', '2024-01-29 10:35:41'),
(6, 1, 7, 'yo bien la verdad2', '2024-01-29 10:35:45', '2024-01-29 10:35:45'),
(7, 12, 6, 'HOLA\r\n', '2024-01-30 08:47:37', '2024-01-30 08:47:37'),
(8, 12, 6, 'que tal estamos', '2024-01-30 08:49:06', '2024-01-30 08:49:06'),
(9, 12, 6, 'que tal estamos', '2024-01-30 08:50:06', '2024-01-30 08:50:06'),
(10, 12, 6, 'ya puedo escribir\r\n', '2024-01-30 08:51:06', '2024-01-30 08:51:06'),
(31, 12, 6, 'hola\r\n', '2024-01-31 10:19:50', '2024-01-31 10:19:50');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cursos`
--

CREATE TABLE `cursos` (
  `Id` int(11) NOT NULL,
  `Id_Categoria` int(11) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Descripcion` varchar(255) NOT NULL,
  `Miniatura` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cursos`
--

INSERT INTO `cursos` (`Id`, `Id_Categoria`, `Nombre`, `Descripcion`, `Miniatura`, `created_at`, `updated_at`) VALUES
(6, 1, 'JavaSript Moderno', 'Tutorial de JavaScript Actualizado', '../img/Rectangle_2.png', '2024-01-26 07:48:35', '2024-01-26 07:48:35'),
(7, 3, 'PHP to Hero', 'Manual definitivo de PHP', '../img/Rectangle_3.png', '2024-01-26 07:50:04', '2024-01-26 07:50:04');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `episodios`
--

CREATE TABLE `episodios` (
  `Id` int(11) NOT NULL,
  `Id_curso` int(11) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Descripcion` varchar(255) NOT NULL,
  `URL` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `Miniatura` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `episodios`
--

INSERT INTO `episodios` (`Id`, `Id_curso`, `Nombre`, `Descripcion`, `URL`, `created_at`, `updated_at`, `Miniatura`) VALUES
(1, 6, 'Ep_1 Introduccion a JS', 'Entender cómo funcionan los navegadores e introducción a variables', '../vid/1. Introducción.mp4', '2024-01-26 09:03:17', '2024-01-26 09:03:17', '/img/Rectangle_5.png'),
(2, 6, 'Ep_2 Hello World', 'Iniciacion en el mundo de js con uso de variables', 'http://url.com', '2024-01-26 09:04:03', '2024-01-26 09:04:03', '/img/Rectangle_5.png'),
(4, 6, 'Ep_3 Arrays', 'Inicializacion al mundo de las colecciones', 'http://url.com', '2024-01-30 11:46:26', '2024-01-30 11:46:26', '/img/Rectangle_5.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favorito_cursos`
--

CREATE TABLE `favorito_cursos` (
  `Id` int(11) NOT NULL,
  `Id_Usuario` int(11) NOT NULL,
  `Id_Curso` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `favorito_cursos`
--

INSERT INTO `favorito_cursos` (`Id`, `Id_Usuario`, `Id_Curso`, `created_at`, `updated_at`) VALUES
(14, 14, 6, '2024-02-01 07:18:20', '2024-02-01 07:18:20'),
(31, 12, 6, '2024-02-01 11:14:53', '2024-02-01 11:14:53'),
(32, 12, 7, '2024-02-01 11:48:15', '2024-02-01 11:48:15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favorito_libros`
--

CREATE TABLE `favorito_libros` (
  `Id` int(11) NOT NULL,
  `Id_Usuario` int(11) NOT NULL,
  `Id_Libro` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `favorito_libros`
--

INSERT INTO `favorito_libros` (`Id`, `Id_Usuario`, `Id_Libro`, `created_at`, `updated_at`) VALUES
(7, 12, 2, '2024-01-31 12:20:57', '2024-01-31 12:20:57'),
(9, 14, 2, '2024-02-01 07:18:21', '2024-02-01 07:18:21');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventario_curso`
--

CREATE TABLE `inventario_curso` (
  `Id` int(11) NOT NULL,
  `Id_Usuario` int(11) NOT NULL,
  `Id_Curso` int(11) NOT NULL,
  `created_at` varchar(255) NOT NULL DEFAULT current_timestamp(),
  `updated_at` varchar(255) NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `inventario_curso`
--

INSERT INTO `inventario_curso` (`Id`, `Id_Usuario`, `Id_Curso`, `created_at`, `updated_at`) VALUES
(47, 12, 6, '2024-02-01 12:47:55', '2024-02-01 12:47:55'),
(48, 12, 7, '2024-02-01 12:48:23', '2024-02-01 12:48:23');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventario_libros`
--

CREATE TABLE `inventario_libros` (
  `Id` int(11) NOT NULL,
  `Id_Usuario` int(11) NOT NULL,
  `Id_Libro` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `libros`
--

CREATE TABLE `libros` (
  `Id` int(11) NOT NULL,
  `Id_Categoria` int(11) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Descripcion` varchar(255) NOT NULL,
  `Fichero` varchar(255) NOT NULL,
  `Miniatura` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `libros`
--

INSERT INTO `libros` (`Id`, `Id_Categoria`, `Nombre`, `Descripcion`, `Fichero`, `Miniatura`, `created_at`, `updated_at`) VALUES
(1, 1, 'Libro JS', 'El mejor manual de JavaScript Ever', '../libros/PDF1.pdf', '../img/Rectangle_2.png', '2024-01-26 07:58:20', '2024-01-26 07:58:20'),
(2, 3, 'Libro PHP', 'El mejor manual de PHP Ever', './ficheros/php.pdf', '../img/Rectangle_5.png', '2024-01-26 07:59:06', '2024-01-26 07:59:06');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajes`
--

CREATE TABLE `mensajes` (
  `Id` int(11) NOT NULL,
  `nombreRemitente` varchar(255) DEFAULT NULL,
  `nombreDestinatario` varchar(255) DEFAULT NULL,
  `mensaje` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `mensajes`
--

INSERT INTO `mensajes` (`Id`, `nombreRemitente`, `nombreDestinatario`, `mensaje`, `created_at`, `updated_at`) VALUES
(1, 'david', 'david', 'hola', '2024-02-01 09:31:20', '2024-02-01 09:31:20'),
(2, 'david', 'david', 'hoal', '2024-02-01 09:31:54', '2024-02-01 09:31:54'),
(3, 'david', 'david', 'ff it', '2024-02-01 10:43:57', '2024-02-01 10:43:57'),
(4, 'david', 'david', 'sdfjtgdf', '2024-02-01 10:57:31', '2024-02-01 10:57:31');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `Id` int(11) NOT NULL,
  `Nombre` varchar(255) NOT NULL,
  `Correo` varchar(255) NOT NULL,
  `Contraseña` varchar(255) NOT NULL,
  `Admin` int(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `latitud` double DEFAULT NULL,
  `longitud` double DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`Id`, `Nombre`, `Correo`, `Contraseña`, `Admin`, `created_at`, `updated_at`, `latitud`, `longitud`) VALUES
(1, 'carlos', 'carlos@gmail.com', '$2y$10$FDNwcLxF5GaRL/aiIXrqUuAqUdgs5J.zY2b7aFu/tiBAe8Gv5FD5i', 1, '2024-01-19 07:42:07', '2024-01-19 07:42:07', NULL, NULL),
(7, 'sergio', 'sergio@gmail.com', '$2y$10$Do.I3H8jqUCDNPTzhHk6GOe.NjC5oATNXLWf2n2f7YC5ECgY9V1FC', 1, '2024-01-23 08:10:39', '2024-01-23 08:10:39', NULL, NULL),
(12, 'david', 'david@gmail.com', '$2y$10$zKp5h6czpGqURaR4AtcYA.j1ldQ3qrPhHKjqd6IlZfKcThYs2iqCS', 1, '2024-01-26 08:09:09', '2024-01-26 08:09:09', 39.4520748, -0.4101619),
(13, 'pepe', 'pepe@gmail.com', '$2y$10$XmjWfeg/EgJxO4InKhCinev37Z8llTV5HGMr2z5gURbfJ0YlfX.8S', 0, '2024-01-29 10:46:25', '2024-01-29 10:46:25', NULL, NULL),
(14, 'j', 'j@gmail.com', '$2y$10$yKsbNLb0W3x750auTwBzM.Fx4M4PfKYvaKASfXg9gTSlaRhbmBcXe', 0, '2024-01-29 12:50:33', '2024-01-29 12:50:33', NULL, NULL),
(15, 'pepito', 'pepito@gmail.com', '$2y$10$SPGRxyXEo0I23hEaNpAWf.70UVDa3ZmTh0Q.Lh5aS54g3slRLNL0G', 0, '2024-01-29 13:00:10', '2024-01-29 13:00:10', NULL, NULL);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Id_Usuario` (`Id_Usuario`),
  ADD KEY `Id_Curso` (`Id_Curso`);

--
-- Indices de la tabla `cursos`
--
ALTER TABLE `cursos`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Nombre` (`Nombre`),
  ADD KEY `Id_Categoria` (`Id_Categoria`);

--
-- Indices de la tabla `episodios`
--
ALTER TABLE `episodios`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Id_curso` (`Id_curso`);

--
-- Indices de la tabla `favorito_cursos`
--
ALTER TABLE `favorito_cursos`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Id_Usuario` (`Id_Usuario`),
  ADD KEY `Id_Curso` (`Id_Curso`);

--
-- Indices de la tabla `favorito_libros`
--
ALTER TABLE `favorito_libros`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Id_Usuario` (`Id_Usuario`),
  ADD KEY `Id_Libro` (`Id_Libro`);

--
-- Indices de la tabla `inventario_curso`
--
ALTER TABLE `inventario_curso`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Id_Usuario` (`Id_Usuario`),
  ADD KEY `Id_Curso` (`Id_Curso`);

--
-- Indices de la tabla `inventario_libros`
--
ALTER TABLE `inventario_libros`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Id_Usuario` (`Id_Usuario`),
  ADD KEY `Id_Libro` (`Id_Libro`);

--
-- Indices de la tabla `libros`
--
ALTER TABLE `libros`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `Id_Categoria` (`Id_Categoria`);

--
-- Indices de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD PRIMARY KEY (`Id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `Nombre` (`Nombre`),
  ADD UNIQUE KEY `Correo` (`Correo`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT de la tabla `cursos`
--
ALTER TABLE `cursos`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `episodios`
--
ALTER TABLE `episodios`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `favorito_cursos`
--
ALTER TABLE `favorito_cursos`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT de la tabla `favorito_libros`
--
ALTER TABLE `favorito_libros`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `inventario_curso`
--
ALTER TABLE `inventario_curso`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT de la tabla `inventario_libros`
--
ALTER TABLE `inventario_libros`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `libros`
--
ALTER TABLE `libros`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `mensajes`
--
ALTER TABLE `mensajes`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `Id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`Id_Curso`) REFERENCES `cursos` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`Id_Usuario`) REFERENCES `usuarios` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `cursos`
--
ALTER TABLE `cursos`
  ADD CONSTRAINT `cursos_ibfk_2` FOREIGN KEY (`Id_Categoria`) REFERENCES `categorias` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `episodios`
--
ALTER TABLE `episodios`
  ADD CONSTRAINT `episodios_ibfk_1` FOREIGN KEY (`Id_curso`) REFERENCES `cursos` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `favorito_cursos`
--
ALTER TABLE `favorito_cursos`
  ADD CONSTRAINT `favorito_cursos_ibfk_1` FOREIGN KEY (`Id_Usuario`) REFERENCES `usuarios` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `favorito_cursos_ibfk_2` FOREIGN KEY (`Id_Curso`) REFERENCES `cursos` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `favorito_libros`
--
ALTER TABLE `favorito_libros`
  ADD CONSTRAINT `favorito_libros_ibfk_1` FOREIGN KEY (`Id_Libro`) REFERENCES `libros` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `favorito_libros_ibfk_2` FOREIGN KEY (`Id_Usuario`) REFERENCES `usuarios` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `inventario_curso`
--
ALTER TABLE `inventario_curso`
  ADD CONSTRAINT `inventario_curso_ibfk_1` FOREIGN KEY (`Id_Curso`) REFERENCES `cursos` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `inventario_curso_ibfk_2` FOREIGN KEY (`Id_Usuario`) REFERENCES `usuarios` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `inventario_libros`
--
ALTER TABLE `inventario_libros`
  ADD CONSTRAINT `inventario_libros_ibfk_1` FOREIGN KEY (`Id_Libro`) REFERENCES `libros` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `inventario_libros_ibfk_2` FOREIGN KEY (`Id_Usuario`) REFERENCES `usuarios` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `libros`
--
ALTER TABLE `libros`
  ADD CONSTRAINT `libros_ibfk_1` FOREIGN KEY (`Id_Categoria`) REFERENCES `categorias` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
