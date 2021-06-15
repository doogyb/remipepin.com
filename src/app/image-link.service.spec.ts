import { TestBed } from '@angular/core/testing';

import { ImageLinkService } from './image-link.service';

describe('ImageLinkService', () => {
  let service: ImageLinkService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageLinkService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
