# SaludGuard - Instrucciones rápidas Docker Compose

## Requisitos
- Tener instalado [Docker Desktop](https://www.docker.com/products/docker-desktop/) o Docker Engine.

## Levantar todo el sistema (backend y frontend)

1. Clona este repositorio y entra a la carpeta principal del proyecto.

2. Ejecuta:

```
docker compose up -d
```

Esto construirá y levantará automáticamente el backend y el frontend.

- El backend estará disponible en: http://localhost:4000
- El frontend estará disponible en: http://localhost:5173

Los usuarios de prueba se crean automáticamente con la contraseña `123456`.

## Detener los servicios

Para detener todo:

```
docker compose down
```

---

¡Listo! No necesitas más pasos para probar la app.
