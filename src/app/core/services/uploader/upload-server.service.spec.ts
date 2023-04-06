import { TestBed } from '@angular/core/testing';

import { UploadServerService } from './upload-server.service';

describe('UploadServerService', () => {
  let service: UploadServerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadServerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
