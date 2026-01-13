# SEGUROS_ABC_MANAGEMENT

Sistema de gestión de asegurados para SEGUROS ABC - Prueba Técnica Atlantic QI

## Descripción

Sistema completo para la gestión de información de potenciales asegurados, desarrollado como solución tecnológica para Atlantic QI.

## Tecnologías

- **Backend**: .NET Core API RESTful
- **Frontend**: Angular
- **Base de Datos**: SQL Server / PostgreSQL
- **Control de Versiones**: Git (GitFlow)

## Estructura del Proyecto

```
SEGUROS_ABC_MANAGEMENT/
├── backend/          # API RESTful en .NET Core
├── frontend/         # Aplicación Angular
└── README.md         # Documentación
```

## Características

### API RESTful
- Crear asegurado
- Obtener lista de asegurados (con paginación)
- Actualizar información de asegurado
- Eliminar asegurado
- Filtrar por número de identificación

### Frontend Angular
- Formulario de registro de asegurados
- Tabla de gestión con edición y eliminación
- Búsqueda por número de identificación
- Validaciones de datos

## Modelo de Datos - Asegurado

- Número de identificación (PK)
- Primer nombre
- Segundo nombre (opcional)
- Primer apellido
- Segundo apellido
- Teléfono de contacto
- E-mail
- Fecha de nacimiento
- Valor estimado de solicitud del seguro
- Observaciones

## Instalación y Configuración

### Backend
```bash
cd backend
dotnet restore
dotnet run
```

### Frontend
```bash
cd frontend
npm install
ng serve
```

## Licencia

Este proyecto fue desarrollado como parte de una prueba técnica para Atlantic QI.
