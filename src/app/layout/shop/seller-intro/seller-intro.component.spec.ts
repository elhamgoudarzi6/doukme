import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerIntroComponent } from './seller-intro.component';

describe('SellerIntroComponent', () => {
  let component: SellerIntroComponent;
  let fixture: ComponentFixture<SellerIntroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerIntroComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerIntroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
