export interface Asegurado {
  numeroIdentificacion: number;
  primerNombre: string;
  segundoNombre?: string;
  primerApellido: string;
  segundoApellido: string;
  telefonoContacto: string;
  email: string;
  fechaNacimiento: Date | string;
  valorEstimadoSeguro: number;
  observaciones?: string;
  fechaCreacion?: Date | string;
  fechaActualizacion?: Date | string;
}

export interface CreateAseguradoDto {
  numeroIdentificacion: number;
  primerNombre: string;
  segundoNombre?: string;
  primerApellido: string;
  segundoApellido: string;
  telefonoContacto: string;
  email: string;
  fechaNacimiento: Date | string;
  valorEstimadoSeguro: number;
  observaciones?: string;
}

export interface UpdateAseguradoDto {
  primerNombre: string;
  segundoNombre?: string;
  primerApellido: string;
  segundoApellido: string;
  telefonoContacto: string;
  email: string;
  fechaNacimiento: Date | string;
  valorEstimadoSeguro: number;
  observaciones?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}
