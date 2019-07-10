import { TestBed } from '@angular/core/testing';

import { SectionNameService } from './section-name.service';

describe('SectionNameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SectionNameService = TestBed.get(SectionNameService);
    expect(service).toBeTruthy();
  });
});
