import { TestBed, inject } from '@angular/core/testing';

import { AppToolbarService } from './app-toolbar.service';

describe('AppToolbarService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppToolbarService]
    });
  });

  it('should ...', inject([AppToolbarService], (service: AppToolbarService) => {
    expect(service).toBeTruthy();
  }));
});
