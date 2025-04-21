import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationalServicesComponent } from './informational-services.component';

describe('InformationalServicesComponent', () => {
  let component: InformationalServicesComponent;
  let fixture: ComponentFixture<InformationalServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InformationalServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformationalServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
