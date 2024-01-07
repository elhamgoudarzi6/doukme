import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultRequestComponent } from './result-request.component';

describe('ResultRequestComponent', () => {
  let component: ResultRequestComponent;
  let fixture: ComponentFixture<ResultRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResultRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResultRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
