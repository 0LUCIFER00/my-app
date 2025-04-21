import { Component,ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-license-services',
  imports: [CommonModule],
  templateUrl: './license-services.component.html',
  styleUrls: ['./license-services.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LicenseServicesComponent {
  services = [
    {
      title: 'Drivers/ Learners License',
      description: 'License registration on your fingertips',
      imageUrl: 'https://storage.googleapis.com/a1aa/image/19FtkFtH9hYmeg-yrjlN7pL4diBKkB2aRQR_5V5r_1Y.jpg',
      buttonText: 'More'
    },
    {
      title: 'Driving School',
      description: 'One place for application of Driving School License',
      imageUrl: 'https://storage.googleapis.com/a1aa/image/T8sp4vyfarrjGmQ0UX7iFpsqpy2TegBp5fn_UU2GEoY.jpg',
      buttonText: 'More'
    },
    {
      title: 'Online Test/ Appointment',
      description: 'Book/ Modify Online test appointments',
      imageUrl: 'https://storage.googleapis.com/a1aa/image/nVqt5KBC8geskRlg1Hmj5-f2njvt-PXd268gHbmiAEc.jpg',
      buttonText: 'More'
    },
    {
      title: 'Other Services',
      description: 'Explore the plethora of services related to Driving License',
      imageUrl: 'https://storage.googleapis.com/a1aa/image/AXctNsfKz-4suAbonIVXnM6JxSsZZEPTIWKNDw5-3ro.jpg',
      buttonText: 'More'
    }
  ];
}