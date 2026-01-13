import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAsegurados } from './lista-asegurados';

describe('ListaAsegurados', () => {
  let component: ListaAsegurados;
  let fixture: ComponentFixture<ListaAsegurados>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaAsegurados]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaAsegurados);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
