import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  Asegurado,
  CreateAseguradoDto,
  UpdateAseguradoDto,
  PaginatedResponse
} from '../models/asegurado';

@Injectable({
  providedIn: 'root',
})
export class AseguradoService {
  private apiUrl = 'http://localhost:5056/api/asegurados';

  constructor(private http: HttpClient) { }

  /**
   * Obtiene una lista paginada de asegurados
   * @param pageNumber Número de página (por defecto 1)
   * @param pageSize Tamaño de página (por defecto 10)
   */
  getAsegurados(pageNumber: number = 1, pageSize: number = 10): Observable<PaginatedResponse<Asegurado>> {
    let params = new HttpParams()
      .set('pageNumber', pageNumber.toString())
      .set('pageSize', pageSize.toString());

    const url = `${this.apiUrl}?${params.toString()}`;
    console.log('Llamando a:', url);

    return this.http.get<PaginatedResponse<Asegurado>>(this.apiUrl, { params });
  }

  /**
   * Obtiene un asegurado por su número de identificación
   * @param id Número de identificación del asegurado
   */
  getAseguradoById(id: number): Observable<Asegurado> {
    return this.http.get<Asegurado>(`${this.apiUrl}/${id}`);
  }

  /**
   * Filtra asegurados por número de identificación
   * @param numeroIdentificacion Número o parte del número de identificación
   */
  filtrarPorIdentificacion(numeroIdentificacion: string): Observable<Asegurado[]> {
    return this.http.get<Asegurado[]>(`${this.apiUrl}/filtrar/${numeroIdentificacion}`);
  }

  /**
   * Crea un nuevo asegurado
   * @param asegurado Datos del asegurado a crear
   */
  createAsegurado(asegurado: CreateAseguradoDto): Observable<Asegurado> {
    return this.http.post<Asegurado>(this.apiUrl, asegurado);
  }

  /**
   * Actualiza un asegurado existente
   * @param id Número de identificación del asegurado
   * @param asegurado Datos actualizados del asegurado
   */
  updateAsegurado(id: number, asegurado: UpdateAseguradoDto): Observable<Asegurado> {
    return this.http.put<Asegurado>(`${this.apiUrl}/${id}`, asegurado);
  }

  /**
   * Elimina un asegurado
   * @param id Número de identificación del asegurado
   */
  deleteAsegurado(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
