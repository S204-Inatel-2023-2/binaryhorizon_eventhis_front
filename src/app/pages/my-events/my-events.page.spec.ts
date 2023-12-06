import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyEventsPage } from './my-events.page';

describe('MyEventsPage', () => {
  let component: MyEventsPage;
  let fixture: ComponentFixture<MyEventsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MyEventsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
