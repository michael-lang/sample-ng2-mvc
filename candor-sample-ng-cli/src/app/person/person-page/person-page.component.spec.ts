import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonPageComponent } from './person-page.component';

describe('PersonPageComponent', () => {
  let component: PersonPageComponent;
  let fixture: ComponentFixture<PersonPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
