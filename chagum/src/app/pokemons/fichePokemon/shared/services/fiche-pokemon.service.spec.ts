import { TestBed } from '@angular/core/testing';

import { FichePokemonService } from './fiche-pokemon.service';

describe('FichePokemonService', () => {
  let service: FichePokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FichePokemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
