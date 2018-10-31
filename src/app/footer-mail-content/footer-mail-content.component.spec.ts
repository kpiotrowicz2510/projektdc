import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterMailContentComponent } from './footer-mail-content.component';

describe('FooterMailContentComponent', () => {
  let component: FooterMailContentComponent;
  let fixture: ComponentFixture<FooterMailContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FooterMailContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterMailContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
