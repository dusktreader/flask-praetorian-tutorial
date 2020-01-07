import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatProgressBarModule,
  MatSelectModule,
  MatSliderModule,
} from '@angular/material';

import { NgxJsonViewerModule } from 'ngx-json-viewer';

import { RequestViewerComponent } from './request-viewer/request-viewer.component';
import { ResponseViewerComponent } from './response-viewer/response-viewer.component';
import { LoginComponent } from './login/login.component';
import { UserSelectorComponent } from './login/user-selector/user-selector.component';
import { MessageViewerComponent } from './message-viewer/message-viewer.component';
import { SectionNameComponent } from './section-name/section-name.component';
import { TokenComponent } from './token/token.component';

@NgModule({
  declarations: [
    RequestViewerComponent,
    ResponseViewerComponent,
    LoginComponent,
    UserSelectorComponent,
    MessageViewerComponent,
    SectionNameComponent,
    TokenComponent,
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatProgressBarModule,
    MatSelectModule,
    MatSliderModule,
    NgxJsonViewerModule,
    ReactiveFormsModule,
  ],
  exports: [
    RequestViewerComponent,
    ResponseViewerComponent,
    MessageViewerComponent,
    LoginComponent,
    TokenComponent,
  ],
})
export class SharedModule {}
