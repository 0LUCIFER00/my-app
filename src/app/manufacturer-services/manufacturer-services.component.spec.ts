import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManufacturerServicesComponent } from './manufacturer-services.component';

describe('ManufacturerServicesComponent', () => {
  let component: ManufacturerServicesComponent;
  let fixture: ComponentFixture<ManufacturerServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManufacturerServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManufacturerServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
