// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { DefaultContentComponent } from './default-content/default-content.component';
import { ContactComponent } from './contact/contact.component';
import { LoginRegisterComponent } from './login-register/login-register.component';

export const routes: Routes = [
  { 
    path: '',
    children: [
      { path: '', component: DefaultContentComponent },
      { path: 'about', component: AboutComponent },
      { path: 'contact', component: ContactComponent },
      { path: 'login-register', component:  LoginRegisterComponent}
    ]
  },
];