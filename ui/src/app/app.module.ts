import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { routerReducer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SectionNavComponent } from './section-nav/section-nav.component';
import { TokenInterceptorService } from './services/token-interceptor.service';

import { HomeComponent } from '@app/sections/home/home.component';
import { RolesComponent } from '@app/sections/roles/roles.component';
import { RefreshComponent } from '@app/sections/refresh/refresh.component';
import { BlacklistComponent } from '@app/sections/blacklist/blacklist.component';
import { CustomClaimsComponent } from '@app/sections/custom-claims/custom-claims.component';
import { RegisterComponent } from '@app/sections/register/register.component';

import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatTabsModule,
  MatExpansionModule,
  MatGridListModule,
} from '@angular/material';

import { SharedModule } from './shared/shared.module';

import { reducer as apiReducer } from '@app/store/reducers/api.reducers';
import { reducer as messageReducer } from '@app/store/reducers/message.reducers';
import { reducer as authReducer } from '@app/store/reducers/auth.reducers';
import { reducer as timerReducer } from '@app/store/reducers/timer.reducers';
import { reducer as endpointIndicatorReducer } from '@app/store/reducers/endpoint-indicator.reducers';
import { reducer as presetUsersReducer } from '@app/store/reducers/preset-user.reducers';
import { ApiEffects } from '@app/store/effects/api.effects';
import { MessageEffects } from '@app/store/effects/message.effects';
import { AuthEffects } from '@app/store/effects/auth.effects';
import { TimerEffects } from '@app/store/effects/timer.effects';
import { PresetUserEffects } from '@app/store/effects/preset-user.effects';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RolesComponent,
    RefreshComponent,
    BlacklistComponent,
    CustomClaimsComponent,
    RegisterComponent,
    SectionNavComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    FlexLayoutModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatTabsModule,
    MatExpansionModule,
    MatGridListModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forRoot({
      api: apiReducer,
      message: messageReducer,
      auth: authReducer,
      timer: timerReducer,
      endpointIndicator: endpointIndicatorReducer,
      router: routerReducer,
      presetUsers: presetUsersReducer,
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      // logOnly: environment.production,
    }),
    EffectsModule.forRoot([
      ApiEffects,
      MessageEffects,
      AuthEffects,
      TimerEffects,
      PresetUserEffects,
    ]),
  ],
  providers: [
    Title,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
