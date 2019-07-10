import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSelectorComponent } from './user-selector.component';

describe('UserSelectorComponent', () => {
  let component: UserSelectorComponent;
  let fixture: ComponentFixture<UserSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
