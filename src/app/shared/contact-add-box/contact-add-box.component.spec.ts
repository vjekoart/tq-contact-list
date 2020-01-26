import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactAddBoxComponent } from './contact-add-box.component';

describe('ContactAddBoxComponent', () => {
  let component: ContactAddBoxComponent;
  let fixture: ComponentFixture<ContactAddBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactAddBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactAddBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
