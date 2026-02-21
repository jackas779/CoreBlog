|# ✍️ BlogMaster API

**BlogMaster** es una API RESTful profesional construida con el stack **Node.js, Express y MySQL**. [cite_start]Está diseñada para gestionar el ciclo de vida completo de una plataforma de contenidos, desde la seguridad del usuario hasta el posicionamiento SEO de las publicaciones. [cite: 1, 4]

## 🚀 Propósito del Proyecto
El objetivo es proporcionar un backend robusto y escalable que permita:
* [cite_start]**Gestión de Identidad:** Control total de acceso con roles (Admin, Editor, Guest) y autenticación segura. [cite: 8, 10]
* [cite_start]**Contenido Optimizado:** Creación de artículos con generación automática de Slugs para mejorar el SEO. [cite: 11, 13]
* [cite_start]**Interactividad Social:** Un sistema de comentarios moderado para fomentar la comunidad. [cite: 17, 19]
* [cite_start]**Navegación Fluida:** Implementación de paginación avanzada y filtros de búsqueda para manejar grandes volúmenes de datos. [cite: 14, 16]

---

## 🛠️ Arquitectura Técnica
El proyecto sigue una estructura de capas para facilitar el mantenimiento:



* [cite_start]**Servidor:** Express.js para el manejo de rutas y middlewares. 
* [cite_start]**Base de Datos:** MySQL para el almacenamiento de datoss.
* [cite_start]**Seguridad:** Encriptación de contraseñas con Bcrypt y sesiones protegidas por JSON Web Tokens (JWT). 
* [cite_start]**Utilidades:** Integración de `slugify` para transformar títulos en URLs amigables. 


## ⚙️ Requisitos Previos
* Node.js (versión LTS)
* Gestor de paquetes npm o yarn

## 🛠️ Instalación rápida
1. Clonar el repositorio.
2. Instalar dependencias: `npm install`
3. Configurar archivo `.env` con tus credenciales.
4. Iniciar en modo desarrollo: `npm run dev`