import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeUsersComponent } from './liste-users.component';

describe('ListeUsersComponent', () => {
  let component: ListeUsersComponent;
  let fixture: ComponentFixture<ListeUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListeUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
