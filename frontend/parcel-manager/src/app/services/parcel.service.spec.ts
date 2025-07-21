import { TestBed } from '@angular/core/testing';

import { ParcelService } from './parcel.service';

describe('Parcel', () => {
  let service: ParcelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParcelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
