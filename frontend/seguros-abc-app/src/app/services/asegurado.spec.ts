import { TestBed } from '@angular/core/testing';

import { Asegurado } from './asegurado';

describe('Asegurado', () => {
  let service: Asegurado;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Asegurado);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
