import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomClaimsComponent } from './custom-claims.component';

describe('RolesComponent', () => {
  let component: CustomClaimsComponent;
  let fixture: ComponentFixture<CustomClaimsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomClaimsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomClaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
