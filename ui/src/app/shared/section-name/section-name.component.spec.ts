import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionNameComponent } from './section-name.component';

describe('SectionNameComponent', () => {
  let component: SectionNameComponent;
  let fixture: ComponentFixture<SectionNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
