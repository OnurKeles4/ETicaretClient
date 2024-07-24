import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplebuttonComponent } from './simplebutton.component';

describe('SimplebuttonComponent', () => {
  let component: SimplebuttonComponent;
  let fixture: ComponentFixture<SimplebuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SimplebuttonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SimplebuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
