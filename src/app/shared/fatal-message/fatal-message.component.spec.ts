import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FatalMessageComponent } from './fatal-message.component';

describe('FatalMessageComponent', () => {
  let component: FatalMessageComponent;
  let fixture: ComponentFixture<FatalMessageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FatalMessageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FatalMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
