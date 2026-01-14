import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AseguradoService } from '../../services/asegurado';
import { Asegurado, PaginatedResponse } from '../../models/asegurado';
import { FormularioAsegurado } from '../formulario-asegurado/formulario-asegurado';

@Component({
  selector: 'app-lista-asegurados',
  standalone: true,
  imports: [CommonModule, FormsModule, FormularioAsegurado],
  templateUrl: './lista-asegurados.html',
  styleUrl: './lista-asegurados.css',
})
export class ListaAsegurados implements OnInit {
  asegurados: Asegurado[] = [];
  aseguradosFiltrados: Asegurado[] = [];
  paginacion?: PaginatedResponse<Asegurado>;

  loading = false;
  errorMessage = '';
  successMessage = '';

  // Búsqueda
  busquedaTexto = '';
  buscando = false;

  // Paginación
  pageNumber = 1;
  pageSize = 10;

  // Formulario
  mostrarFormulario = false;
  aseguradoEditar?: Asegurado;

  // Modal de confirmación
  mostrarModalEliminar = false;
  aseguradoEliminar?: Asegurado;

  constructor(private aseguradoService: AseguradoService) { }

  ngOnInit(): void {
    this.cargarAsegurados();
  }

  cargarAsegurados(): void {
    this.loading = true;
    this.errorMessage = '';
    console.log('Iniciando carga de asegurados...');

    this.aseguradoService.getAsegurados(this.pageNumber, this.pageSize).subscribe({
      next: (response) => {
        console.log('Respuesta recibida:', response);
        this.paginacion = response;
        this.asegurados = response.data;
        this.aseguradosFiltrados = response.data;
        this.loading = false;
      },
      error: (error) => {
        console.error('Error completo:', error);
        this.errorMessage = 'Error al cargar los asegurados: ' + (error.message || 'Error desconocido');
        this.loading = false;
      },
      complete: () => {
        console.log('Petición completada');
      }
    });
  }

  buscar(): void {
    if (!this.busquedaTexto.trim()) {
      this.aseguradosFiltrados = this.asegurados;
      return;
    }

    this.buscando = true;
    this.aseguradoService.filtrarPorIdentificacion(this.busquedaTexto).subscribe({
      next: (asegurados) => {
        this.aseguradosFiltrados = asegurados;
        this.buscando = false;
      },
      error: (error) => {
        this.errorMessage = 'Error al buscar asegurados';
        this.buscando = false;
        console.error('Error:', error);
      }
    });
  }

  limpiarBusqueda(): void {
    this.busquedaTexto = '';
    this.aseguradosFiltrados = this.asegurados;
  }

  cambiarPagina(pagina: number): void {
    if (pagina < 1 || (this.paginacion && pagina > this.paginacion.totalPages)) {
      return;
    }
    this.pageNumber = pagina;
    this.cargarAsegurados();
  }

  abrirFormularioNuevo(): void {
    this.aseguradoEditar = undefined;
    this.mostrarFormulario = true;
  }

  editarAsegurado(asegurado: Asegurado): void {
    this.aseguradoEditar = asegurado;
    this.mostrarFormulario = true;
  }

  confirmarEliminar(asegurado: Asegurado): void {
    this.aseguradoEliminar = asegurado;
    this.mostrarModalEliminar = true;
  }

  eliminarAsegurado(): void {
    if (!this.aseguradoEliminar) return;

    this.aseguradoService.deleteAsegurado(this.aseguradoEliminar.numeroIdentificacion).subscribe({
      next: () => {
        this.successMessage = 'Asegurado eliminado exitosamente';
        this.mostrarModalEliminar = false;
        this.aseguradoEliminar = undefined;
        this.cargarAsegurados();
        setTimeout(() => this.successMessage = '', 3000);
      },
      error: (error) => {
        this.errorMessage = 'Error al eliminar el asegurado';
        this.mostrarModalEliminar = false;
        console.error('Error:', error);
        setTimeout(() => this.errorMessage = '', 3000);
      }
    });
  }

  cancelarEliminar(): void {
    this.mostrarModalEliminar = false;
    this.aseguradoEliminar = undefined;
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
    this.aseguradoEditar = undefined;
  }

  onGuardarAsegurado(): void {
    this.mostrarFormulario = false;
    this.aseguradoEditar = undefined;
    this.successMessage = this.aseguradoEditar ? 'Asegurado actualizado exitosamente' : 'Asegurado creado exitosamente';
    this.cargarAsegurados();
    setTimeout(() => this.successMessage = '', 3000);
  }

  formatearMoneda(valor: number): string {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(valor);
  }

  formatearFecha(fecha: Date | string): string {
    return new Date(fecha).toLocaleDateString('es-CO');
  }

  getNombreCompleto(asegurado: Asegurado): string {
    return `${asegurado.primerNombre} ${asegurado.segundoNombre || ''} ${asegurado.primerApellido} ${asegurado.segundoApellido}`.trim();
  }

  getPaginaArray(): number[] {
    if (!this.paginacion) return [];
    return Array.from({ length: this.paginacion.totalPages }, (_, i) => i + 1);
  }
}
