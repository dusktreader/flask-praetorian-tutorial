import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageViewerComponent } from './message-viewer.component';

describe('MessageViewerComponent', () => {
  let component: MessageViewerComponent;
  let fixture: ComponentFixture<MessageViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
