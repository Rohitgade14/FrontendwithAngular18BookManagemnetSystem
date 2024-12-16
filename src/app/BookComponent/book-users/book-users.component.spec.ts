import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookUsersComponent } from './book-users.component';

describe('BookUsersComponent', () => {
  let component: BookUsersComponent;
  let fixture: ComponentFixture<BookUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BookUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BookUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
