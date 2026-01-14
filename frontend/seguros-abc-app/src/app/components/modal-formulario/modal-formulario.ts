import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormularioAsegurado } from '../formulario-asegurado/formulario-asegurado';
import { Asegurado } from '../../models/asegurado';

@Component({
  selector: 'app-modal-formulario',
  standalone: true,
  imports: [CommonModule, FormularioAsegurado],
  templateUrl: './modal-formulario.html',
  styleUrl: './modal-formulario.css'
})
export class ModalFormulario {
  @Input() visible = false;
  @Input() aseguradoEditar?: Asegurado;

  @Output() onGuardar = new EventEmitter<void>();
  @Output() onCancelar = new EventEmitter<void>();

  get titulo(): string {
    return this.aseguradoEditar ? 'Editar Asegurado' : 'Nuevo Asegurado';
  }

  guardar(): void {
    this.onGuardar.emit();
  }

  cancelar(): void {
    this.onCancelar.emit();
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.cancelar();
    }
  }
}
