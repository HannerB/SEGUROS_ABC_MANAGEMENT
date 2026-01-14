import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ModalConfirmacionConfig {
  titulo: string;
  mensaje: string;
  textoConfirmar?: string;
  textoCancelar?: string;
  tipo?: 'danger' | 'warning' | 'info';
}

@Component({
  selector: 'app-modal-confirmacion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal-confirmacion.html',
  styleUrl: './modal-confirmacion.css'
})
export class ModalConfirmacion {
  @Input() visible = false;
  @Input() config: ModalConfirmacionConfig = {
    titulo: 'Confirmar',
    mensaje: '¿Está seguro?'
  };

  @Output() onConfirmar = new EventEmitter<void>();
  @Output() onCancelar = new EventEmitter<void>();

  get textoConfirmar(): string {
    return this.config.textoConfirmar || 'Confirmar';
  }

  get textoCancelar(): string {
    return this.config.textoCancelar || 'Cancelar';
  }

  get tipo(): string {
    return this.config.tipo || 'danger';
  }

  confirmar(): void {
    this.onConfirmar.emit();
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
