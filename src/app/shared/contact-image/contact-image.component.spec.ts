import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactImageComponent } from './contact-image.component';

describe('ContactImageComponent', () => {
  let component: ContactImageComponent;
  let fixture: ComponentFixture<ContactImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactImageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
