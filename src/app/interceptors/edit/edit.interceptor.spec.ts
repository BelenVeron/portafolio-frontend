import { TestBed } from '@angular/core/testing';

import { EditInterceptor } from './edit.interceptor';

describe('EditInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      EditInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: EditInterceptor = TestBed.inject(EditInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
