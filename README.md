# LoginXD - Sistema de Registro y Autenticacion

Sistema completo de autenticacion de usuarios construido con **Astro**, **SQLite** y **Tailwind CSS**. Incluye registro, inicio de sesion, sesiones con cookies HTTP y un panel de usuario protegido.

![Astro](https://img.shields.io/badge/Astro-BC52EE?logo=astro&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?logo=sqlite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)

---

## Caracteristicas

- **Registro de usuarios** con validacion de campos y contrasena segura
- **Inicio de sesion** con verificacion de credenciales
- **Sesiones persistentes** via cookies HTTP Only (7 dias de expiracion)
- **Dashboard protegido** accesible solo con sesion activa
- **Cierre de sesion** con eliminacion segura de cookies
- **Base de datos SQLite** local sin configuracion externa
- **UI oscura** responsiva con Tailwind CSS

## Estructura del Proyecto

```
loginxd/
├── src/
│   ├── db/
│   │   └── database.ts          # Conexion SQLite + esquema
│   ├── layouts/
│   │   └── Layout.astro         # Layout compartido
│   ├── pages/
│   │   ├── index.astro          # Pagina principal
│   │   ├── login.astro          # Formulario de login
│   │   ├── register.astro       # Formulario de registro
│   │   ├── dashboard.astro      # Panel protegido
│   │   └── api/
│   │       ├── register.ts      # POST - crear usuario
│   │       ├── login.ts         # POST - iniciar sesion
│   │       └── logout.ts        # POST - cerrar sesion
│   └── styles/
│       └── global.css           # Estilos globales + Tailwind
├── astro.config.mjs
└── package.json
```

## Requisitos

- [Node.js](https://nodejs.org/) v18 o superior
- npm, yarn o pnpm

## Instalacion

```bash
# Clonar el repositorio
git clone https://github.com/SamuelCubano/login-opencode-test.git
cd login-opencode-test

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

El servidor estara disponible en `http://localhost:4321`

## Comandos

| Comando             | Descripcion                                     |
| :------------------ | :---------------------------------------------- |
| `npm install`       | Instala las dependencias                        |
| `npm run dev`       | Inicia el servidor en `localhost:4321`          |
| `npm run build`     | Genera la version de produccion en `./dist/`    |
| `npm run preview`   | Vista previa del build antes de desplegar       |

## API Endpoints

| Metodo | Ruta             | Descripcion                        | Body                                     |
| :----- | :--------------- | :--------------------------------- | :--------------------------------------- |
| POST   | `/api/register`  | Registra un nuevo usuario          | `{ "name", "email", "password" }`        |
| POST   | `/api/login`     | Inicia sesion y setea cookie       | `{ "email", "password" }`                |
| POST   | `/api/logout`    | Cierra sesion y elimina cookie     | -                                        |

### Codigos de respuesta

| Codigo | Significado                                  |
| :----- | :------------------------------------------- |
| 200    | Operacion exitosa                           |
| 201    | Usuario registrado correctamente            |
| 400    | Campos obligatorios faltantes               |
| 401    | Credenciales incorrectas                    |
| 409    | El email ya esta registrado                  |

## Flujo de Autenticacion

```
┌──────────┐     POST /api/register     ┌──────────┐
│ Registro │ ──────────────────────────► │  SQLite  │
└──────────┘                             └──────────┘
      │
      ▼
┌──────────┐     POST /api/login        ┌──────────┐
│  Login   │ ──────────────────────────► │ Cookie   │
└──────────┘                             │ session= │
      │                                  └──────────┘
      ▼
┌────────────┐   Cookie valida          ┌──────────┐
│ Dashboard  │ ◄──────────────────────  │  Verificar│
│ (protegido)│                          │  sesion   │
└────────────┘                          └──────────┘
```

## Tecnologias

- **[Astro](https://astro.build/)** - Framework web de alto rendimiento
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utility-first
- **[SQLite](https://www.sqlite.org/)** - Base de datos embebida
- **[better-sqlite3](https://github.com/WiseLibs/better-sqlite3)** - Driver SQLite para Node.js

## Licencia

MIT
