import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoWorkerAddComponent } from './co-worker-add.component';

describe('AgentAddComponent', () => {
  let component: CoWorkerAddComponent;
  let fixture: ComponentFixture<CoWorkerAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoWorkerAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoWorkerAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
