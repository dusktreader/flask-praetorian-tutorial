import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RolesComponent } from './roles/roles.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SectionNavComponent } from './section-nav/section-nav.component';

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

import { ApiEffects } from '@app/store/effects/api.effects';
import { MessageEffects } from '@app/store/effects/message.effects';
import { AuthEffects } from '@app/store/effects/auth.effects';
import { TimerEffects } from '@app/store/effects/timer.effects';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RolesComponent,
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
    }),
    EffectsModule.forRoot([
      ApiEffects,
      MessageEffects,
      AuthEffects,
      TimerEffects,
    ]),
  ],
  providers: [Title],
  bootstrap: [AppComponent],
})
export class AppModule {}
