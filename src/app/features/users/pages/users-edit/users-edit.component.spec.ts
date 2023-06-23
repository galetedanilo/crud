import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersEditComponent } from './users-edit.component';

describe('UsersEditComponent', () => {
  let component: UsersEditComponent;
  let fixture: ComponentFixture<UsersEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [UsersEditComponent]
    });
    fixture = TestBed.createComponent(UsersEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
