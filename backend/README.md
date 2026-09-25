# SaludGuard Backend

Backend API para la app SaludGuard usando Node.js, Express y SQLite.

## Endpoints principales

- Autenticación: `/api/auth/login`
- Usuarios: `/api/users` (listar, cambiar estado/rol)
- Tutelas: `/api/tutelas` (listar, crear, asignar)
- Documentos: `/api/documents` (listar por tutela, crear)

## Comandos útiles

- `npm install` — Instala dependencias
- `npm run migrate` — Crea tablas en la base de datos
- `node src/models/seed.js` — Inserta usuarios de ejemplo
- `npm run dev` — Inicia el servidor en modo desarrollo

## Variables de entorno

- `JWT_SECRET` — Secreto para JWT
- `PORT` — Puerto del servidor (por defecto 4000)
- `DATABASE_URL` — Ruta del archivo SQLite

---

Este backend está listo para conectar con el frontend React de SaludGuard.
