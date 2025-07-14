import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminWishForm } from './admin-wish-form';

describe('AdminWishForm', () => {
  let component: AdminWishForm;
  let fixture: ComponentFixture<AdminWishForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminWishForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminWishForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
