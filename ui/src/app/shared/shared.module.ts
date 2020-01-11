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
  MatExpansionModule,
  MatGridListModule,
} from '@angular/material';

import { NgxJsonViewerModule } from 'ngx-json-viewer';

import { RequestViewerComponent } from './request-viewer/request-viewer.component';
import { ResponseViewerComponent } from './response-viewer/response-viewer.component';
import { LoginComponent } from './login/login.component';
import { MessageViewerComponent } from './message-viewer/message-viewer.component';
import { TokenViewerComponent } from './token-viewer/token-viewer.component';
import { EndpointListComponent } from './endpoint-list/endpoint-list.component';

@NgModule({
  declarations: [
    RequestViewerComponent,
    ResponseViewerComponent,
    LoginComponent,
    MessageViewerComponent,
    TokenViewerComponent,
    EndpointListComponent,
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
    MatExpansionModule,
    MatGridListModule,
    NgxJsonViewerModule,
    ReactiveFormsModule,
  ],
  exports: [
    RequestViewerComponent,
    ResponseViewerComponent,
    MessageViewerComponent,
    LoginComponent,
    TokenViewerComponent,
    EndpointListComponent,
  ],
})
export class SharedModule {}
