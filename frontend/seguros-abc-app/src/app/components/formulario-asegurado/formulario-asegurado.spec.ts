import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAsegurado } from './formulario-asegurado';

describe('FormularioAsegurado', () => {
  let component: FormularioAsegurado;
  let fixture: ComponentFixture<FormularioAsegurado>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioAsegurado]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioAsegurado);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
