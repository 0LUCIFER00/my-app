import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseServicesComponent } from './license-services.component';

describe('LicenseServicesComponent', () => {
  let component: LicenseServicesComponent;
  let fixture: ComponentFixture<LicenseServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LicenseServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LicenseServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
