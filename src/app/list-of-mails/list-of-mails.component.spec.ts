import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOfMailsComponent } from './list-of-mails.component';

describe('ListOfMailsComponent', () => {
  let component: ListOfMailsComponent;
  let fixture: ComponentFixture<ListOfMailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOfMailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOfMailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
