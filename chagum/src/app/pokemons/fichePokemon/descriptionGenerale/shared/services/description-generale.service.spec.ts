import { TestBed } from '@angular/core/testing';

import { DescriptionGeneraleService } from './description-generale.service';

describe('DescriptionGeneraleService', () => {
  let service: DescriptionGeneraleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DescriptionGeneraleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
