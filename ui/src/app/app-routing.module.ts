import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

import { HomeComponent } from '@app/sections/home/home.component';
import { RolesComponent } from '@app/sections/roles/roles.component';
import { RefreshComponent } from '@app/sections/refresh/refresh.component';
import { BlacklistComponent } from '@app/sections/blacklist/blacklist.component';
import { CustomClaimsComponent } from '@app/sections/custom-claims/custom-claims.component';
import { RegisterComponent } from '@app/sections/register/register.component';
import { RegisterConfirmComponent } from '@app/sections/register-confirm/register-confirm.component';

import { FakeEmailGuard } from '@app/guards/fake-email.guard';

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
  {
    path: 'blacklist',
    component: BlacklistComponent,
    data: { title: 'Blacklist' },
  },
  {
    path: 'custom-claims',
    component: CustomClaimsComponent,
    data: { title: 'Custom Claims' },
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'Email Registration' },
  },
  {
    path: 'register-confirm',
    component: RegisterConfirmComponent,
    data: { title: 'Confirm Email Registration' },
  },
  {
    path: 'fake-email',
    canActivate: [ FakeEmailGuard ],
    component: FakeEmailGuard,
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
