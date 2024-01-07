import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoWorkerComponent } from './co-worker.component';

describe('CoWorkerComponent', () => {
  let component: CoWorkerComponent;
  let fixture: ComponentFixture<CoWorkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CoWorkerComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CoWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
