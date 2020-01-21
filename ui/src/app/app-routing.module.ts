import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { HomeComponent } from '@app/sections/home/home.component';
import { RolesComponent } from '@app/sections/roles/roles.component';
import { RefreshComponent } from '@app/sections/refresh/refresh.component';

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
  {
    path: 'refresh',
    component: RefreshComponent,
    data: { title: 'Refresh' },
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
