import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterListOfMailsComponent } from './footer-list-of-mails.component';

describe('FooterListOfMailsComponent', () => {
  let component: FooterListOfMailsComponent;
  let fixture: ComponentFixture<FooterListOfMailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterListOfMailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterListOfMailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
