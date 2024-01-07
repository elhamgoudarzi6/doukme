import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePartComponent } from './home-part.component';

describe('FeaturesComponent', () => {
  let component: HomePartComponent;
  let fixture: ComponentFixture<HomePartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomePartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
