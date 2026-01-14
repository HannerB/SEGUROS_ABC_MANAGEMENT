import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Ha ocurrido un error inesperado';

      if (error.error instanceof ErrorEvent) {
        // Error del lado del cliente
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Error del lado del servidor
        switch (error.status) {
          case 0:
            errorMessage = 'No se pudo conectar con el servidor. Verifique su conexión a internet.';
            break;
          case 400:
            errorMessage = extractErrorMessage(error) || 'Datos inválidos. Verifique la información ingresada.';
            break;
          case 401:
            errorMessage = 'No autorizado. Por favor inicie sesión nuevamente.';
            break;
          case 403:
            errorMessage = 'No tiene permisos para realizar esta acción.';
            break;
          case 404:
            errorMessage = 'El recurso solicitado no fue encontrado.';
            break;
          case 409:
            errorMessage = extractErrorMessage(error) || 'El registro ya existe.';
            break;
          case 422:
            errorMessage = extractErrorMessage(error) || 'Error de validación.';
            break;
          case 500:
            errorMessage = 'Error interno del servidor. Intente nuevamente más tarde.';
            break;
          default:
            errorMessage = extractErrorMessage(error) || `Error ${error.status}: ${error.statusText}`;
        }
      }

      console.error('HTTP Error:', {
        status: error.status,
        message: errorMessage,
        url: req.url
      });

      return throwError(() => new Error(errorMessage));
    })
  );
};

function extractErrorMessage(error: HttpErrorResponse): string | null {
  if (error.error) {
    // Intentar extraer mensaje del cuerpo del error
    if (typeof error.error === 'string') {
      return error.error;
    }
    if (error.error.message) {
      return error.error.message;
    }
    if (error.error.title) {
      return error.error.title;
    }
    if (error.error.errors) {
      // Manejar errores de validación de ASP.NET
      const errors = error.error.errors;
      const messages = Object.keys(errors)
        .map(key => errors[key].join(', '))
        .join('\n');
      return messages;
    }
  }
  return null;
}
