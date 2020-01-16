import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { HomeComponent } from './home/home.component';
import { RolesComponent } from './roles/roles.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Home' },
  },
  {
    path: 'roles',
    component: RolesComponent,
    data: { title: 'Roles' },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    StoreRouterConnectingModule.forRoot(),
  ],
  exports: [
    RouterModule,
    StoreRouterConnectingModule,
  ],
})
export class AppRoutingModule {}
