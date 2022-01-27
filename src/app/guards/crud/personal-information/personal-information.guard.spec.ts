import { TestBed } from '@angular/core/testing';

import { PersonalInformationGuard } from './personal-information.guard';

describe('PersonalInformationGuard', () => {
  let guard: PersonalInformationGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PersonalInformationGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
