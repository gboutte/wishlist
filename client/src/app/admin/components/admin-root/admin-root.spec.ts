import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRoot } from './admin-root';

describe('AdminRoot', () => {
  let component: AdminRoot;
  let fixture: ComponentFixture<AdminRoot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminRoot]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminRoot);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
