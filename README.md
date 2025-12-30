# 🚀 Backend API – NestJS

Backend desarrollado con **NestJS**, autenticación JWT, control de roles, validaciones y persistencia con **PostgreSQL** utilizando **Docker**.

---

## 🧱 Tecnologías utilizadas

- **NestJS** – Framework backend
- **TypeORM** – ORM para base de datos
- **PostgreSQL** – Base de datos relacional
- **Docker & Docker Compose** – Contenerización
- **JWT (JSON Web Token)** – Autenticación
- **Passport.js** – Estrategias de autenticación
- **bcrypt** – Encriptación de contraseñas
- **class-validator / class-transformer** – Validaciones
- **dotenv** – Variables de entorno

---

## 🔐 Seguridad

- Autenticación con **JWT**
- Encriptación de contraseñas con **bcrypt**
- Protección de rutas con **Guards**
- Autorización basada en **roles**
- Decoradores personalizados (a modo de prueba academica):
  - `@Auth()`
  - `@RoleProtected()`
  - `@GetUser()`
---
## ⚙️ Variables de entorno
Crear un archivo .env en la raíz del proyecto (ejemplo):
```bash
PORT=3001
HOST=localhost

PORT_DB=5432
USER_DB=nombre_user
PASSWORD_DB=qwe123$
DATABASE_DB=nombre_bd


JWT_SECRET=mi_clave_secreta_jwt
```

## 🐘 Base de datos (PostgreSQL con Docker)
Imagen oficial utiliza:
docker pull postgres:14.3

La base de datos se levanta usando **Docker Compose**.

### docker-compose.yaml

```yaml
version: '3.8'

services:
  db:
    image: postgres:14.3
    container_name: postgres_app_nest
    restart: always
    ports:
      - "${PORT_DB}:5432"
    environment:
      POSTGRES_DB: ${DATABASE_DB}
      POSTGRES_USER: ${USER_DB}
      POSTGRES_PASSWORD: ${PASSWORD_DB}
    volumes:
      - ./postgres:/var/lib/postgresql/data
```
## ▶️ Instalación y ejecución

### 1️⃣ Clonar el repositorio
```bash
git clone https://github.com/PieroLan/my-first-backend-nest.git
cd my-first-backend-nest
```
### 2️⃣ Instalar dependencias
```bash
npm install
```
### 3️⃣ Levantar la base de datos
```bash
docker-compose up -d
```
### 4️⃣ Ejecutar la aplicación
```bash
npm run start:dev
```

### La API disponible en:
```bash
http://localhost:3001
```
