import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AseguradoService } from '../../services/asegurado';
import { Asegurado } from '../../models/asegurado';

@Component({
  selector: 'app-formulario-asegurado',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './formulario-asegurado.html',
  styleUrl: './formulario-asegurado.css',
})
export class FormularioAsegurado implements OnInit {
  @Input() aseguradoEditar?: Asegurado;
  @Output() onGuardar = new EventEmitter<void>();
  @Output() onCancelar = new EventEmitter<void>();

  aseguradoForm!: FormGroup;
  loading = false;
  errorMessage: string = '';
  successMessage: string = '';
  modoEdicion = false;
  showToast = false;

  constructor(
    private fb: FormBuilder,
    private aseguradoService: AseguradoService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // Establecer modo edición ANTES de inicializar el formulario
    if (this.aseguradoEditar) {
      this.modoEdicion = true;
    }

    this.initForm();

    if (this.modoEdicion) {
      this.cargarDatosAsegurado();
      // Deshabilitar el campo de identificación en modo edición
      this.aseguradoForm.get('numeroIdentificacion')?.disable();
    }
  }

  initForm(): void {
    this.aseguradoForm = this.fb.group({
      numeroIdentificacion: [
        { value: '', disabled: this.modoEdicion },
        [Validators.required, Validators.min(1)]
      ],
      primerNombre: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      segundoNombre: ['', [Validators.maxLength(100)]],
      primerApellido: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      segundoApellido: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(100)]],
      telefonoContacto: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(200)]],
      fechaNacimiento: ['', [Validators.required]],
      valorEstimadoSeguro: ['', [Validators.required, Validators.min(0.01)]],
      observaciones: ['', [Validators.maxLength(1000)]]
    });
  }

  cargarDatosAsegurado(): void {
    if (this.aseguradoEditar) {
      // Convertir fecha al formato YYYY-MM-DD para el input date
      const fecha = new Date(this.aseguradoEditar.fechaNacimiento);
      const fechaFormateada = fecha.toISOString().split('T')[0];

      this.aseguradoForm.patchValue({
        numeroIdentificacion: this.aseguradoEditar.numeroIdentificacion,
        primerNombre: this.aseguradoEditar.primerNombre,
        segundoNombre: this.aseguradoEditar.segundoNombre || '',
        primerApellido: this.aseguradoEditar.primerApellido,
        segundoApellido: this.aseguradoEditar.segundoApellido,
        telefonoContacto: this.aseguradoEditar.telefonoContacto,
        email: this.aseguradoEditar.email,
        fechaNacimiento: fechaFormateada,
        valorEstimadoSeguro: this.aseguradoEditar.valorEstimadoSeguro,
        observaciones: this.aseguradoEditar.observaciones || ''
      });
    }
  }

  onSubmit(): void {
    if (this.aseguradoForm.invalid) {
      this.marcarCamposComoTocados();
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const formData = this.aseguradoForm.getRawValue();

    if (this.modoEdicion && this.aseguradoEditar) {
      this.actualizarAsegurado(formData);
    } else {
      this.crearAsegurado(formData);
    }
  }

  crearAsegurado(data: any): void {
    this.aseguradoService.createAsegurado(data).subscribe({
      next: () => {
        this.successMessage = 'Asegurado creado exitosamente';
        this.errorMessage = '';
        this.loading = false;
        this.showToast = true;
        this.cdr.detectChanges();
        this.aseguradoForm.reset();
        setTimeout(() => {
          this.onGuardar.emit();
        }, 1500);
      },
      error: (error) => {
        this.loading = false;
        this.successMessage = '';
        this.errorMessage = this.getErrorMessage(error);
        this.showToast = true;
        this.cdr.detectChanges();
      }
    });
  }

  actualizarAsegurado(data: any): void {
    const id = this.aseguradoEditar!.numeroIdentificacion;
    const updateData = { ...data };
    delete updateData.numeroIdentificacion;

    this.aseguradoService.updateAsegurado(id, updateData).subscribe({
      next: () => {
        this.successMessage = 'Asegurado actualizado exitosamente';
        this.errorMessage = '';
        this.loading = false;
        this.showToast = true;
        this.cdr.detectChanges();
        setTimeout(() => {
          this.onGuardar.emit();
        }, 1500);
      },
      error: (error) => {
        this.loading = false;
        this.successMessage = '';
        this.errorMessage = this.getErrorMessage(error);
        this.showToast = true;
        this.cdr.detectChanges();
      }
    });
  }

  closeToast(): void {
    this.showToast = false;
    this.errorMessage = '';
    this.successMessage = '';
    this.cdr.detectChanges();
  }

  cancelar(): void {
    this.onCancelar.emit();
  }

  private marcarCamposComoTocados(): void {
    Object.keys(this.aseguradoForm.controls).forEach(key => {
      this.aseguradoForm.get(key)?.markAsTouched();
    });
  }

  private getErrorMessage(error: any): string {
    // Error con mensaje específico del backend
    if (error.error?.message) {
      return error.error.message;
    }

    // Errores de validación de ModelState
    if (error.error?.errors) {
      const errores: string[] = [];

      // Si es un objeto con campos específicos
      if (typeof error.error.errors === 'object') {
        for (const campo in error.error.errors) {
          const mensajesCampo = error.error.errors[campo];
          if (Array.isArray(mensajesCampo)) {
            errores.push(...mensajesCampo);
          } else {
            errores.push(mensajesCampo);
          }
        }
      }

      if (errores.length > 0) {
        return 'Errores de validación:\n' + errores.map(e => '• ' + e).join('\n');
      }
    }

    // Errores por código de estado
    switch (error.status) {
      case 400:
        return 'Datos inválidos. Por favor verifica todos los campos.';
      case 409:
        return 'El número de identificación o email ya está registrado.';
      case 500:
        return 'Error interno del servidor. Por favor intenta de nuevo.';
      default:
        return 'Ocurrió un error al guardar el asegurado. Por favor intenta de nuevo.';
    }
  }

  // Métodos helper para el template
  getError(campo: string): string {
    const control = this.aseguradoForm.get(campo);
    if (!control || !control.errors || !(control.touched || control.dirty)) return '';

    const errors = control.errors;

    if (errors['required']) return 'Este campo es requerido';
    if (errors['minlength']) return `Mínimo ${errors['minlength'].requiredLength} caracteres`;
    if (errors['maxlength']) return `Máximo ${errors['maxlength'].requiredLength} caracteres`;
    if (errors['email']) return 'Formato de email inválido';
    if (errors['min']) return `El valor mínimo es ${errors['min'].min}`;

    return '';
  }

  hasError(campo: string): boolean {
    const control = this.aseguradoForm.get(campo);
    return !!(control && control.invalid && (control.touched || control.dirty));
  }
}
