# SEGUROS ABC MANAGEMENT

Sistema de gestión de asegurados para SEGUROS ABC - Prueba Técnica Atlantic QI

---

## Tecnologías

| Componente | Tecnología | Versión |
|------------|------------|---------|
| Backend | .NET Core | 10.0 |
| ORM | Entity Framework Core | 10.0 |
| Frontend | Angular | 19+ |
| Estilos | Tailwind CSS | 4.x |
| Base de Datos | PostgreSQL | 16 |

---

## Estructura del Proyecto

```
SEGUROS_ABC_MANAGEMENT/
├── backend/
│   └── SegurosABC.API/
│       ├── Controllers/          # AseguradosController (CRUD)
│       ├── Models/               # Asegurado.cs
│       ├── DTOs/                 # Create, Update, Read DTOs
│       ├── Data/                 # ApplicationDbContext
│       ├── Migrations/           # EF Core Migrations
│       └── Program.cs            # Configuración principal
│
├── frontend/
│   └── seguros-abc-app/
│       └── src/app/
│           ├── components/       # Formulario, Lista, Modales
│           ├── services/         # AseguradoService (HTTP)
│           ├── models/           # Interfaces TypeScript
│           └── interceptors/     # Error handling
│
└── README.md
```

---

## Modelo de Datos - Asegurado

| Campo | Tipo | Descripción |
|-------|------|-------------|
| NumeroIdentificacion | long (PK) | Identificador único |
| PrimerNombre | string | Requerido, 2-100 caracteres |
| SegundoNombre | string? | Opcional |
| PrimerApellido | string | Requerido, 2-100 caracteres |
| SegundoApellido | string | Requerido, 2-100 caracteres |
| TelefonoContacto | string | Requerido |
| Email | string | Requerido, único |
| FechaNacimiento | DateTime | Requerido, mayor de 18 años |
| ValorEstimadoSeguro | decimal | Requerido, > 0 |
| Observaciones | string? | Opcional |
| FechaCreacion | DateTime | Auto-generado |
| FechaActualizacion | DateTime? | Auto-actualizado |

---

## API Endpoints

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/asegurados?pageNumber=1&pageSize=10` | Lista paginada |
| GET | `/api/asegurados/{id}` | Obtener por ID |
| GET | `/api/asegurados/filtrar/{numeroIdentificacion}` | Búsqueda parcial |
| POST | `/api/asegurados` | Crear asegurado |
| PUT | `/api/asegurados/{id}` | Actualizar asegurado |
| DELETE | `/api/asegurados/{id}` | Eliminar asegurado |

### Códigos de Respuesta

- `200 OK` - Operación exitosa
- `201 Created` - Asegurado creado
- `400 Bad Request` - Datos inválidos
- `404 Not Found` - No encontrado
- `409 Conflict` - Duplicado (email o identificación)
- `500 Internal Server Error` - Error del servidor

---

## Validaciones

### Backend
- Email único a nivel de base de datos
- Número de identificación único
- Fecha de nacimiento no puede ser futura
- Edad mínima: 18 años
- Validaciones de campos con Data Annotations

### Frontend
- Reactive Forms con validaciones en tiempo real
- Validador personalizado de edad mínima (18 años)
- Mensajes de error en español

---

## Instalación Local

### Requisitos Previos

- .NET SDK 10.0+
- Node.js 18+
- PostgreSQL 14+
- Angular CLI (`npm install -g @angular/cli`)

### Backend

```bash
# Navegar al directorio
cd backend/SegurosABC.API

# Restaurar paquetes
dotnet restore

# Configurar base de datos en appsettings.json
# Host=localhost;Port=5432;Database=SegurosABC;Username=postgres;Password=tu_password

# Aplicar migraciones
dotnet ef database update

# Ejecutar
dotnet run
```

La API estará disponible en: `http://localhost:5056`

### Frontend

```bash
# Navegar al directorio
cd frontend/seguros-abc-app

# Instalar dependencias
npm install

# Ejecutar
ng serve
```

La aplicación estará disponible en: `http://localhost:4200`

---

## Autor

Desarrollado por **Hanner Barros** como parte de la prueba técnica para Atlantic QI.
